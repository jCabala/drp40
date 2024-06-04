import RoomView from "@/components/RoomView";
import TenantCard from "./TenantCards";
import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

type Props = {
  lat: number;
  lng: number;
  images: { original: string; thumbnail: string }[];
  tenants: { image: string; description: string }[];
};

const fadedDesc = "opacity-0";
const visibleDesc = "opacity-100";

export default function SeeMoreMainViews({ lat, lng, images, tenants }: Props) {
  const [focusedTenant, setFocusedTenant] = useState<number>(0);
  const [descFade, setDescFade] = useState<boolean>(false);

  const clickAction = (id: number) => {
    setTimeout(() => {
      setDescFade(false);
    }, 200);

    setDescFade(true);
    setTimeout(() => setFocusedTenant(id), 150);
  };

  return (
    <div className="grid grid-cols-5">
      <div className="col-span-3">
        <RoomView images={images} />
      </div>
      <div className="min-h-screen col-span-2">
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          libraries={["places"]}
        >
          <Map
            className="w-full h-2/3 pb-4 pr-4"
            defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          ></Map>

          <Marker position={{ lat: lat, lng: lng }} />
        </APIProvider>
        <div className="flex flex-wrap justify-center">
          {tenants.map((tenant, idx) => (
            <TenantCard
              key={idx}
              id={idx}
              focusedId={focusedTenant}
              clickAction={clickAction}
              image={tenant.image}
            />
          ))}
        </div>
        <p
          className={`duration-200 mt-2 mb-3 text-gray-500 font-medium min-h-60 ${
            descFade ? fadedDesc : visibleDesc
          }`}
        >
          {tenants[focusedTenant].description}
        </p>
      </div>
    </div>
  );
}
