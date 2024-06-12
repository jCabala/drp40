import { fetchAllApplicationsByUserID, fetchFlatByID } from "@/lib/firebase";
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
  return (
    <div className="w-full flex flex-col justify-center items-center">
      {applications && applications.length > 0 ? (
        applications.map((flatObj, idx) => (
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
