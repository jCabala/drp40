"use client";
import { useState, useEffect, useContext } from "react";
import { UserProfile } from "@/data/userProfile";
import { fetchUserByID } from "@/lib/firebase";
import UserProfileView from "@/components/views/userProfile/UserProfileView";
import { AlertAndLoadingContext } from "@/components/helper/contexts/AlertAndLoadingContext";

export default function Page({
  params: { userID },
}: {
  params: { userID: string };
}) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const { setIsLoading } = useContext(AlertAndLoadingContext);

  const fetchUserProfile = async () => {
    setIsLoading(true);
    const userProfileData = await fetchUserByID(userID);
    setUserProfile(userProfileData);

    setInterval(() => {
      setIsLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userID]);

  return userProfile ? (
    <UserProfileView fetchData={fetchUserProfile} userProfile={userProfile} />
  ) : (
    <></>
  );
}
