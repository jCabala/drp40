"use client";
import LoadingOverlay from "@/components/helper/LoadingOverlay";
import UserApplicationsView from "@/components/views/UserApplicationsView";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { UserApplication } from "@/data/userApplication";
import { UserProfile } from "@/data/userProfile";
import { fetchAllApplicationsByUserID, fetchFlatByID } from "@/lib/firebase";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";

function MyApplications() {
  const [applicationsWithFlat, setApplicationsWithFlat] =
    useState<(UserApplication & { flat: FlatAdvertisment })[]>();
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

      const myApplicationsWithFlat = apps.map((app, index) => ({
        ...app,
        flat: flats[index],
      }));
      setApplicationsWithFlat(myApplicationsWithFlat);

      setTimeout(() => setIsLoading(false), 600);
    }
  };

  useEffect(() => {
    getApplications();
  }, [userID]);

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
