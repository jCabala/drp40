import React from "react";
import ManageFlatCard from "../cards/ManageFlatCard";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import UserApplicationCard from "../cards/UserApplicationCard";
import { closeAdvertisement } from "@/lib/firebase";
import AddFlatFormButton from "../forms/AddFlatFormButton";

type Props = { ownedFlats: FlatAdvertisment[]; getOwnedFlats: () => void };

function UserFlatsView({ ownedFlats, getOwnedFlats }: Props) {
  const [focusedFlat, setFocusedFlat] = React.useState<FlatAdvertisment | null>(
    null
  );

  const closeAddvertisement = async (flatID: string) => {
    console.log("CLOSE ADVERTISEMENT");
    closeAdvertisement(flatID);
    await getOwnedFlats();
  };

  return (
    <div className="w-full flex flex-row">
      <section className="flex flex-col items-center justify-center h-screen w-3/5 ml-6">
        {ownedFlats.length > 0 ? (
          ownedFlats.map((ownedFlat, idx) => (
            <ManageFlatCard
              key={idx}
              flat={ownedFlat}
              seeInterestedAction={() => setFocusedFlat(ownedFlat)}
              closeAdvertisementAction={() => closeAddvertisement(ownedFlat.id)}
              focused={focusedFlat && focusedFlat.id === ownedFlat.id}
            />
          ))
        ) : (
          <div className="bg-orange-500 text-white text-3xl font-bold p-16 rounded-lg shadow-lg text-center max-w-md mx-auto">
            No flats advertised yet :(
            <br />
            <span className="text-xl mt-4 block">
              You can advertise flats using the + button!.
            </span>
          </div>
        )}
      </section>
      <section className="w-3/5 ml-6 flex flex-col items-center justify-center h-screen">
        {focusedFlat && focusedFlat.applications.length > 0 ? (
          focusedFlat.applications.map(
            (application, idx) =>
              // Render UserApplicationCard only if application status is not 'REJECTED'
              application.status !== "REJECTED" && (
                <UserApplicationCard
                  key={idx}
                  applicationID={application}
                  flatID={focusedFlat.id}
                />
              )
          )
        ) : (
          <div className="flex flex-col items-center justify-center h-full w-full">
            <div className="bg-orange-500 text-white text-2xl font-bold p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto">
              {!focusedFlat ? (
                <>Manage your flats all in one place</>
              ) : (
                <>
                  Select a flat to see people who want to <br /> FILL THAT GAP!
                </>
              )}
            </div>
          </div>
        )}
      </section>
      <AddFlatFormButton onFinish={getOwnedFlats} />
    </div>
  );
}

export default UserFlatsView;
