"use client";
import MainFlatsViev from "@/components/MainFlatsViev";
import { useState, useEffect } from "react";
import { fetchFlats } from "../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/LoadingOverlay";

export default function Home() {
  const [flats, setFlats] = useState<Array<FlatAdvertisment> | undefined>(
    undefined
  );
  useEffect(() => {
    fetchFlats(setFlats);
  }, []);

  return (
    <div className="w-full flex flex-row">
      {flats ? <MainFlatsViev flats={flats} /> : <LoadingOverlay />}
    </div>
  );
}
