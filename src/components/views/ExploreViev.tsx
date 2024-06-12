import React from "react";
import SeeFlatCard from "../cards/SeeFlatCard";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { useState } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AddFlatFormButton from "../forms/AddFlatFormButton";
import ListTransitionElement from "../helper/transitions/ListTransitionElement";

type Props = { flats: FlatAdvertisment[]; getFlats: () => void };
const centerPlaceholder = { lat: 51.509865, lng: -0.118092 };

function MainFlatsViev({ flats, getFlats }: Props) {
  const [selectedFlat, setSelectedFlat] = useState<FlatAdvertisment | null>(
    null
  );
  const [showReducedCards, setShowReducedCards] = useState(false);

  const filteredFlats =
    selectedFlat && showReducedCards
      ? flats.filter((flat) => flat.id === selectedFlat.id)
      : flats;

  return (
    <div className="w-full flex flex-row">
      {
        <section className="w-1/3">
          {filteredFlats.length === 0 ? (
            <div className="bg-orange-500 text-white text-2xl p-10 rounded-md text-center">
              No flats advertised yet :( <br /> (To see your adverisements visit
              the My Flats page)
            </div>
          ) : (
            <TransitionGroup>
              {filteredFlats.map((flat, index) => (
                <ListTransitionElement key={index} delay={150 * index}>
                  <SeeFlatCard
                    id={flat.id}
                    img1={flat.images[0]}
                    img2={flat.images[1] || flat.images[0]}
                    rentPerWeek={flat.rentPerWeek}
                    numberOfGaps={flat.numberOfGaps}
                    numberOfRooms={flat.numberOfRooms}
                    labels={flat.labels}
                  />
                </ListTransitionElement>
              ))}
            </TransitionGroup>
          )}
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
                onMouseOver={() => {
                  setSelectedFlat(flat);
                  console.log("ONHOVER", selectedFlat?.address);
                }}
                onClick={() => {
                  setShowReducedCards(true);
                  console.log("ONCLICK", flat.address);
                }}
              />
            ))}

            {selectedFlat && (
              <InfoWindow
                position={{ lat: selectedFlat.lat, lng: selectedFlat.lng }}
                onCloseClick={() => {
                  setSelectedFlat(null);
                  setShowReducedCards(false);
                }}
                pixelOffset={[0, -30]}
              >
                <div
                  onClick={() => setShowReducedCards(true)}
                  className="p-2 bg-white shadow-lg rounded-lg max-w-xs flex items-start space-x-2 hover:bg-gray-300 transition-colors cursor-pointer"
                >
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
      <AddFlatFormButton onFinish={getFlats} />
      {/* Render form when showForm is true */}
    </div>
  );
}

export default MainFlatsViev;
