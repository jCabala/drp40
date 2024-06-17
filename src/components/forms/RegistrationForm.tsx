import React, { useContext, useRef } from "react";
import { registerUser } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import FormWrapper from "./FormWrapper";
import FormSection from "./style/FormSection";
import FormLabel from "./style/FormLabel";
import { formInputStyle } from "./style/formStyles";
import FormHeader from "./style/FormHeader";
import { AlertAndLoadingContext } from "../helper/contexts/AlertAndLoadingContext";

type Props = {
  onFinish: () => void;
};

function RegistrationForm({ onFinish }: Props) {
  const emailRef = useRef<HTMLInputElement>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const fullNameRef = useRef<HTMLInputElement>(null);
  const { setAlertText } = useContext(AlertAndLoadingContext);

  const handleSubmit = async (e: React.FormEvent) => {
    const email = emailRef.current?.value;
    // const password = passwordRef.current?.value;
    const password = "NULL";
    const images = profilePicRef.current?.files;
    const phoneNumber = phoneRef.current?.value;
    const age = ageRef.current?.value;
    const gender = genderRef.current?.value;
    const fullName = fullNameRef.current?.value;

    let profilePic;

    if (images && images.length > 0) {
      profilePic = images[0];
    }

    const storageRef = ref(
      storage,
      `userImages/${profilePic?.name}-${Date.now()}`
    );

    if (profilePic && email && password && phoneNumber && age && gender) {
      const uploadTask = uploadBytes(storageRef, profilePic);

      const profileUrl = await getDownloadURL((await uploadTask).ref);

      registerUser(
        email,
        password,
        profileUrl,
        phoneNumber,
        gender,
        fullName,
        parseInt(age)
      );
    } else {
      setAlertText("ERR: Invalid registration");
      return false;
    }

    return true;
  };

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      title="Register: *"
      btnText="Register"
    >
      <FormSection>
        <FormLabel>Email:</FormLabel>
        <input
          type="string"
          className={formInputStyle}
          ref={emailRef}
          placeholder="johndoe@gmail.com"
          required
        />
      </FormSection>

      <FormHeader>More about you: </FormHeader>
      <FormSection>
        <FormLabel>Full Name:</FormLabel>
        <input
          type="string"
          className={formInputStyle}
          placeholder="John Doe"
          required
          ref={fullNameRef}
        />
      </FormSection>
      <FormSection>
        <FormLabel>Age:</FormLabel>
        <input
          type="number"
          className={formInputStyle}
          placeholder="18"
          required
          ref={ageRef}
        />
      </FormSection>
      <FormSection>
        <FormLabel>Gender:</FormLabel>
        <select required ref={genderRef} className={formInputStyle}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </FormSection>
      <FormSection>
        <FormLabel>Phone number:</FormLabel>
        <input
          type="string"
          className={formInputStyle}
          placeholder="+91 1234567890"
          required
          ref={phoneRef}
        />
      </FormSection>
      <FormSection>
        <b className="block text-orange-500 mb-2">
          Select a profile picture: *
        </b>
        <input
          type="file"
          className={formInputStyle}
          ref={profilePicRef}
          required
          accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
        />
      </FormSection>
    </FormWrapper>
  );
}

export default RegistrationForm;
