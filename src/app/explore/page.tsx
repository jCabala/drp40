"use client";
import ExploreViev from "@/components/views/ExploreViev";
import { useState, useEffect } from "react";
import { fetchNotOwnedFlats } from "../../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/helper/LoadingOverlay";
import Cookies from "js-cookie";
export default function Explore() {
  const [flats, setFlats] = useState<Array<FlatAdvertisment> | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState(true);
  const userID = Cookies.get("userID");

  const getFlats = () => {
    setIsLoading(true);
    if (userID) {
      fetchNotOwnedFlats(userID, setFlats);
    } else {
      console.log("ERR: USERID NOT SET?");
    }
    setTimeout(() => setIsLoading(false), 600);
  };

  useEffect(() => {
    getFlats();
  }, []);

  return (
    <div className="w-full flex flex-row">
      {isLoading && <LoadingOverlay />}
      {<ExploreViev getFlats={getFlats} flats={flats || []} />}
    </div>
  );
}
