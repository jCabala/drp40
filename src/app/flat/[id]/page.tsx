"use client";
import { useState, useEffect } from "react";
import SeeMoreMainViews from "@/components/SeeMoreMainView";
import { TenantData } from "@/data/tenantData";
import { fetchFlat, fetchTenantsByID } from "@/lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/LoadingOverlay";
import { tenants } from "@/data/tenantData";

export default function Page({ params: { id } }: { params: { id: string } }) {
  // Query database
  const [flat, setFlat] = useState<FlatAdvertisment | undefined>(undefined);
  const [tenantDB, setTenants] = useState<TenantData[] | undefined>(undefined);
  useEffect(() => {
    fetchFlat(id, setFlat);
  }, []);
  useEffect(() => {
    fetchTenantsByID(id, setTenants);
  });

  return (
    <div className="w-full flex flex-row">
      {flat ? (
        <SeeMoreMainViews
          lat={flat.lat}
          lng={flat.lng}
          images={flat.images.map((img) => ({ original: img, thumbnail: img }))}
          tenants={tenantDB ? tenantDB : tenants}
        />
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}
