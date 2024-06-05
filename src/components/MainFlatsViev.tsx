import React from "react";
import Card from "./Card";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { useState } from "react";
import Form from "./Form";
import Overlay from "./Overlay";
import { tenants, tenantsByFlatID } from "@/data/tenantData";

type Props = { flats: FlatAdvertisment[] };
const centerPlaceholder = { lat: 51.509865, lng: -0.118092 };

function MainFlatsViev({ flats }: Props) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full flex flex-row">
      {
        <section className="w-1/3">
          {flats.map((flat) => (
            <Card
              id={flat.id}
              key={flat.id}
              img1={flat.images[0]}
              img2={
                tenantsByFlatID(flat.id)[0]
                  ? tenantsByFlatID(flat.id)[0].image
                  : flat.images[0]
              }
              rentPerWeek={flat.rentPerWeek}
              numberOfGaps={flat.numberOfGaps}
              numberOfRooms={flat.numberOfRooms}
              labels={flat.labels}
            />
          ))}
        </section>
      }
      <section
        className="fixed right-0 w-1/3 h-screen ml-4"
        style={{ width: "calc(66.666667% - 2rem)" }}
      >
        <APIProvider
          apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
          libraries={["places"]}
        >
          <Map
            className="w-full h-screen pb-24 pr-4"
            defaultCenter={
              flats.length == 0
                ? centerPlaceholder
                : { lng: flats[0].lng, lat: flats[0].lat }
            }
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {flats.map((flat) => (
              <Marker
                key={flat.id}
                position={{ lat: flat.lat, lng: flat.lng }}
              />
            ))}
          </Map>
        </APIProvider>
      </section>
      <button
        onClick={() => setShowForm(true)}
        className="fixed w-20 h-20 bottom-4 right-4 bg-orange-500 pt-3 pb-6 px-3 rounded-full shadow-lg z-40 duration-200 hover:scale-110 flex justify-center items-center"
      >
        <span className="text-white text-center text-8xl">+</span>
      </button>
      {showForm && (
        <>
          <Overlay onClick={() => setShowForm(false)}>
            <Form onFinish={() => setShowForm(false)} />
          </Overlay>
        </>
      )}{" "}
      {/* Render form when showForm is true */}
    </div>
  );
}

export default MainFlatsViev;
