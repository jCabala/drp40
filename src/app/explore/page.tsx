"use client";
import ExploreViev from "@/components/views/ExploreViev";
import { useState, useEffect, useContext } from "react";
import { fetchNotOwnedFlats } from "../../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import Cookies from "js-cookie";
import { AlertAndLoadingContext } from "@/components/helper/contexts/AlertAndLoadingContext";
export default function Explore() {
  const [flats, setFlats] = useState<Array<FlatAdvertisment> | undefined>(
    undefined
  );
  const { setIsLoading } = useContext(AlertAndLoadingContext);
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
      {<ExploreViev getFlats={getFlats} flats={flats || []} />}
    </div>
  );
}
