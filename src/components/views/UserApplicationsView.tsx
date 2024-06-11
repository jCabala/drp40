import {
  fetchAllApplicationsByUserID,
  fetchFlat,
  fetchFlatByID,
} from "@/lib/firebase";
import React, { useState } from "react";
import MyApplicationCard from "../cards/MyApplicationCard";
import Cookies from "js-cookie";
import { UserApplication } from "@/data/userApplication";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

function UserApplicationsView() {
  const [applicationsWithFlat, setApplicationsWithFlat] =
    useState<(UserApplication & { flat: FlatAdvertisment })[]>();

  const userID = Cookies.get("userID");
  const fetchData = async () => {
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
    }
  };

  fetchData();

  return (
    <div className="w-full flex flex-col justify-center items-center">
      {applicationsWithFlat && applicationsWithFlat.length > 0 ? (
        applicationsWithFlat.map((flatObj, idx) => (
          <MyApplicationCard
            key={idx}
            img1={flatObj.flat.images[0]}
            img2={flatObj.flat.images[1] || flatObj.flat.images[0]}
            status={flatObj.status}
          />
        ))
      ) : (
        <div className="bg-orange-500 text-white text-3xl font-bold p-16 rounded-lg shadow-lg text-center max-w-md mx-auto">
          No Applications Made yet :(
          <br />
        </div>
      )}
    </div>
  );
}

export default UserApplicationsView;
