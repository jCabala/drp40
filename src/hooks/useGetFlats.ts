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
          rentPerWeek: data.rentPerWeek,
          numberOfGaps: data.numberOfGaps,
          numberOfRooms: data.numberOfRooms,
          lng: 1,
          lat: 69,
          images: data.images,
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
