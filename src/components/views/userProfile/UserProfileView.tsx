import React, { useEffect, useState } from "react";
import { UserProfile } from "@/data/userProfile";
import Cookies from "js-cookie";
import UpdateUserInfo from "./UpdateUserInfo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import UniversityInfo from "./UniversityInfo";
import LifestyleInfo from "./LifestyleInfo";
import BasicInfo from "./BasicInfo";
import HobbiesInfo from "./HobbiesInfo";
import UserDescription from "./UserDescription";
import ContactInfo from "./ContactInfo";

type Props = {
  userProfile: UserProfile;
  fetchData: () => void;
};

const containerClassName =
  "border border-orange-200 bg-white p-6 rounded-lg shadow-md mb-6";
const sectionClassName =
  "border border-orange-200 flex flex-col items-center bg-white p-6 rounded-lg shadow-md w-full md:w-1/2";

function UserProfileView({ userProfile, fetchData }: Props) {
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
            <h1 className="text-2xl font-semibold text-center mb-2 flex items-center justify-center gap-2">
              <FontAwesomeIcon icon={faUser} className="text-orange-500" />
              It is your profile!
            </h1>
            <UpdateUserInfo fetchData={fetchData} userID={userId} />
            <div className="h-4" />
            <ContactInfo
              email={userProfile.email}
              phoneNumber={userProfile.phoneNumber}
            />
          </div>
        )}
        {userProfile.description && (
          <div className={containerClassName}>
            <UserDescription description={userProfile.description} />
          </div>
        )}
      </section>
      <section className={sectionClassName}>
        <div className={containerClassName}>
          <BasicInfo
            name={userProfile.name || "John Doe"}
            age={userProfile.age || 18}
            gender={userProfile.gender || "Male"}
          />
        </div>
        {userProfile.hobbies && (
          <div className={containerClassName}>
            <HobbiesInfo hobbies={userProfile.hobbies} />
          </div>
        )}
        {(userProfile.graduationYear || userProfile.universityName) && (
          <div className={containerClassName}>
            <UniversityInfo
              universityName={userProfile.universityName}
              graduationYear={userProfile.graduationYear}
            />
          </div>
        )}
        {(userProfile.drinkFrequency ||
          userProfile.sleepHours ||
          userProfile.smoker) && (
          <div className={containerClassName}>
            <LifestyleInfo
              smoker={userProfile.smoker}
              drinkFrequency={userProfile.drinkFrequency}
              sleepHours={userProfile.sleepHours}
            />
          </div>
        )}
      </section>
    </div>
  );
}

export default UserProfileView;
