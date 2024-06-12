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
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfileData = await fetchUserByID(userID);
      setUserProfile(userProfileData);
    };

    fetchUserProfile();
    setInterval(() => {
      setLoading(false);
    }, 600);
  }, [userID]);

  return (
    <>
      {loading && <LoadingOverlay />}
      {userProfile && <UserProfileView userProfile={userProfile} />}
    </>
  );
}
