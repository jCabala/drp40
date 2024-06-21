import React, { useRef, useContext } from "react";
import FormWrapper from "./FormWrapper";
import { UserProfileRefs } from "@/lib/firebase";
import { updateUserProfile } from "@/lib/firebase";
import { storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { formInputStyle } from "./style/formStyles";
import FormHeader from "./style/FormHeader";
import FormLabel from "./style/FormLabel";
import FormSection from "./style/FormSection";
import { AlertAndLoadingContext } from "../helper/contexts/AlertAndLoadingContext";

type Props = {
  onFinish: () => void;
  userID: string;
};

function AddUserInfoForm({ userID, onFinish }: Props) {
  const { setAlertText } = useContext(AlertAndLoadingContext);

  const hobbiesRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const profilePicRef = useRef<HTMLInputElement>(null);
  const graduationRef = useRef<HTMLInputElement>(null);
  const universityRef = useRef<HTMLInputElement>(null);
  const sleepRef = useRef<HTMLInputElement>(null);
  const smokerRef = useRef<HTMLSelectElement>(null);
  const drinkRef = useRef<HTMLSelectElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const hobbies = hobbiesRef.current?.value;
    const phoneNumber = phoneRef.current?.value;
    const description = descriptionRef.current?.value;
    const images = profilePicRef.current?.files;
    const graduationYear = graduationRef.current?.value;
    const university = universityRef.current?.value;
    const sleep = sleepRef.current?.value;
    const smoker = smokerRef.current?.value;
    const drink = drinkRef.current?.value;

    let userProfileRefs: UserProfileRefs = {};
    if (hobbies) {
      userProfileRefs = { ...userProfileRefs, hobbies: hobbies.split(",") };
    }

    if (phoneNumber) {
      userProfileRefs = { ...userProfileRefs, phoneNumber };
    }

    if (description) {
      userProfileRefs = { ...userProfileRefs, description };
    }

    if (graduationYear) {
      userProfileRefs = { ...userProfileRefs, graduationYear: +graduationYear };
    }

    if (university) {
      userProfileRefs = { ...userProfileRefs, universityName: university };
    }

    if (sleep) {
      userProfileRefs = { ...userProfileRefs, sleepHours: sleep };
    }

    if (smoker && smoker !== "N/A") {
      userProfileRefs = { ...userProfileRefs, smoker };
    }

    if (drink && drink !== "N/A") {
      userProfileRefs = { ...userProfileRefs, drinkFrequency: drink };
    }

    if (images && images.length > 0) {
      const profilePic = images[0];
      const storageRef = ref(
        storage,
        `userImages/${profilePic?.name}-${Date.now()}`
      );
      const uploadTask = uploadBytes(storageRef, profilePic);

      const profileUrl = await getDownloadURL((await uploadTask).ref);
      userProfileRefs = { ...userProfileRefs, profilePic: profileUrl };
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
      title="Update your information: *"
    >
      <b className="mb-3 text-sm mt-4 text-orange-500 block text-center">
        Fill in only sections you wish to change
      </b>

      <FormHeader>Basic information:</FormHeader>
      <FormSection>
        <FormLabel>Phone number:</FormLabel>
        <input
          type="string"
          className={formInputStyle}
          placeholder="+91 1234567890"
          ref={phoneRef}
        />
      </FormSection>
      <FormSection>
        <FormLabel>
          <b>Update a profile picture:</b>
        </FormLabel>
        <input
          type="file"
          className={formInputStyle}
          ref={profilePicRef}
          accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
        />
      </FormSection>

      <FormHeader>About you</FormHeader>
      <FormSection>
        <FormHeader>More about you:</FormHeader>
        <FormLabel>Describe yourself in one sentence:</FormLabel>
        <textarea
          className="border border-orange-500 mb-4 resize-none w-full h-40 p-2 rounded-md"
          ref={descriptionRef}
        />
      </FormSection>
      <FormSection>
        <FormLabel>Hobbies (comma separated):</FormLabel>
        <input
          type="string"
          className={formInputStyle}
          ref={hobbiesRef}
          placeholder="swimming,running,reading"
        />
      </FormSection>

      <FormHeader>University information</FormHeader>
      <FormSection>
        <FormLabel>What university do you attend?:</FormLabel>
        <input
          ref={universityRef}
          type="string"
          className={formInputStyle}
          placeholder="Imperial"
        />
      </FormSection>
      <FormSection>
        <FormLabel>What is your expected graduation year?:</FormLabel>
        <input
          type="number"
          ref={graduationRef}
          className={formInputStyle}
          placeholder="2024"
        />
      </FormSection>

      <FormHeader>Lifestyle information:</FormHeader>
      <FormSection>
        <FormLabel>Do you smoke?:</FormLabel>
        <select ref={smokerRef} className={formInputStyle}>
          <option value={undefined}>N/A</option>
          <option value="No">No</option>
          <option value="Yes">Yes</option>
        </select>
      </FormSection>
      <FormSection>
        <FormLabel>How often do you drink?:</FormLabel>
        <select ref={drinkRef} className={formInputStyle}>
          <option value={undefined}>N/A</option>
          <option value="Never">Never</option>
          <option value="Sometimes">Sometimes</option>
          <option value="Often">Often</option>
        </select>
      </FormSection>
      <FormSection>
        <FormLabel>What is your sleep schedule?</FormLabel>
        <input
          type="string"
          ref={sleepRef}
          className={formInputStyle}
          placeholder="11PM - 7AM"
        />
      </FormSection>
    </FormWrapper>
  );
}

export default AddUserInfoForm;
