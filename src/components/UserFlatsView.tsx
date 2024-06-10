import React from "react";
import Card from "./Card";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

import { CSSTransition, TransitionGroup } from "react-transition-group";

type Props = { ownedFlats: FlatAdvertisment[]; getOwnedFlats: () => void };

function UserFlatsView({ ownedFlats, getOwnedFlats }: Props) {
  return (
    <>
      <p>Flats I have listed CREATE NEW CARD VIEW FOR THIS</p>

      <section className="w-1/3">
        <div className="w-full flex flex-row">
          {
            <TransitionGroup>
              {ownedFlats.map((ownedFlat, index) => (
                <CSSTransition
                  key={ownedFlat.id}
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
                    id={ownedFlat.id}
                    img1={ownedFlat.images[0]}
                    img2={ownedFlat.images[1] || ownedFlat.images[0]}
                    rentPerWeek={ownedFlat.rentPerWeek}
                    numberOfGaps={ownedFlat.numberOfGaps}
                    numberOfRooms={ownedFlat.numberOfRooms}
                    labels={ownedFlat.labels}
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          }
        </div>
      </section>
    </>
  );
}
export default UserFlatsView;
