import React, { useRef } from "react";
import { addTenantFlatID, db, storage } from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Autocomplete from "react-google-autocomplete";
import { useState } from "react";
import PopUpWIndow from "./PopUpWindow";

type Props = {
  onFinish: () => void;
  setIsLoading: (loading: boolean) => void;
  setAlertText: (text: string) => void;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function Form({ onFinish, setIsLoading, setAlertText }: Props) {
  const rentRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const gapsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const tenantsRef = useRef<HTMLInputElement>(null);
  const houseDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const lngRef = useRef<number>(0);
  const latRef = useRef<number>(0);
  const addressRef = useRef<string>();

  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);
  const [isUpdatedFlatID, updateFlatID] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Upload images
    const images = imgRef.current?.files;
    const rent = rentRef.current?.value;
    const rooms = roomsRef.current?.value;
    const gaps = gapsRef.current?.value;
    const lat = latRef.current;
    const lng = lngRef.current;
    const addr = addressRef.current;
    const houseDescription = houseDescriptionRef.current?.value || "";
    const tenants = tenantsRef.current?.value.split(",") || [];

    if (!images || images?.length == 0) {
      setAlertText("Upload some images of the property!");
      setIsLoading(false);
      return;
    }

    if (!rent || !rooms || !gaps) {
      setAlertText("Please fill in all the fields!");
      setIsLoading(false);
      return;
    }

    if (gaps > rooms) {
      setAlertText("Number of vacancies cannot be more than number of rooms!");
      setIsLoading(false);
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
    /*
    // Add flat to database
    const docRef = await addDoc(collection(db, "flats"), {
      address: addr,
      longitude: lng,
      latitude: lat,
      rentPerWeek: parseInt(rent),
      numberOfRooms: parseInt(rooms),
      numberOfGaps: parseInt(gaps),
      images: imgUrls,
      houseDescription: houseDescription,
    });

    // We want to fetch tenants from the database based on email
    // and then update the tenants table to point to the correct flatID
    //

    tenants.map(
      async (tenant) =>
        await addTenantFlatID(tenant, docRef.id, (id: string) => {})
    ); */

    setTimeout(() => {
      setIsLoading(false);
      setShowQuestions(false);
      setShowPopUp(true);
    }, 500);
  };

  return (
    <>
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
          className="bg-white px-6 pt-32 pb-4 w-full sm:max-w-md"
          onClick={(e) => e.stopPropagation()} // stops if you click the form an exit
        >
          <b className="text-orange-500 content-centre">
            Upload details for your GAP:{" "}
          </b>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded px-8 pb-8 mb-4 w-full"
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
                latRef.current = place.geometry.location.lat();
                lngRef.current = place.geometry.location.lng();
                addressRef.current = place.formatted_address;
              }}
              required
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
              required
              accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
            />
            <b className="text-orange-500">
              Add a description for your property
            </b>
            <textarea
              className="border border-orange-500 mb-2 resize-none"
              rows={6}
              cols={30}
              ref={houseDescriptionRef}
            />
            <br />
            <b className="text-orange-500">Add current flatmates</b>
            <p className="text-xs">
              (If your current flatmates already have accounts enter their
              emails, separated by a comma)
            </p>

            <input
              type="email"
              className={inputStyle}
              multiple
              ref={tenantsRef}
            />
            <input
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              type="submit"
              value="Upload"
            />
          </form>
        </div>
      )}
    </>
  );
}

export default Form;
