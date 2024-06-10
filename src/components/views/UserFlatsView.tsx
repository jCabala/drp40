import React from "react";
import ManageFlatCard from "../cards/ManageFlatCard";
import { FlatAdvertisment } from "@/data/flatAdvertisments";

type Props = { ownedFlats: FlatAdvertisment[]; getOwnedFlats: () => void };

function UserFlatsView({ ownedFlats, getOwnedFlats }: Props) {
  const [focusedFlat, setFocusedFlat] = React.useState<FlatAdvertisment | null>(null);
  const closeAddvertisement = () => {
    console.log("CLOSE ADDVERTISEMENT");
  }

  return (
    <>
      <p>Flats I have listed CREATE NEW CARD VIEW FOR THIS</p>

      <section className="w-1/3">
        <div className="w-full flex flex-row">
          {ownedFlats.map((ownedFlat) => (
            <ManageFlatCard
              key={ownedFlat.id}
              id={ownedFlat.id}
              img1={ownedFlat.images[0]}
              img2={ownedFlat.images[1] || ownedFlat.images[0]}
              seeInterestedAction={() => setFocusedFlat(ownedFlat)}
              closeAdvertisementAction={() => closeAddvertisement()}
            />
          ))}
        </div>
      </section>
    </>
  );
}
export default UserFlatsView;
