"use client";
import { useState, useEffect, useContext } from "react";
import { fetchFlatByID, fetchUserFlatsOwnedByID } from "../../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import UserFlatsView from "@/components/views/UserFlatsView";
import Cookies from "js-cookie";
import { AlertAndLoadingContext } from "@/components/helper/contexts/AlertAndLoadingContext";

export default function MyFlats() {
  const [ownedFlats, setOwnedFlats] = useState<
    Array<FlatAdvertisment> | undefined
  >(undefined);
  const { setIsLoading } = useContext(AlertAndLoadingContext);
  const userID = Cookies.get("userID");

  const getOwnedFlats = async () => {
    console.log("Getting owned flats");
    if (ownedFlats) {
      setIsLoading(false);
    }
    if (userID) {
      await fetchUserFlatsOwnedByID(userID, setOwnedFlats);
    } else {
      console.log("LOGIN ERROR? NO USER SET");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getOwnedFlats();
  }, []);

  return (
    <div className="w-full flex flex-row">
      {ownedFlats && (
        <UserFlatsView
          getOwnedFlats={getOwnedFlats}
          ownedFlats={ownedFlats || []}
        />
      )}
    </div>
  );
}
