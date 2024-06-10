import React, { useRef } from "react";
import { useState } from "react";
import PopUpWIndow from "../helper/PopUpWindow";
import { addApplication } from "@/lib/firebase";

import Cookies from "js-cookie";

type Props = {
  onFinish: () => void;
  setIsLoading: (loading: boolean) => void;
  setAlertText: (text: string) => void;
  flatID: string;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function ApplyFlatForm({
  onFinish,
  setIsLoading,
  setAlertText,
  flatID,
}: Props) {
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const userID = Cookies.get("userID");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const msg = msgRef.current?.value;
    console.log("Message: ", msg);
    if (!msg) {
      setAlertText("Please fill in all the fields!");
      setIsLoading(false);
      return;
    }

    // Add flat to database
    if (userID) {
      addApplication(userID, msg, flatID);
    } else {
      console.log("ERR: No user logged in");
    }

    setTimeout(() => {
      setIsLoading(false);
      setShowQuestions(false);
      setShowPopUp(true);
    }, 200);
  };

  return (
    <>
      {showPopUp && (
        <PopUpWIndow
          message="Application Successful!"
          buttonText="FINISH"
          onClick={() => {
            setIsLoading(false);
            setShowPopUp(false);
            setShowQuestions(true);
            onFinish();
          }}
        />
      )}{" "}
      {/* Render popUpWIndow when showPopUp is true */}
      {/* Render loading overlay when isLoading is true */}
      {showQuestions && (
        <div
          className="bg-white px-6 pt-10 pb-4 w-full sm:max-w-md mx-auto rounded-lg shadow-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <b className="text-orange-500 text-center block mb-4">
            Upload details for your Application: *
          </b>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded px-8 pb-8 mb-4 w-full"
          >
            <button
              type="button"
              className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={onFinish}
            >
              X
            </button>
            <label className="block text-orange-500 mb-2">
              Personalized Message:
            </label>
            <textarea
              className="border border-orange-500 mb-4 resize-none w-full h-40 p-2 rounded-md"
              ref={msgRef}
            />
            <input
              className="mt-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
              value="Upload"
            />
            <b className="text-sm mt-4 text-orange-500 block text-center">
              All sections marked (*) are required
            </b>
          </form>
        </div>
      )}
    </>
  );
}

export default ApplyFlatForm;
