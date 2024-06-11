import TenantCard from "../cards/TenantCards";
import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Label from "../cards/Label";
import Alert from "../helper/Alert";
import LoadingOverlay from "../helper/LoadingOverlay";
import Overlay from "../helper/Overlay";
import ApplyFlatForm from "../forms/ApplyFlatForm";
import ImageGallery from "react-image-gallery";
import { UserProfile } from "@/data/userProfile";

type Props = {
  flatID: string;
  lat: number;
  lng: number;
  images: { original: string; thumbnail: string }[];
  tenants: UserProfile[];
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  houseDescription?: string;
  labels?: { name: string; color: string }[];
};

const fadedDesc = "opacity-0";
const visibleDesc = "opacity-100";

export default function SeeMoreMainViews({
  flatID,
  rentPerWeek,
  numberOfGaps,
  numberOfRooms,
  lat,
  lng,
  images,
  tenants,
  houseDescription,
  labels,
}: Props) {
  const [focusedTenant, setFocusedTenant] = useState<UserProfile>();
  const [descFade, setDescFade] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);

  const clickAction = (tenant: UserProfile) => {
    setTimeout(() => {
      setDescFade(false);
    }, 200);

    setDescFade(true);
    setTimeout(() => setFocusedTenant(tenant), 150);
  };

  return (
    <div className="grid grid-cols-5 w-full">
      <div className="col-span-3">
        <ImageGallery
          items={images}
          showPlayButton={false}
          thumbnailPosition="right"
          showFullscreenButton={false}
        />
        <section className="pr-12 mx-2 my-4 w-full">
          <h3 className="px-2 text-xl font-bold mb-1 text-gray-700">
            Basic Information
          </h3>
          <div className="flex flex-wrap justify-between">
            <div className="w-1/3">
              <p className="mx-3 my-1">
                <b className="text-orange-500">Rent: </b>
                {rentPerWeek} £/week
              </p>
              <p className="mx-3 my-1">
                <b className="text-orange-500">Campus travel: </b>30 min
              </p>
              <p className="mx-3 my-1">
                <b className="text-orange-500">Number of rooms: </b>
                {numberOfRooms}
              </p>
              <p className="mx-3 my-1">
                Looking for <b className="text-orange-500">{numberOfGaps}</b>{" "}
                tenants
              </p>
              <p className="mx-3 my-1">
                <b className="text-orange-500">Number of bathrooms: </b>2
              </p>
            </div>
            <div className="flex flex-wrap justify-center w-2/3">
              {labels?.map((label) => (
                <Label
                  className="h-10"
                  key={label.name}
                  name={label.name}
                  color={label.color}
                />
              ))}{" "}
            </div>
            <div className="flex flex-wrap justify-center w-2/3">
              <button
                onClick={() => setShowForm(true)}
                className="fixed w-20 h-20 bottom-4 right-4 bg-orange-500 pt-3 pb-6 px-3 rounded-full shadow-lg z-40 duration-200 hover:scale-110 flex justify-center items-center"
              >
                <span className="text-white text-center text-sm">APPLY</span>
              </button>
            </div>
          </div>
          {houseDescription != null ? (
            <div className="mt-2">
              <h3 className="px-2 text-xl font-bold mb-1 text-gray-700">
                Property Description
              </h3>
              <p className="mx-3 my-1">{houseDescription}</p>
            </div>
          ) : (
            <></>
          )}
        </section>
      </div>
      <div className="min-h-screen col-span-2">
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          libraries={["places"]}
        >
          <Map
            className="w-full h-2/3 pb-4 pr-4"
            defaultCenter={{ lat: lat, lng: lng }}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          ></Map>

          <Marker position={{ lat: lat, lng: lng }} />
        </APIProvider>
        <h3 className="px-2 text-xl font-bold mb-2 text-gray-700">
          Tenant Description
        </h3>
        <div className="flex flex-wrap justify-center">
          {tenants.length > 0 &&
            tenants.map((tenant, idx) => (
              <TenantCard
                key={idx}
                tenant={tenant}
                clickAction={clickAction}
                image={tenant.profilePic}
              />
            ))}
        </div>
        <p
          className={`duration-200 mt-2 mb-3 text-gray-500 font-medium min-h-60 ${
            descFade ? fadedDesc : visibleDesc
          }`}
        >
          {tenants.length > 0 && focusedTenant?.description}
        </p>
      </div>
      <div>
        {showForm && (
          <Overlay onClick={() => setShowForm(false)}>
            <ApplyFlatForm
              setIsLoading={setIsFormLoading}
              setAlertText={setAlertText}
              onFinish={() => {
                setShowForm(false);
              }}
              flatID={flatID}
            />
          </Overlay>
        )}{" "}
        {/* Render form when showForm is true */}
      </div>
      {isFormLoading && <LoadingOverlay />}
      {alertText && (
        <Alert exitAction={() => setAlertText(undefined)} text={alertText} />
      )}
    </div>
  );
}
