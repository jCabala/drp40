import React, { useRef } from "react";
import FormWrapper from "./FormWrapper";
import { UserProfileRefs } from "@/lib/firebase";
import { updateUserProfile } from "@/lib/firebase";

type Props = {
  onFinish: () => void;
  userID: string;
  setIsLoading: (loading: boolean) => void;
  setAlertText: (text: string) => void;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function AddUserInfoForm({
  userID,
  onFinish,
  setIsLoading,
  setAlertText,
}: Props) {
  const hobbiesRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hobbies = hobbiesRef.current?.value;
    const phoneNumber = phoneRef.current?.value;

    let userProfileRefs: UserProfileRefs = {};
    if (hobbies) {
      userProfileRefs = { ...userProfileRefs, hobbies: hobbies.split(",") };
    }

    if (phoneNumber) {
      userProfileRefs = { ...userProfileRefs, phoneNumber };
    }

    if (Object.keys(userProfileRefs).length === 0) {
      setAlertText("Please fill in at least one field");
      return false;
    }

    updateUserProfile(userID, userProfileRefs);
    return true;
  };

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      setIsLoading={setIsLoading}
      setAlertText={setAlertText}
      title="Update your information: *"
    >
      <b className="mb-3 text-sm mt-4 text-orange-500 block text-center">
        Fill in only sections you wish to change
      </b>
      <div className="mb-4">
        <label className="block text-orange-500 mb-2 appearance-none">
          Phone number:
        </label>
        <input
          type="string"
          className={inputStyle}
          placeholder="+91 1234567890"
          ref={phoneRef}
        />
      </div>

      <div className="mb-4">
        <label className="block text-orange-500 mb-2 appearance-none">
          Hobbies (comma separated):
        </label>
        <input
          type="string"
          className={inputStyle}
          ref={hobbiesRef}
          placeholder="swimming,running,reading"
        />
      </div>
    </FormWrapper>
  );
}

export default AddUserInfoForm;
