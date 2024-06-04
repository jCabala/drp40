"use client"
import RoomView from "@/components/RoomView"
import { useState, useEffect } from "react";
import SeeMoreMainViews from "@/components/SeeMoreMainView"
import { images, tenants } from "@/data/tenants";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

export default function Page({ params }: { params: { id: string } }) {
  const [flat, setFlat] = useState<FlatAdvertisment | undefined>(undefined);
  

  const fetchFlats = async () => {
    const docRef = doc(db, "flats");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
        const newData = {
          id: data.id,
          rentPerWeek: data.rentPerWeek,
          numberOfGaps: data.numberOfGaps,
          numberOfRooms: data.numberOfRooms,
          lng: data.longitude,
          lat: data.latitude,
          images: data.images,
          labels: [
            { name: "Women only", color: "#C70039" },
            { name: "No smoking", color: "#FFC300" },
          ]
        };
        setFlat(newData);
      };
      
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
    await getDoc(collection(db, "flats", params.id)).then((querySnapshot) => {
      // THis is very dodgy
      const doc = querySnapshot.docs[0];
      const newData: () => FlatAdvertisment = () => {
        const data = doc.data();
        return {
          id: doc.id,
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
      };
      setFlat(newData);
    })
    
  }

    useEffect(() => {
      fetchFlats();
    }, []);
    return (
        <div className="w-full flex flex-row">
        {!flat ? <div> Loading... </div> : <SeeMoreMainViews lat={flat.lat} lng={flat.lng} images={images} tenants={tenants} />}
      </div>
    )
  }