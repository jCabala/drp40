import React, { useRef } from "react";
import { useState } from "react";
import PopUpWIndow from "../helper/PopUpWindow";
import { registerUser } from "@/lib/firebase";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

import Cookies from "js-cookie";

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

  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const images = profilePicRef.current?.files;
    let profilePic;

    if (images && images.length > 0) {
      profilePic = images[0];
    }
    const description = descriptionRef.current?.value;

    console.log("email: ", email);
    console.log("pswd: ", password);
    console.log("description: ", description);
    console.log("profile picture: ", profilePic);

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
          message="Registration Successful!"
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
          <b className="text-orange-500 text-center block mb-4">Register: *</b>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded px-8 pb-8 mb-4 w-full"
          >
            <button
              type="button"
              className="shadow-sm absolute top-2 right-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={onFinish}
            >
              X
            </button>
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
            <label className="block text-orange-500 mb-2">
              User Description:
            </label>
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
            <input
              className="mt-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
              value="Register"
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

export default RegistrationForm;
