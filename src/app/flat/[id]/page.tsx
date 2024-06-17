"use client";
import { useState, useEffect, useContext } from "react";
import SeeMoreView from "@/components/views/seeMore/SeeMoreView";
import { fetchFlat, fetchTenantsByID } from "@/lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { UserProfile } from "@/data/userProfile";
import { AlertAndLoadingContext } from "@/components/helper/contexts/AlertAndLoadingContext";

export default function Page({ params: { id } }: { params: { id: string } }) {
  // Query database
  const [flat, setFlat] = useState<FlatAdvertisment | undefined>(undefined);
  const [tenants, setTenants] = useState<UserProfile[] | undefined>(undefined);
  const { setIsLoading } = useContext(AlertAndLoadingContext);
  useEffect(() => {
    setIsLoading(true);
    fetchFlat(id, setFlat);
    fetchTenantsByID(id, setTenants);
    setTimeout(() => setIsLoading(false), 600);
  }, []);

  return (
    <>
      <div></div>
      <div className="w-full flex flex-row">
        {flat && tenants != undefined && (
          <SeeMoreView
            flatID={flat.id}
            lat={flat.lat}
            lng={flat.lng}
            rentPerWeek={flat.rentPerWeek}
            numberOfRooms={flat.numberOfRooms}
            numberOfGaps={flat.numberOfGaps}
            images={flat.images.map((img) => ({
              original: img,
              thumbnail: img,
            }))}
            tenants={tenants}
            labels={flat.labels}
            houseDescription={flat.houseDescription}
          />
        )}
      </div>
    </>
  );
}
