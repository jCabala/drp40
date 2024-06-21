"use client";
import ExploreViev from "@/components/views/ExploreViev";
import { useState, useEffect, useContext } from "react";
import { fetchNotOwnedFlats } from "../../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import Cookies from "js-cookie";
import { AlertAndLoadingContext } from "@/components/helper/contexts/AlertAndLoadingContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Explore() {
  const [flats, setFlats] = useState<Array<FlatAdvertisment> | undefined>(
    undefined
  );
  const { setIsLoading } = useContext(AlertAndLoadingContext);
  const userID = Cookies.get("userID");

  const getFlats = () => {
    if (flats) {
      setIsLoading(false);
    } else {
      setIsLoading(true);
    }
    if (userID) {
      fetchNotOwnedFlats(userID, setFlats);
    } else {
      console.log("ERR: USERID NOT SET?");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "flats"), () => {
      getFlats();
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, [userID]);

  return (
    <div className="w-full flex flex-row">
      {<ExploreViev getFlats={getFlats} flats={flats || []} />}
    </div>
  );
}
