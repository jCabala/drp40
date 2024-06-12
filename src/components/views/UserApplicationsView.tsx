import {
  fetchAllApplicationsByUserID,
  fetchFlatByID,
  withdrawApplication,
} from "@/lib/firebase";
import React, { useState, useEffect } from "react";
import MyApplicationCard from "../cards/MyApplicationCard";
import Cookies from "js-cookie";
import { UserApplication } from "@/data/userApplication";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

type Props = {
  applications: (UserApplication & { flat: FlatAdvertisment })[];
  getApplications: () => void;
};

function UserApplicationsView({ applications, getApplications }: Props) {
  const withdrawApplicationAction = async (
    applicationID: string,
    flatID: string
  ) => {
    console.log("Withdrawing Application");
    withdrawApplication(applicationID, flatID);
    await getApplications();
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {applications && applications.length > 0 ? (
        applications.map((flatObj, idx) => (
          <MyApplicationCard
            key={idx}
            img1={flatObj.flat.images[0]}
            img2={flatObj.flat.images[1] || flatObj.flat.images[0]}
            status={flatObj.status}
            withdrawApplicationAction={() =>
              withdrawApplicationAction(flatObj.id, flatObj.flat.id)
            }
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
