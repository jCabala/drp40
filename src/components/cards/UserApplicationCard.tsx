import React from "react";
import { UserApplication } from "@/data/userApplication";
import DoublePhotoCard from "./DoublePhotoCard";

type Props = { application: UserApplication };

function UserApplicationCard({ application }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border-2 border-emerald-500 shadow-5 duration-300 hover:scale-105 flex flex-row h-32 w-full mb-4">
      <img
        src="https://i.pinimg.com/236x/c2/52/aa/c252aabbf05ca42e49efee18fbe162f6.jpg"
        alt=""
        className="h-full object-scale-down"
      />
      <div className="flex flex-col w-full my-4 mx-4">
        <p className="text-md text-gray-600">{application.msg}</p>
        <div className="flex flex-row w-full h-full justify-end items-end justify-self-end self-end">
          <button className="w-28 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded">
            Approve
          </button>
          <button className="ml-2 w-28 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserApplicationCard;
