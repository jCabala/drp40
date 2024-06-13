"use client";
import { useState, useEffect } from "react";
import { UserProfile } from "@/data/userProfile";
import { fetchUserByID } from "@/lib/firebase";
import UserProfileView from "@/components/views/userProfile/UserProfileView";
import LoadingOverlay from "@/components/helper/LoadingOverlay";

export default function Page({
  params: { userID },
}: {
  params: { userID: string };
}) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async () => {
    setLoading(true);
    const userProfileData = await fetchUserByID(userID);
    setUserProfile(userProfileData);

    setInterval(() => {
      setLoading(false);
    }, 600);
  };

  useEffect(() => {
    fetchUserProfile();
  }, [userID, fetchUserProfile]);

  return (
    <>
      {loading && <LoadingOverlay />}
      {userProfile && <UserProfileView fetchData={fetchUserProfile} userProfile={userProfile} />}
    </>
  );
}
