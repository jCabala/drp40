import React, { useRef } from "react";
import { addApplication } from "@/lib/firebase";
import FormWrapper from "./FormWrapper";

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
  const userID = Cookies.get("userID");

  const handleSubmit = async (e: React.FormEvent) => {
    const msg = msgRef.current?.value;
    console.log("Message: ", msg);
    if (!msg) {
      setAlertText("Please fill in all the fields!");
      return false;
    }

    // Add flat to database
    if (userID) {
      addApplication(userID, msg, flatID);
    } else {
      console.log("ERR: No user logged in");
    }

    return true;
  };

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      setIsLoading={setIsLoading}
      setAlertText={setAlertText}
      title="Upload details for your Application: *"
    >
      <label className="block text-orange-500 mb-2">
        Personalized Message:
      </label>
      <textarea
        required
        className="border border-orange-500 mb-4 resize-none w-full h-40 p-2 rounded-md"
        ref={msgRef}
      />
    </FormWrapper>
  );
}

export default ApplyFlatForm;
