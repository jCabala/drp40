import React, { useRef, useContext } from "react";
import {
  fetchUserByEmail,
  addUserOwnedFlatByID,
  db,
  storage,
} from "@/lib/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";
import Autocomplete from "react-google-autocomplete";
import FormWrapper from "./FormWrapper";
import { labelTypes } from "@/data/labelTypes";
import Cookies from "js-cookie";
import FormSection from "./style/FormSection";
import FormLabel from "./style/FormLabel";
import { formInputStyle } from "./style/formStyles";
import { AlertAndLoadingContext } from "../helper/contexts/AlertAndLoadingContext";

type Props = {
  onFinish: () => void;
};

type Label = {
  name: string;
  color: string;
  isSet: boolean;
};

function AddFlatForm({ onFinish }: Props) {
  const { setAlertText } = useContext(AlertAndLoadingContext);
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

  const handleSubmit = async (e: React.FormEvent) => {
    const currUserID = Cookies.get("userID");
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
      return false;
    }

    if (!rent || !rooms || !gaps) {
      setAlertText("Please fill in all the fields!");
      return false;
    }

    if (gaps > rooms) {
      setAlertText("Number of vacancies cannot be more than number of rooms!");
      return false;
    }

    const imgUrls: string[] = [];
    for (let idx = 0; idx < images.length; idx++) {
      const img = images[idx];
      const storageRef = ref(storage, `flatImages/${img.name}-${Date.now()}`);
      const uploadTask = uploadBytes(storageRef, img);

      const url = await getDownloadURL((await uploadTask).ref);
      imgUrls.push(url);
    }

    const tenantIDs = (
      await Promise.all(tenants.map((email) => fetchUserByEmail(email)))
    )
      .map((profile) => profile?.userID)
      .filter((userID): userID is string => typeof userID === "string");

    if (currUserID && !tenantIDs.includes(currUserID)) {
      tenantIDs.push(currUserID);
    }

    const docRef = await addDoc(collection(db, "flats"), {
      lister: currUserID,
      address: addr,
      longitude: lng,
      latitude: lat,
      rentPerWeek: parseInt(rent),
      numberOfRooms: parseInt(rooms),
      numberOfGaps: parseInt(gaps),
      images: imgUrls,
      labels: selectedLabels,
      houseDescription: houseDescription,
      tenants: tenantIDs,
    });

    // We want to add that this user owns this listing
    if (currUserID) {
      addUserOwnedFlatByID(currUserID, docRef.id);
    } else {
      console.log("LOGIN ERROR? NO USER SET");
    }

    return true;
  };

  return (
    <FormWrapper
      handleSubmit={handleSubmit}
      onFinish={onFinish}
      title="Upload details for your GAP: *"
    >
      <FormSection>
        <FormLabel>Address of property:</FormLabel>
        <Autocomplete
          options={{
            types: ["address"],
            componentRestrictions: { country: "uk" },
          }}
          placeholder="Address of property"
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
          className={formInputStyle}
          onPlaceSelected={(place: any) => {
            latRef.current = place.geometry.location.lat();
            lngRef.current = place.geometry.location.lng();
            addressRef.current = place.formatted_address;
          }}
          required
        />
      </FormSection>
      <FormSection>
        <FormLabel>Rent (£/week):</FormLabel>
        <input
          type="number"
          className={formInputStyle}
          ref={rentRef}
          placeholder="Rent (£/week)"
          required
        />
      </FormSection>
      <FormSection>
        <FormLabel>Total No. Rooms:</FormLabel>
        <input
          type="number"
          className={formInputStyle}
          ref={roomsRef}
          placeholder="Total No. Rooms"
          required
        />
      </FormSection>
      <FormSection>
        <FormLabel>Total No. vacancies:</FormLabel>
        <input
          type="number"
          className={formInputStyle}
          ref={gapsRef}
          placeholder="Total No. vacancies"
          required
        />
      </FormSection>
      <FormSection>
        <b className="block text-orange-500 mb-2">
          Select some property images: *
        </b>
        <input
          type="file"
          className={formInputStyle}
          ref={imgRef}
          multiple
          required
          accept="image/png, image/gif, image/jpeg, image/jpg, image/webp"
        />
      </FormSection>
      <FormSection>
        <b className="block text-orange-500 mb-2">
          Add a description for your property
        </b>
        <textarea
          className="border border-orange-500 w-full p-2 rounded-md h-40 resize-none"
          ref={houseDescriptionRef}
        />
      </FormSection>
      <FormSection>
        <b className="block text-orange-500 mb-2">Add current tenants</b>
        <p className="text-xs mb-2">
          (If your current flatmates already have accounts, enter their emails
          separated by a comma)
        </p>
        <input
          type="email"
          className={formInputStyle}
          multiple
          ref={tenantsRef}
        />
      </FormSection>
      <FormSection>
        <b className="block text-orange-500 mb-2">
          Select additional requirements for future tenants:
        </b>
        <div>
          {labelTypes.map((label, idx) => (
            <div key={idx} className="mt-2">
              <input
                type="checkbox"
                onChange={() =>
                  (labelsRef.current[idx].isSet = !labelsRef.current[idx].isSet)
                }
              />
              <label className="font-bold ml-2" style={{ color: label.color }}>
                {label.name}
              </label>
            </div>
          ))}
        </div>
      </FormSection>
    </FormWrapper>
  );
}

export default AddFlatForm;
