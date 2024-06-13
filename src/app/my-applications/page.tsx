"use client";
import LoadingOverlay from "@/components/helper/LoadingOverlay";
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
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase"; // Import your Firestore instance
import { collection, onSnapshot } from "firebase/firestore";

function MyApplications() {
  const [applicationsWithFlat, setApplicationsWithFlat] =
    useState<
      (UserApplication & { flat: FlatAdvertisment } & {
        ownerProfile: UserProfile;
      })[]
    >();
  const [isLoading, setIsLoading] = useState(true);

  const userID = Cookies.get("userID");

  const getApplications = async () => {
    setIsLoading(true);
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
        myApplicationsWithFlat.filter((e) => e && e.flat && e.ownerProfile )
      );

      setTimeout(() => setIsLoading(false), 600);
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "applications"), () => {
      getApplications();
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [userID, getApplications]);

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <UserApplicationsView
        applications={applicationsWithFlat || []}
        getApplications={getApplications}
      />
    </>
  );
}

export default MyApplications;
