"use client";
import { useState, useEffect } from "react";
import SeeMoreView from "@/components/views/SeeMoreView";
import { TenantData } from "@/data/tenantData";
import { fetchFlat, fetchTenantsByID } from "@/lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/helper/LoadingOverlay";

export default function Page({ params: { id } }: { params: { id: string } }) {
  // Query database
  const [flat, setFlat] = useState<FlatAdvertisment | undefined>(undefined);
  const [tenantDB, setTenants] = useState<TenantData[] | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  console.log("FLAT ID", id);
  useEffect(() => {
    fetchFlat(id, setFlat);
    fetchTenantsByID(id, setTenants);
    setTimeout(() => setLoading(false), 600);
  }, []);

  return (
    <div className="w-full flex flex-row">
      {loading && <LoadingOverlay />}
      {flat && tenantDB != undefined && (
        <SeeMoreView
          flatID={flat.id}
          lat={flat.lat}
          lng={flat.lng}
          rentPerWeek={flat.rentPerWeek}
          numberOfRooms={flat.numberOfRooms}
          numberOfGaps={flat.numberOfGaps}
          images={flat.images.map((img) => ({ original: img, thumbnail: img }))}
          tenants={tenantDB}
          labels={flat.labels}
          houseDescription={flat.houseDescription}
        />
      )}
    </div>
  );
}
