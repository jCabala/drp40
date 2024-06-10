"use client";
import { useState, useEffect } from "react";
import SeeMoreView from "@/components/views/SeeMoreView";
import { TenantData } from "@/data/tenantData";
import { fetchFlat, fetchTenantsByID, fetchUserByID } from "@/lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/helper/LoadingOverlay";
import { UserProfile } from "@/data/userProfile";

export default function Page({
  params: { userID },
}: {
  params: { userID: string };
}) {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  console.log("USER ID", userID);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfileData = await fetchUserByID(userID);
      setUserProfile(userProfileData);
    };

    fetchUserProfile();
  }, [userID]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <img
          src={userProfile?.profilePic}
          alt="Profile Picture"
          className="h-32 w-32 rounded-full object-cover"
        />
      </div>
      <div className="text-center mb-4">
        <h1 className="text-2xl font-bold">{userProfile?.email}</h1>
        <p className="text-gray-600">{userProfile?.description}</p>
      </div>
    </div>
  );
}
