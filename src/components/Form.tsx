import React, { useRef } from "react";
import { db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Autocomplete from "react-google-autocomplete";
import { useState } from "react";
import LoadingOverlay from "./LoadingOverlay";
import PopUpWIndow from "./PopUpWindow";

type Props = { onFinish: () => void };

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function Form({ onFinish }: Props) {
  const rentRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const gapsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<number>(0);
  const latRef = useRef<number>(0);
  const addressRef = useRef<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Upload images
    const images = imgRef.current?.files;
    if (!images || images?.length == 0) {
      alert("Upload some images of the property!");
      return;
    }

    const rent = rentRef.current?.value;
    const rooms = roomsRef.current?.value;
    const gaps = gapsRef.current?.value;
    const lat = latRef.current;
    const lng = lngRef.current;
    const addr = addressRef.current;
    console.log(rent, rooms, gaps);
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
    setIsLoading(false);
    setShowQuestions(false);
    setShowPopUp(true);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onFinish}
    >
      {isLoading && <LoadingOverlay />}{" "}
      {showPopUp && (
        <PopUpWIndow
          message="Upload Successful!"
          buttonText="FINISH"
          onClick={() => {
            setIsLoading(false);
            setShowPopUp(false);
            setShowQuestions(true);
            onFinish();
          }}
        />
      )}{" "}
      {/* Render popUpWIndow when showPopUp is true */}
      {/* Render loading overlay when isLoading is true */}
      {showQuestions && (
        <div
          className="relative bg-white shadow-md rounded-lg p-8 w-full sm:max-w-md"
          onClick={(e) => e.stopPropagation()} // stops if you click the form an exit
        >
          <b className="text-orange-500 content-centre">
            Upload details for your GAP:{" "}
          </b>
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <button
              className="absolute top-2 right-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={onFinish}
            >
              X
            </button>
            <Autocomplete
              options={{
                types: ["address"],
                componentRestrictions: { country: "uk" },
              }}
              placeholder="Address of property"
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
              className={inputStyle}
              onPlaceSelected={(place: any) => {
                const latitude = place.geometry.location.lat();
                const longitude = place.geometry.location.lng();
                latRef.current = latitude;
                lngRef.current = longitude;
                addressRef.current = place.formatted_address;
              }}
            />
            <input
              type="number"
              className={inputStyle}
              ref={rentRef}
              placeholder="Rent (£/week)"
              required
            />
            <input
              type="number"
              className={inputStyle}
              ref={roomsRef}
              placeholder="Total No. Rooms"
              required
            />
            <input
              type="number"
              className={inputStyle}
              ref={gapsRef}
              placeholder="Total No. vacancies"
              required
            />
            <b className="text-orange-500">Select some property images: </b>
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
              value="Upload"
            />
          </form>
        </div>
      )}
    </div>
  );
}

export default Form;
