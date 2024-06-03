import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

function useGetFlats() {
  const [flats, setFlats] = useState<Array<FlatAdvertisment>>([]);
  const fetchFlats = async () => {
    await getDocs(collection(db, "Flats")).then((querySnapshot) => {
      const newData: Array<FlatAdvertisment> = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: parseInt(doc.id),
          rentPerWeek: data.rentPerWeek,
          numberOfGaps: data.numberOfGaps,
          numberOfRooms: data.numberOfRooms,
          lng: 1,
          lat: 69,
          images: [
            "https://www.srijanrealty.com/wp-content/uploads/2022/07/3-bhk-flat-in-kolkata.png",
            "https://media.gettyimages.com/id/1307394117/photo/female-and-male-friends-having-breakfast-in-living-room-at-home.jpg?s=612x612&w=gi&k=20&c=jgGvUnK92GXx_mxIA6X3-9bA4Y0iSBtd8_MIS5-yWRQ=",
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
