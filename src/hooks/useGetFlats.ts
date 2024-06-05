import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

function useGetFlats() {
  const [flats, setFlats] = useState<Array<FlatAdvertisment>>([]);
  const fetchFlats = async () => {
    await getDocs(collection(db, "flats")).then((querySnapshot) => {
      const newData: Array<FlatAdvertisment> = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: parseInt(doc.id),
          address: data.address,
          rentPerWeek: data.rentPerWeek,
          numberOfGaps: data.numberOfGaps,
          numberOfRooms: data.numberOfRooms,
          lng: data.longitude,
          lat: data.latitude,
          images: data.images,
          labels: [
            { name: "Women only", color: "#C70039" },
            { name: "No smoking", color: "#FFC300" },
          ],
        };
      });

      console.log(flats, newData);
      setFlats(newData);
    });
  };
  useEffect(() => {
    fetchFlats();
  }, []);

  return flats;
}

export default useGetFlats;
