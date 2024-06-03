"use client";
import React, { useRef } from "react";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import { useLoadScript } from '@react-google-maps/api';
import { useForm } from 'react-hook-form';
import { usePlacesWidget } from "react-google-autocomplete";
import Autocomplete from "react-google-autocomplete";

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function Form() {
  const rentRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const gapsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<number>(0);
  const latRef = useRef<number>(0);
  const addressRef = useRef<string>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload images
    const images = imgRef.current?.files;
    if (!images || images?.length == 0) {
      alert("Upload some images!");
      return;
    }

    const rent = rentRef.current?.value;
    const rooms = roomsRef.current?.value;
    const gaps = gapsRef.current?.value;
    const lat = latRef.current;
    const lng = lngRef.current;
    const addr = addressRef.current;

    if (!rent || !rooms || !gaps || !addr) {
      alert("Fill all fields!");
      return;
    }

    const imgUrls: string[] = [];
    for (let idx = 0; idx < images.length; idx++) {
      const img = images[idx];
      const storageRef = ref(storage, `flatImages/${img.name}-${Date.now()}`);
      const uploadTask = uploadBytes(storageRef, img);

      const url = await getDownloadURL((await uploadTask).ref);
      imgUrls.push(url);
    }

    // Add flat to database
    
    await addDoc(collection(db, "flats"), {
      address: addr,
      longitude: lng,
      latitude: lat,
      rentPerWeek: parseInt(rent),
      numberOfRooms: parseInt(rooms),
      numberOfGaps: parseInt(gaps),
      images: imgUrls,
    }); 

    alert("Flat added!");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <Autocomplete
        options={{
          types: ['address'],
          componentRestrictions: { country: 'uk' },
        }}
        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}

        onPlaceSelected={(place: any) => {
          const latitude = place.geometry.location.lat();
          const longitude = place.geometry.location.lng();
          latRef.current = latitude;
          lngRef.current = longitude;
          addressRef.current = place.formatted_address;
        }}
        />;
      <input
        type="number"
        className={inputStyle}
        ref={rentRef}
        placeholder="Rent per week"
        required
      />
      <input
        type="number"
        className={inputStyle}
        ref={roomsRef}
        placeholder="Number of rooms"
        required
      />
      <input
        type="number"
        className={inputStyle}
        ref={gapsRef}
        placeholder="Number of gaps"
        required
      />
      <input
        type="file"
        className={inputStyle}
        ref={imgRef}
        multiple
        accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
      />
      <input
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
        value="Submit"
      />
    </form>
  );
}

export default Form;
