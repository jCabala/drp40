import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import Overlay from "../../helper/Overlay";
import ApplyFlatForm from "../../forms/ApplyFlatForm";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { UserProfile } from "@/data/userProfile";
import QuickAccessButton from "../../helper/buttons/QuickAccessButton";
import BasicInformation from "./BasicInformation";
import TenantList from "./TenantList";
import PropertyDescription from "./PropertyDescription";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRocket } from "@fortawesome/free-solid-svg-icons";
import GoBack from "@/components/helper/GoBack";

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

const containerClassName =
  "mb-8 border border-orange-200 p-4 rounded-md shadow-lg";

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

  return (
    <div>
      <GoBack />
      <div className="grid grid-cols-11 gap-4 w-full p-6">
        <section className="col-span-6 bg-white p-4">
          <div className={containerClassName}>
            <h3 className="text-orange-500 text-2xl font-semibold text-gray-800 mb-4">
              Images
            </h3>
            <div style={{ maxWidth: "100%", maxHeight: "400px" }}>
              <ImageGallery
                items={images}
                showPlayButton={false}
                showFullscreenButton={false}
                thumbnailPosition="right"
              />
            </div>
          </div>
          <div className={containerClassName}>
            <h3 className="text-orange-500 text-2xl font-semibold text-gray-800 mb-4">
              Location
            </h3>
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
                onFinish={() => {
                  setShowForm(false);
                }}
                flatID={flatID}
              />
            </Overlay>
          )}
          {/* Render form when showForm is true */}
        </div>
        <QuickAccessButton onClick={() => setShowForm(true)}>
          <span className="font-bold text-white text-center text-xl">
            APPLY{" "}
            <FontAwesomeIcon icon={faRocket} className="text-xl text-white" />{" "}
          </span>
        </QuickAccessButton>
      </div>
    </div>
  );
}
