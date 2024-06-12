import React, { useRef } from "react";
import { useState } from "react";
import { registerUser } from "@/lib/firebase";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FormWrapper from "./FormWrapper";

type Props = {
  onFinish: () => void;
  setIsLoading: (loading: boolean) => void;
  setAlertText: (text: string) => void;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function RegistrationForm({ onFinish, setIsLoading, setAlertText }: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const images = profilePicRef.current?.files;
    let profilePic;

    if (images && images.length > 0) {
      profilePic = images[0];
    }
    const description = descriptionRef.current?.value;

    const storageRef = ref(
      storage,
      `userImages/${profilePic?.name}-${Date.now()}`
    );

    if (profilePic && email && password && description) {
      const uploadTask = uploadBytes(storageRef, profilePic);

      const profileUrl = await getDownloadURL((await uploadTask).ref);

      registerUser(email, password, description, profileUrl);
    } else {
      console.log("ERR: Invalid registration");
    }

    return true;
  };

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      setIsLoading={setIsLoading}
      setAlertText={setAlertText}
      title="Register: *"
      btnText="Register"
    >
      <div className="mb-4">
        <label className="block text-orange-500 mb-2">Email:</label>
        <input
          type="string"
          className={inputStyle}
          ref={emailRef}
          placeholder="johndoe@gmail.com"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-orange-500 mb-2 appearance-none">
          Password:
        </label>
        <input
          type="password"
          className={inputStyle}
          ref={passwordRef}
          placeholder="*********"
          required
        />
      </div>
      <label className="block text-orange-500 mb-2">User Description:</label>
      <textarea
        className="border border-orange-500 mb-4 resize-none w-full h-40 p-2 rounded-md"
        ref={descriptionRef}
      />
      <div className="mb-4">
        <b className="block text-orange-500 mb-2">
          Select a profile picture: *
        </b>
        <input
          type="file"
          className={inputStyle}
          ref={profilePicRef}
          required
          accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
        />
      </div>
    </FormWrapper>
  );
}

export default RegistrationForm;
