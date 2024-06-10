"use client";
import MainFlatsViev from "@/components/MainFlatsViev";
import { useState, useEffect } from "react";
import { fetchUserFlatsOwned } from "../../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import LoadingOverlay from "@/components/LoadingOverlay";
import UserFlatsView from "@/components/UserFlatsView";
import Cookies from "js-cookie";

export default function Me() {
  const [ownedFlats, setOwnedFlats] = useState<
    Array<FlatAdvertisment> | undefined
  >(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const username = Cookies.get("username");

  const getOwnedFlats = () => {
    setIsLoading(true);
    fetchUserFlatsOwned(username, setOwnedFlats);
    setTimeout(() => setIsLoading(false), 600);
  };

  useEffect(() => {
    getOwnedFlats();
  }, []);

  console.log("DASH USER", username);

  return (
    <div className="w-full flex flex-row">
      {isLoading && <LoadingOverlay />}
      {ownedFlats && (
        <UserFlatsView getOwnedFlats={getOwnedFlats} ownedFlats={ownedFlats} />
      )}
    </div>
  );
}
