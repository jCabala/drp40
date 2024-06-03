"use client";
import React, { useRef } from "react";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

function Form() {
  const rentRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const gapsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload images
    const images = imgRef.current?.files;
    if (!images || images?.length == 0) {
      alert("Upload some images!");
      return;
    }

    for (let idx = 0; idx < images.length; idx++) {
      const img = images[idx];
      const storageRef = ref(storage, `flatImages/${img.name}-${Date.now()}`);
      const uploadTask = uploadBytes(storageRef, img);

      const url = await getDownloadURL((await uploadTask).ref);
      console.log(url);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="number" ref={rentRef} placeholder="Rent per week" required />
      <input
        type="number"
        ref={roomsRef}
        placeholder="Number of rooms"
        required
      />
      <input
        type="number"
        ref={gapsRef}
        placeholder="Number of gaps"
        required
      />
      <input
        type="file"
        ref={imgRef}
        multiple
        accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
      />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default Form;
