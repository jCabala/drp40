import React, { useState, useEffect } from "react";
import { UserApplication } from "@/data/userApplication";
import { useRouter } from "next/navigation";
import {
  fetchApplicationByID,
  fetchUserByID,
  updateApplication,
} from "@/lib/firebase";
import confetti from "canvas-confetti";
import ReactRain from "react-rain-animation";
import "react-rain-animation/lib/style.css";
import { UserProfile } from "@/data/userProfile";

type Props = {
  applicationID: string;
  flatID: string;
};

function UserApplicationCard({ applicationID, flatID }: Props) {
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const [showFailMsg, setShowFailMsg] = useState(false);
  const MyRouter = useRouter();
  const [application, setApplication] = useState<UserApplication | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const fetchedApplication = await fetchApplicationByID(applicationID);
      setApplication(fetchedApplication);

      // Fetch user data if application exists
      if (fetchedApplication) {
        const fetchedUser = await fetchUserByID(fetchedApplication.userID);
        setUser(fetchedUser);
      }
    };

    fetchData();
  }, [applicationID]);

  const handleSeeProfile = async () => {
    const userID = application?.userID;
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
    if (application) {
      updateApplication(flatID, application.userID, true);
    }
    showConfettiAndMessage();
  };

  const handleReject = () => {
    if (application) {
      updateApplication(flatID, application.userID, false);
    }
    showRainAndMessage();
  };

  return (
    <>
      {application && application.status !== "REJECTED" && (
        <>
          <div className="overflow-hidden rounded-lg border border-emerald-500 shadow-md duration-300 hover:shadow-lg flex flex-row h-auto w-full mb-4">
            <div className="relative">
              <img
                src={user?.profilePic}
                alt=""
                className="h-full object-cover w-32"
              />
              <button
                onClick={handleSeeProfile}
                className="absolute bottom-0 left-0 w-full bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-1 px-2 rounded-b-md transition duration-300 ease-in-out"
              >
                See Profile
              </button>
            </div>
            <div className="flex flex-col flex-grow p-4">
              <p className="text-md text-gray-600 mb-2">
                <span className="font-bold">Applicant Email:</span>{" "}
                <span className="text-emerald-600">{user?.email}</span>
              </p>
              <p className="text-md text-gray-600 mb-4">
                <span className="font-bold">Personalized Message:</span>{" "}
                <span className="font-bold text-emerald-600">
                  {application.msg}
                </span>
              </p>
              <div className="flex justify-end">
                {application.status === "APPROVED" ? (
                  <div className="flex items-center bg-green-100 text-green-700 border border-green-500 px-4 py-2 rounded-md">
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Approved
                  </div>
                ) : (
                  <>
                    <button
                      className="w-24 bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      onClick={handleApprove}
                    >
                      Approve
                    </button>
                    <button
                      className="ml-2 w-24 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
                      onClick={handleReject}
                    >
                      Reject
                    </button>
                  </>
                )}
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
      )}
    </>
  );
}

export default UserApplicationCard;
