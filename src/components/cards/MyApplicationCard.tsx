import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";
import Button from "../helper/buttons/Button";

type Props = {
  status: string;
  ownerEmail: string;
  img1: string;
  img2?: string;
  withdrawApplicationAction: () => void;
};

function MyApplicationCard({
  status,
  img1,
  img2,
  withdrawApplicationAction,
  ownerEmail,
}: Props) {
  // Define styles for different statuses
  const statusStyles: Map<string, string> = new Map([
    ["PENDING", "bg-yellow-500 text-black"],
    ["APPROVED", "bg-green-500 text-white"],
    ["REJECTED", "bg-red-500 text-white"],
  ]);

  // Get the appropriate style for the current status
  const statusStyle = statusStyles.get(status) || "bg-gray-500 text-white";

  return (
    <div className="w-1/2 h-auto p-4 rounded-lg">
      <DoublePhotoCard img1={img1} img2={img2}>
        <div className="flex flex-col items-center w-full">
          <span
            className={`rounded-md text-center mx-6 text-md px-2 py-2 font-bold ${statusStyle}`}
          >
            {status}
          </span>
          {status === "APPROVED" && (
            <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-md shadow-inner text-center w-full">
              Good job, you got approved! Contact: {ownerEmail} to follow up.
            </div>
          )}
          <Button
            className="w-full bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-full mt-4 transition duration-300"
            onClick={withdrawApplicationAction}
          >
            Withdraw Application
          </Button>
        </div>
      </DoublePhotoCard>
    </div>
  );
}

export default MyApplicationCard;
