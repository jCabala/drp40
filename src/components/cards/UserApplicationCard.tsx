import React, { useState } from "react";
import { UserApplication } from "@/data/userApplication";
import DoublePhotoCard from "./DoublePhotoCard";
import { useRouter } from "next/navigation";
import { fetchUserIdByEmail, updateApplication } from "@/lib/firebase";
import confetti from "canvas-confetti";
import ReactRain from "react-rain-animation";
import "react-rain-animation/lib/style.css";

type Props = { application: UserApplication; flatID: string };

function UserApplicationCard({ application, flatID }: Props) {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailMsg, setShowFailMsg] = useState(false);
  const MyRouter = useRouter();
  const handleSeeProfile = async () => {
    const userID = application.user.userID;
    console.log("UserID", userID);
    MyRouter.push(`/profile/${userID}`);
  };

  const showConfettiAndMessage = () => {
    // Show the confetti
    confetti();

    // Display the message
    setShowSuccessMsg(true);

    // Hide the message after 3 seconds
    setTimeout(() => {
      setShowSuccessMsg(false);
    }, 3000);
  };

  const showRainAndMessage = () => {
    setShowFailMsg(true);

    // Hide the message after 5 seconds
    setTimeout(() => {
      setShowFailMsg(false);
    }, 3000);
  };

  const handleApprove = () => {
    updateApplication(flatID, true, application.user.email);
    showConfettiAndMessage();
  };

  const handleReject = () => {
    updateApplication(flatID, false, application.user.email);
    showRainAndMessage();
  };

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-emerald-500 shadow-md duration-300 hover:shadow-lg flex flex-row h-auto w-full mb-4">
        <div className="relative">
          <img
            src={application.user.profilePic}
            alt=""
            className="h-full object-cover w-32"
          />
          <button
            onClick={handleSeeProfile}
            className="absolute bottom-0 left-0 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-2 rounded-b-md transition duration-300 ease-in-out focus:outline-none focus:ring focus:ring-emerald-300"
          >
            See Profile
          </button>
        </div>
        <div className="flex flex-col flex-grow p-4">
          <p className="text-md text-gray-600 mb-2">
            <span className="font-bold">Applicant Email:</span>{" "}
            <span className="text-emerald-600">{application.user.email}</span>
          </p>
          <p className="text-md text-gray-600 mb-4">
            <span className="font-bold">Personalized Message:</span>{" "}
            <span className="font-bold text-emerald-600">
              {application.msg}
            </span>
          </p>
          <div className="flex justify-end">
            <button
              className="w-24 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleApprove}
            >
              Approve
            </button>
            <button
              className="ml-2 w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleReject}
            >
              Reject
            </button>
          </div>
        </div>
      </div>

      {showSuccessMsg && (
        <div
          id="confetti-message"
          className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50 p-4 border border-gray-300 rounded shadow-lg"
        >
          <h1 className="text-3xl font-bold text-center">
            You have filled the gap!
          </h1>
        </div>
      )}
      {showFailMsg && (
        <div
          id="rain-message"
          className="fixed inset-0 flex flex-col items-center justify-center bg-white bg-opacity-90 z-50 p-4 border border-gray-300 rounded shadow-lg"
        >
          <div className="absolute inset-0 flex items-center ">
            <ReactRain numDrops={100} className="absolute inset-0" />
          </div>
          <h1 className="text-3xl font-bold text-center">
            Sorry to see they were not your gap filler!
          </h1>
        </div>
      )}
    </>
  );
}

export default UserApplicationCard;
