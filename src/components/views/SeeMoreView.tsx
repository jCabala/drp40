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
import QuickAccessButton from "../helper/buttons/QuickAccessButton";

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
  const [focusedTenant, setFocusedTenant] = useState<UserProfile | undefined>(
    tenants.length > 0 ? tenants[0] : undefined
  );
  const [descFade, setDescFade] = useState<boolean>(false);
  const [showForm, setShowForm] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);

  const tenantClickAction = (tenant: UserProfile) => {
    setTimeout(() => {
      setDescFade(false);
    }, 200);

    setDescFade(true);
    setTimeout(() => setFocusedTenant(tenant), 150);
  };

  return (
    <div className="grid grid-cols-5 gap-4 w-full p-6">
      <div className="border border-gray-200 col-span-3 bg-white rounded-lg shadow-lg p-4">
        <div className="mb-8">
          <ImageGallery
            items={images}
            showPlayButton={false}
            thumbnailPosition="right"
            showFullscreenButton={false}
          />
        </div>
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          libraries={["places"]}
        >
          <Map
            className="w-full h-80 rounded-lg mb-4"
            defaultCenter={{ lat: lat, lng: lng }}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            <Marker position={{ lat: lat, lng: lng }} />
          </Map>
        </APIProvider>
      </div>
      <div className="border border-gray-200 col-span-2 bg-white rounded-lg shadow-lg p-4">
        <section className="mt-4">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Basic Information
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-lg">
                <b className="text-orange-500">Rent: </b>
                {rentPerWeek} £/week
              </p>
              <p className="text-lg">
                <b className="text-orange-500">Campus travel: </b>30 min
              </p>
              <p className="text-lg">
                <b className="text-orange-500">Number of rooms: </b>
                {numberOfRooms}
              </p>
              <p className="text-lg">
                Looking for <b className="text-orange-500">{numberOfGaps}</b>{" "}
                tenants
              </p>
              <p className="text-lg">
                <b className="text-orange-500">Number of bathrooms: </b>2
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center">
              {labels?.map((label) => (
                <Label key={label.name} name={label.name} color={label.color} />
              ))}
            </div>
          </div>
          {houseDescription && (
            <div className="mt-6 mb-6">
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                Property Description
              </h3>
              <p className="text-md text-gray-600">{houseDescription}</p>
            </div>
          )}
        </section>

        {tenants.length > 0 ? (
          <>
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Tenant Description
            </h3>
            <div className="flex flex-wrap justify-center">
              {tenants.map((tenant, idx) => (
                <TenantCard
                  isHighlighted={focusedTenant?.email === tenant.email}
                  key={idx}
                  tenant={tenant}
                  clickAction={tenantClickAction}
                  image={tenant.profilePic}
                />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="h-20" />
            <div className="bg-orange-500 text-white text-2xl font-bold p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto">
              No current tenants added
            </div>
          </>
        )}
        <p
          className={`transition-opacity duration-200 mt-4 text-gray-600 ${
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
        )}
        {/* Render form when showForm is true */}
      </div>
      {isFormLoading && <LoadingOverlay />}
      {alertText && (
        <Alert exitAction={() => setAlertText(undefined)} text={alertText} />
      )}
      <QuickAccessButton
        onClick={() => setShowForm(true)}
      >
        <span className="text-white text-center text-sm">APPLY</span>
      </QuickAccessButton>
    </div>
  );
}
