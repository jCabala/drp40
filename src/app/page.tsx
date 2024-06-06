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
  const [isLoading, setIsLoading] = useState(true);

  const getFlats = () => {
    setIsLoading(true);
    fetchFlats(setFlats);
    setTimeout(() => setIsLoading(false), 600);
  }

  useEffect(() => {
    getFlats();  
  }, []);

  return (
    <div className="w-full flex flex-row">
      {isLoading && <LoadingOverlay />}
      {flats && <MainFlatsViev getFlats={getFlats} flats={flats} />}
    </div>
  );
}
