import React from "react";
import ManageFlatCard from "../cards/ManageFlatCard";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import UserApplicationCard from "../cards/UserApplicationCard";

type Props = { ownedFlats: FlatAdvertisment[]; getOwnedFlats: () => void };

function UserFlatsView({ ownedFlats, getOwnedFlats }: Props) {
  const [focusedFlat, setFocusedFlat] = React.useState<FlatAdvertisment | null>(
    null
  );
  const closeAddvertisement = () => {
    console.log("CLOSE ADDVERTISEMENT");
  };

  return (
    <div className="w-full flex flex-row">
      <section className="w-2/5">
        <div className="w-full flex flex-col flex-wrap">
          {ownedFlats.map((ownedFlat) => (
            <ManageFlatCard
              key={ownedFlat.id}
              id={ownedFlat.id}
              img1={ownedFlat.images[0]}
              img2={ownedFlat.images[1] || ownedFlat.images[0]}
              seeInterestedAction={() => setFocusedFlat(ownedFlat)}
              closeAdvertisementAction={() => closeAddvertisement()}
              focused={focusedFlat && focusedFlat.id === ownedFlat.id}
            />
          ))}
        </div>
      </section>
      <section className="w-3/5 ml-6 flex flex-col items-center justify-center">
        {focusedFlat && focusedFlat.applications.length > 0 ? (
          focusedFlat.applications.map((application, idx) => (
            <UserApplicationCard key={idx} application={application} />
          ))
        ) : (
          <p className="rounded-lg border-2 border-red-700 px-3 py-1 text-center">
            {focusedFlat ? "No one applied yet ;(" : "Select a flat to see people who want to FILL THAT GAP!"}
          </p>
        )}
      </section>
    </div>
  );
}
export default UserFlatsView;
