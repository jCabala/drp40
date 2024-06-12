import React, { useEffect, useState } from "react";
import { UserProfile } from "@/data/userProfile";
import Cookies from "js-cookie";
import UpdateUserInfo from "./UpdateUserInfo";

type Props = {
  userProfile: UserProfile;
};

const containerClassName =
  "border border-orange-200 bg-white p-6 rounded-lg shadow-md mb-6";
const sectionClassName =
  "border border-orange-200 flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2";

const hardcodedInfo = {
  age: 30,
  gender: "Male",
  hobbies: ["Swimming", "Reading", "Running"],
  drinkFrequency: "Sometimes",
  smoker: "No",
};

function UserProfileView({ userProfile }: Props) {
  const [userId, setUserId] = useState<string | undefined>(undefined);

  useEffect(() => {
    setUserId(Cookies.get("userID"));
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-8 w-full p-8 bg-gray-50 rounded-lg shadow-lg">
      <section className={sectionClassName}>
        <div className="mb-6 bg-gray-100 border-4 border-orange-400 p-2 rounded-full shadow-lg">
          <img
            src={userProfile?.profilePic}
            alt="Profile Picture"
            className="h-32 w-32 rounded-full object-cover"
          />
        </div>
        {userProfile && userId === userProfile.userID && (
          <div className={containerClassName}>
            <h1 className="text-xl text-orange-500 font-semibold text-center mb-4">
              It is your profile!
            </h1>
            <UpdateUserInfo userID={userId} />
          </div>
        )}
        <div className={containerClassName}>
          <h1 className="text-2xl font-semibold text-center mb-2">
            {userProfile?.email}
          </h1>
          <p className="text-gray-600 text-center">
            {userProfile?.description}
          </p>
        </div>
      </section>
      <section className={sectionClassName}>
        <div className={containerClassName}>
          <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
          <p className="text-gray-700">
            <strong>Age:</strong> {hardcodedInfo.age}
          </p>
          <p className="text-gray-700">
            <strong>Gender:</strong> {hardcodedInfo.gender}
          </p>
          <p className="text-gray-700">
            <strong>Drink Frequency:</strong> {hardcodedInfo.drinkFrequency}
          </p>
          <p className="text-gray-700">
            <strong>Smoker:</strong> {hardcodedInfo.smoker}
          </p>
        </div>
        {userProfile.hobbies && (
          <div className={containerClassName}>
            <h2 className="text-xl font-semibold mb-4">Hobbies</h2>
            <ul className="list-disc pl-5 text-gray-700">
              {userProfile.hobbies.map((hobby, index) => (
                <li key={index}>{hobby}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default UserProfileView;
