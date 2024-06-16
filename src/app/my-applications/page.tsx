"use client";
import React, { useContext, useEffect, useState } from "react";
import UserApplicationsView from "@/components/views/UserApplicationsView";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { UserApplication } from "@/data/userApplication";
import { UserProfile } from "@/data/userProfile";
import {
  fetchAllApplicationsByUserID,
  fetchFlatByID,
  fetchUserByID,
} from "@/lib/firebase";
import Cookies from "js-cookie";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";
import { AlertAndLoadingContext } from "@/components/helper/contexts/AlertAndLoadingContext";

function MyApplications() {
  const [applicationsWithFlat, setApplicationsWithFlat] = useState<
    (UserApplication & { flat: FlatAdvertisment } & {
      ownerProfile: UserProfile;
    })[]
  >();
  const { setIsLoading, setAlertText } = useContext(AlertAndLoadingContext);

  const userID = Cookies.get("userID");

  const getApplications = async () => {
    if (applicationsWithFlat) {
      setIsLoading(false);
    }
    if (userID) {
      const apps = await fetchAllApplicationsByUserID(userID);
      const flats = (
        await Promise.all(
          apps.map(async (app) => {
            return await fetchFlatByID(app.flatID);
          })
        )
      ).filter((flat): flat is FlatAdvertisment => flat !== null);

      const owners = (
        await Promise.all(
          apps.map(async (app) => {
            return await fetchUserByID(app.userID);
          })
        )
      ).filter((user): user is UserProfile => user !== null);

      const myApplicationsWithFlat = apps.map((app, index) => ({
        ...app,
        flat: flats[index],
        ownerProfile: owners[index],
      }));
      setApplicationsWithFlat(
        myApplicationsWithFlat.filter((e) => e && e.flat && e.ownerProfile)
      );
    } else {
      setAlertText("Please log in to view your applications");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "applications"), () => {
      getApplications();
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [userID]);

  return (
    <UserApplicationsView
      applications={applicationsWithFlat || []}
      getApplications={getApplications}
    />
  );
}

export default MyApplications;
