import React, { useRef, useContext } from "react";
import { addApplication } from "@/lib/firebase";
import FormWrapper from "./FormWrapper";

import Cookies from "js-cookie";
import FormLabel from "./style/FormLabel";
import { AlertAndLoadingContext } from "../helper/contexts/AlertAndLoadingContext";

type Props = {
  onFinish: () => void;
  flatID: string;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function ApplyFlatForm({ onFinish, flatID }: Props) {
  const { setAlertText } = useContext(AlertAndLoadingContext);
  const msgRef = useRef<HTMLTextAreaElement>(null);
  const userID = Cookies.get("userID");

  const handleSubmit = async (e: React.FormEvent) => {
    const msg = msgRef.current?.value;
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
      title="Upload details for your Application: *"
    >
      <FormLabel>Personalized Message:</FormLabel>
      <textarea
        required
        className="border border-orange-500 mb-4 resize-none w-full h-40 p-2 rounded-md"
        ref={msgRef}
      />
    </FormWrapper>
  );
}

export default ApplyFlatForm;
