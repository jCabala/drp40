"use client";
import ExploreViev from "@/components/views/ExploreViev";
import { useState, useEffect } from "react";
import { fetchFlats } from "../../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/helper/LoadingOverlay";
import Cookies from "js-cookie";

export default function Explore() {
  const [flats, setFlats] = useState<Array<FlatAdvertisment> | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);

  const username = Cookies.get("username");

  const getFlats = () => {
    setIsLoading(true);
    fetchFlats(setFlats);
    setTimeout(() => setIsLoading(false), 600);
  };

  useEffect(() => {
    getFlats();
  }, []);

  console.log("DASH USER", username);

  return (
    <div className="w-full flex flex-row">
      {isLoading && <LoadingOverlay />}
      {flats && <ExploreViev getFlats={getFlats} flats={flats} />}
    </div>
  );
}
