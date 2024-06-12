import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Alert from "../../helper/Alert";
import LoadingOverlay from "../../helper/LoadingOverlay";
import Overlay from "../../helper/Overlay";
import ApplyFlatForm from "../../forms/ApplyFlatForm";
import ImageGallery from "react-image-gallery";
import { UserProfile } from "@/data/userProfile";
import QuickAccessButton from "../../helper/buttons/QuickAccessButton";
import BasicInformation from "./BasicInformation";
import TenantList from "./TenantList";
import PropertyDescription from "./PropertyDescription";

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

const containerClassName = "mb-8 border border-orange-200 p-2 rounded-md shadow-lg"

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
  const [showForm, setShowForm] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined);

  return (
    <div className="grid grid-cols-11 gap-4 w-full p-6">
      <section className="col-span-6 bg-white p-4">
        <div className={containerClassName}>
          <ImageGallery
            items={images}
            showPlayButton={false}
            thumbnailPosition="right"
            showFullscreenButton={false}
          />
        </div>
        <div className={containerClassName}>
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
      </section>
      <section className="col-span-5 bg-white rounded-lg p-4">
        <div className={containerClassName}>
          <BasicInformation
            rentPerWeek={rentPerWeek}
            numberOfRooms={numberOfRooms}
            numberOfGaps={numberOfGaps}
            labels={labels}
          />
        </div>
        <div className={containerClassName}>
        <PropertyDescription houseDescription={houseDescription} />
        </div>
        <div className={containerClassName}>
          <TenantList tenants={tenants} />
        </div>
      </section>
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
      <QuickAccessButton onClick={() => setShowForm(true)}>
        <span className="text-white text-center text-sm">APPLY</span>
      </QuickAccessButton>
    </div>
  );
}
