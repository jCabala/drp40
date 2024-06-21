import React from "react";
import DoublePhotoCard from "./DoublePhotoCard";
import Button from "../helper/buttons/Button";
import { UserApplication } from "@/data/userApplication";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import Link from "../../../node_modules/next/link";
import ContactInfo from "../views/userProfile/ContactInfo";
import { UserProfile } from "@/data/userProfile";

type Props = {
  flatObj: UserApplication & { flat: FlatAdvertisment } & {
    ownerProfile: UserProfile;
  };
  withdrawApplicationAction: () => void;
};

function MyApplicationCard({ flatObj, withdrawApplicationAction }: Props) {
  // Define styles for different statuses
  const statusStyles: Map<string, string> = new Map([
    ["PENDING", "bg-yellow-500 text-black"],
    ["APPROVED", "bg-green-500 text-white"],
    ["REJECTED", "bg-red-500 text-white"],
  ]);

  // Get the appropriate style for the current status
  const img1 = flatObj.flat.images[0];
  const img2 = flatObj.flat.images[1] || img1;
  const status = flatObj.status;
  const statusStyle = statusStyles.get(status) || "bg-gray-500 text-white";
  const id = flatObj.flatID;
  const rejectionMsg = flatObj.rejectionMsg;

  return (
    <div className="w-1/2 h-auto p-4 rounded-lg">
      <DoublePhotoCard img1={img1} img2={img2}>
        <div className="text-center font-bold text-lg mb-4">
          {flatObj.flat.address}
        </div>
        <div className="flex flex-col items-center w-full">
          <span
            className={`rounded-md text-center mx-6 text-md px-2 py-2 font-bold ${statusStyle}`}
          >
            {status}
          </span>
          {(status === "APPROVED" && (
            <>
              <div className="mt-4 bg-green-100 text-green-800 p-4 rounded-md shadow-inner text-center w-full">
                Good job, you got approved!
                <br />
                Contact the lister:
              </div>
              <ContactInfo
                email={flatObj.ownerProfile.email}
                phoneNumber={flatObj.ownerProfile.phoneNumber}
                isMyProfile={false}
              />
            </>
          )) ||
            (status === "REJECTED" && (
              <>
                <div className="mt-4 bg-green-100 text-red-800 p-4 rounded-md shadow-inner text-center w-full">
                  Sorry but you were rejected by the lister.
                  <br />
                  FEEDBACK:
                  <br />:{rejectionMsg}
                </div>
              </>
            ))}

          <Link href={`/flat/${id}`}>
            <Button color={"orange"}>See More</Button>
          </Link>
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
