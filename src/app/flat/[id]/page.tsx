"use client";
import { useState, useEffect } from "react";
import SeeMoreMainViews from "@/components/SeeMoreMainView";
import { tenants } from "@/data/tenantData";
import { fetchFlat } from "@/lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Page({ params: { id } }: { params: { id: string } }) {
  // Query database
  const [flat, setFlat] = useState<FlatAdvertisment | undefined>(undefined);
  useEffect(() => {
    fetchFlat(id, setFlat);
  }, []);

  return (
    <div className="w-full flex flex-row">
      {flat ? (
        <SeeMoreMainViews
          lat={flat.lat}
          lng={flat.lng}
          images={flat.images.map((img) => ({ original: img, thumbnail: img }))}
          tenants={tenants}
        />
      ) : (
        <LoadingOverlay />
      )}
    </div>
  );
}
