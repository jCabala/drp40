import React from "react";
import Card from "./Card";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { useState, useRef } from "react";
import Form from "./Form";

type Props = { flats: FlatAdvertisment[] };

function MainFlatsViev({ flats }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState<FlatAdvertisment | null>(
    null
  );

  return (
    <div className="w-full flex flex-row">
      {
        <section className="w-1/3">
          {selectedFlat
            ? flats
                .filter((flat) => flat.lat == selectedFlat.lat)
                .map((flat) => (
                  <Card
                    id={flat.id}
                    key={flat.id}
                    img1={flat.images[0]}
                    img2={flat.images[1] || flat.images[0]}
                    rentPerWeek={flat.rentPerWeek}
                    numberOfGaps={flat.numberOfGaps}
                    numberOfRooms={flat.numberOfRooms}
                    labels={flat.labels}
                  />
                ))
            : flats.map((flat) => (
                <Card
                  id={flat.id}
                  key={flat.id}
                  img1={flat.images[0]}
                  img2={flat.images[1] || flat.images[0]}
                  rentPerWeek={flat.rentPerWeek}
                  numberOfGaps={flat.numberOfGaps}
                  numberOfRooms={flat.numberOfRooms}
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
            defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
            defaultZoom={12}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
          >
            {flats.map((flat) => (
              <Marker
                key={flat.id}
                position={{ lat: flat.lat, lng: flat.lng }}
                onMouseOver={() => {
                  setSelectedFlat(flat);
                  console.log("ONHOVER", selectedFlat?.address);
                }}
                onClick={() => {
                  console.log("ONCLICK", flat.address);
                }}
              />
            ))}

            {selectedFlat && (
              <InfoWindow
                position={{ lat: selectedFlat.lat, lng: selectedFlat.lng }}
                onCloseClick={() => setSelectedFlat(null)}
                options={{ pixelOffset: new window.google.maps.Size(0, -30) }}
              >
                <div className="p-2 bg-white shadow-lg rounded-lg max-w-xs flex items-start space-x-2">
                  <img
                    src={selectedFlat.images[0]}
                    alt="Flat"
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex flex-col justify-start">
                    <h2 className="text-lg font-bold text-orange-500 mb-1">
                      Address
                    </h2>
                    <p className="text-gray-700 text-sm">
                      {selectedFlat.address}
                    </p>
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>
      </section>
      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-4 right-4 bg-orange-500 text-white py-3 px-6 rounded-full shadow-lg z-50"
      >
        +
      </button>
      {showForm && <Form onFinish={() => setShowForm(false)} />}{" "}
      {/* Render form when showForm is true */}
    </div>
  );
}

export default MainFlatsViev;
