import RoomView from "@/components/RoomView";
import TenantCard from "./TenantCards";
import { useState } from "react";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { TenantData } from "@/data/tenantData";
import Label from "./Label";

type Props = {
  lat: number;
  lng: number;
  images: { original: string; thumbnail: string }[];
  tenants: TenantData[];
  rentPerWeek: number;
  numberOfRooms: number;
  numberOfGaps: number;
  labels?: { name: string; color: string }[];
};

const fadedDesc = "opacity-0";
const visibleDesc = "opacity-100";

export default function SeeMoreMainViews({
  rentPerWeek,
  numberOfGaps,
  numberOfRooms,
  lat,
  lng,
  images,
  tenants,
  labels,
}: Props) {
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
                <Label className="h-10" key={label.name} name={label.name} color={label.color} />
              ))}{" "}
            </div>
          </div>
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
        <div className="flex flex-wrap justify-center">
          {tenants.length > 0 &&
            tenants.map((tenant, idx) => (
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
