import React, { useRef } from "react";
import {
  fetchUserByEmail,
  addUserOwnedFlatByID,
  db,
  storage,
} from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Autocomplete from "react-google-autocomplete";
import { useState } from "react";
import PopUpWIndow from "../helper/PopUpWindow";
import { labelTypes } from "@/data/labelTypes";
import Cookies from "js-cookie";

type Props = {
  onFinish: () => void;
  setIsLoading: (loading: boolean) => void;
  setAlertText: (text: string) => void;
};

type Label = {
  name: string;
  color: string;
  isSet: boolean;
};

const inputStyle =
  "shadow appearance-none border border-orange-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline";

function AddFlatForm({ onFinish, setIsLoading, setAlertText }: Props) {
  const rentRef = useRef<HTMLInputElement>(null);
  const roomsRef = useRef<HTMLInputElement>(null);
  const gapsRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLInputElement>(null);
  const tenantsRef = useRef<HTMLInputElement>(null);
  const houseDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const lngRef = useRef<number>(0);
  const latRef = useRef<number>(0);
  const addressRef = useRef<string>();
  const labelsRef = useRef<Label[]>(
    labelTypes.map((label) => ({ ...label, isSet: false }))
  );

  const [showPopUp, setShowPopUp] = useState(false);
  const [showQuestions, setShowQuestions] = useState(true);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const userID = Cookies.get("userID");
    const images = imgRef.current?.files;
    const rent = rentRef.current?.value;
    const rooms = roomsRef.current?.value;
    const gaps = gapsRef.current?.value;
    const lat = latRef.current;
    const lng = lngRef.current;
    const addr = addressRef.current;
    const houseDescription = houseDescriptionRef.current?.value || "";
    const tenants = tenantsRef.current?.value.split(",") || [];
    const selectedLabels = labelsRef.current
      .filter((lbl) => lbl.isSet)
      .map((lbl) => ({ name: lbl.name, color: lbl.color }));

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

    const userIDs = (
      await Promise.all(tenants.map((email) => fetchUserByEmail(email)))
    )
      .map((profile) => profile?.userID)
      .filter((userID): userID is string => typeof userID === "string");

    const docRef = await addDoc(collection(db, "flats"), {
      lister: userID,
      address: addr,
      longitude: lng,
      latitude: lat,
      rentPerWeek: parseInt(rent),
      numberOfRooms: parseInt(rooms),
      numberOfGaps: parseInt(gaps),
      images: imgUrls,
      labels: selectedLabels,
      houseDescription: houseDescription,
      tenants: userIDs,
    });

    // We want to add that this user owns this listing
    if (userID) {
      addUserOwnedFlatByID(userID, docRef.id);
    } else {
      console.log("LOGIN ERROR? NO USER SET");
    }

    setTimeout(() => {
      setIsLoading(false);
      setShowQuestions(false);
      setShowPopUp(true);
    }, 200);
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
          className="bg-white px-6 pt-10 pb-4 w-full max-w-lg mx-auto rounded-lg shadow-md relative"
          onClick={(e) => e.stopPropagation()}
        >
          <b className="text-orange-500 text-center block mb-4">
            Upload details for your GAP: *
          </b>
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded px-8 pb-8 mb-4 w-full"
          >
            <button
              type="button"
              className="shadow-sm absolute top-2 right-2 bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
              onClick={onFinish}
            >
              X
            </button>
            <div className="mb-4">
              <label className="block text-orange-500 mb-2">
                Address of property:
              </label>
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
            </div>
            <div className="mb-4">
              <label className="block text-orange-500 mb-2">
                Rent (£/week):
              </label>
              <input
                type="number"
                className={inputStyle}
                ref={rentRef}
                placeholder="Rent (£/week)"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-orange-500 mb-2">
                Total No. Rooms:
              </label>
              <input
                type="number"
                className={inputStyle}
                ref={roomsRef}
                placeholder="Total No. Rooms"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-orange-500 mb-2">
                Total No. vacancies:
              </label>
              <input
                type="number"
                className={inputStyle}
                ref={gapsRef}
                placeholder="Total No. vacancies"
                required
              />
            </div>
            <div className="mb-4">
              <b className="block text-orange-500 mb-2">
                Select some property images: *
              </b>
              <input
                type="file"
                className={inputStyle}
                ref={imgRef}
                multiple
                required
                accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
              />
            </div>
            <div className="mb-4">
              <b className="block text-orange-500 mb-2">
                Add a description for your property
              </b>
              <textarea
                className="border border-orange-500 w-full p-2 rounded-md h-40 resize-none"
                ref={houseDescriptionRef}
              />
            </div>
            <div className="mb-4">
              <b className="block text-orange-500 mb-2">
                Add current flatmates
              </b>
              <p className="text-xs mb-2">
                (If your current flatmates already have accounts, enter their
                emails separated by a comma)
              </p>
              <input
                type="email"
                className={inputStyle}
                multiple
                ref={tenantsRef}
              />
            </div>
            <div className="mb-4">
              <b className="block text-orange-500 mb-2">
                Select additional requirements for future tenants:
              </b>
              <div>
                {labelTypes.map((label, idx) => (
                  <div key={idx} className="mt-2">
                    <input
                      type="checkbox"
                      onChange={() =>
                        (labelsRef.current[idx].isSet =
                          !labelsRef.current[idx].isSet)
                      }
                    />
                    <label
                      className="font-bold ml-2"
                      style={{ color: label.color }}
                    >
                      {label.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <input
                className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                type="submit"
                value="Upload"
              />
            </div>
            <b className="block text-sm mt-4 text-orange-500 text-center">
              All sections marked (*) are required
            </b>
          </form>
        </div>
      )}
    </>
  );
}

export default AddFlatForm;
