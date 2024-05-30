import React from "react";
import Card from "./Card";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

type Props = { flats: FlatAdvertisment[] };

function MainFlatsViev({ flats }: Props) {
  return (
    <div className="w-full flex flex-row">
      {
        <section className="w-1/3">
          {flats.map((flat) => (
            <Card
              id={flat.id}
              key={flat.id}
              img1={flat.img1}
              img2={flat.img2}
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
        <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}>
          <Map
            className="w-full h-screen"
            defaultCenter={{ lat: 51.509865, lng: -0.118092 }}
            defaultZoom={6}
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
    </div>
  );
}

export default MainFlatsViev;
