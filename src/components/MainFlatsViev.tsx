import React from "react";
import Card from "./Card";
import {
  APIProvider,
  Map,
  Marker,
  InfoWindow,
} from "@vis.gl/react-google-maps";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { useState, useEffect } from "react";
import Form from "./Form";
import Overlay from "./Overlay";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import LoadingOverlay from "./LoadingOverlay";
import Alert from "./Alert";

type Props = { flats: FlatAdvertisment[]; getFlats: () => void };
const centerPlaceholder = { lat: 51.509865, lng: -0.118092 };

function MainFlatsViev({ flats, getFlats }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [selectedFlat, setSelectedFlat] = useState<FlatAdvertisment | null>(
    null
  );
  const [showReducedCards, setShowReducedCards] = useState(false);
  const [alertText, setAlertText] = useState<string | undefined>(undefined)
  
  const filteredFlats =
    selectedFlat && showReducedCards
      ? flats.filter((flat) => flat.id === selectedFlat.id)
      : flats;

  useEffect(() => {
    if (alertText) {
      setTimeout(() => setAlertText(undefined), 3000);
    }
  }, [alertText]);

  return (
    <>
      <div className="w-full flex flex-row">
        {
          <section className="w-1/3">
            <TransitionGroup>
              {filteredFlats.map((flat, index) => (
                <CSSTransition
                  key={flat.id}
                  timeout={500}
                  classNames={{
                    enter: `transition-opacity transform duration-500 ease-in-out delay-${
                      index * 150
                    }`,
                    enterActive: "opacity-100 scale-100 animate-fadeIn",
                    exit: `transition-opacity transform duration-500 ease-in-out delay-${
                      index * 150
                    }`,
                    exitActive: "opacity-0 scale-90 animate-fadeOut",
                  }}
                >
                  <Card
                    id={flat.id}
                    img1={flat.images[0]}
                    img2={flat.images[1] || flat.images[0]}
                    rentPerWeek={flat.rentPerWeek}
                    numberOfGaps={flat.numberOfGaps}
                    numberOfRooms={flat.numberOfRooms}
                    labels={flat.labels}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
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
                    className="p-2 bg-white shadow-lg rounded-lg max-w-xs flex items-start space-x-2 hover:bg-gray-100 transition-colors cursor-pointer"
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
        <button
          onClick={() => setShowForm(true)}
          className="fixed w-20 h-20 bottom-4 right-4 bg-orange-500 pt-3 pb-6 px-3 rounded-full shadow-lg z-40 duration-200 hover:scale-110 flex justify-center items-center"
        >
          <span className="text-white text-center text-8xl">+</span>
        </button>
        {showForm && (
          <Overlay onClick={() => setShowForm(false)}>
            <Form
              setIsLoading={setIsFormLoading}
              setAlertText={setAlertText}
              onFinish={() => {
                getFlats();
                setShowForm(false);
              }}
            />
          </Overlay>
        )}{" "}
        {/* Render form when showForm is true */}
      </div>
      {isFormLoading && <LoadingOverlay />}
      {alertText && <Alert exitAction={() => setAlertText(undefined)} text={alertText}/>}
      
    </>
  );
}

export default MainFlatsViev;
