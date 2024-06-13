import React, { useEffect, useState } from "react";
import ManageFlatCard from "../cards/ManageFlatCard";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import UserApplicationCard from "../cards/UserApplicationCard";
import { closeAdvertisement, fetchUserByID } from "@/lib/firebase";
import AddFlatFormButton from "../forms/AddFlatFormButton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { fetchApplicationByID } from "@/lib/firebase";
import { UserApplication } from "@/data/userApplication";
import { UserProfile } from "@/data/userProfile";
import Cookies from "js-cookie";
import { db } from "@/lib/firebase"; // Import your Firestore instance
import { collection, query, where, onSnapshot } from "firebase/firestore";

type Props = { ownedFlats: FlatAdvertisment[]; getOwnedFlats: () => void };

function UserFlatsView({ ownedFlats, getOwnedFlats }: Props) {
  const [focusedFlat, setFocusedFlat] = useState<FlatAdvertisment | null>(null);

  // This contains all applications with user profiles attached, filtering out
  // applications that have already been rejected
  const [focusedApplications, setFocusedApplications] =
    useState<(UserApplication & { user: UserProfile })[]>();

  const userID = Cookies.get("userID");

  const closeAdvertisementAction = async (flatID: string) => {
    if (userID) {
      await closeAdvertisement(flatID, userID);
      getOwnedFlats();
    } else {
      console.log("ERR: No userID set?");
    }
  };

  const fetchData = async () => {
    if (focusedFlat) {
      const fetchedApplications = (
        await Promise.all(
          focusedFlat.applications.map((app) => fetchApplicationByID(app))
        )
      )
        .filter((app) => app?.status !== "REJECTED")
        .filter((app): app is UserApplication => app !== null);

      if (fetchedApplications) {
        const fetchedUsers = (
          await Promise.all(
            fetchedApplications.map((app) => fetchUserByID(app.userID))
          )
        ).filter((user): user is UserProfile => user !== null);

        fetchedApplications.map((app) => console.log(app.status));

        const applicationsWithUsers = fetchedApplications.map((app, idx) => ({
          ...app,
          user: fetchedUsers[idx],
        }));
        setFocusedApplications(applicationsWithUsers);
      }
    }
  };

  useEffect(() => {
    if (focusedFlat?.id) {
      const q = query(
        collection(db, "applications"),
        where("flatID", "==", focusedFlat.id)
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        console.log(
          "Snapshot data:",
          querySnapshot.docs.map((doc) => doc.data())
        ); // Debugging log
        fetchData();
      });

      return () => unsubscribe(); // Cleanup the listener on component unmount
    }
  }, [focusedFlat]);

  return (
    <div className="w-full flex flex-row">
      <section className="flex flex-col items-center justify-center min-h-screen w-3/5 ml-6">
        {ownedFlats.length > 0 ? (
          ownedFlats.map((ownedFlat, idx) => (
            <ManageFlatCard
              key={idx}
              flat={ownedFlat}
              seeInterestedAction={async () => {
                setFocusedFlat(ownedFlat);
              }}
              closeAdvertisementAction={() =>
                closeAdvertisementAction(ownedFlat.id)
              }
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
        <TransitionGroup>
          {focusedFlat &&
          focusedApplications &&
          focusedApplications?.length > 0 ? (
            focusedApplications?.map((application, idx) => (
              <CSSTransition
                key={idx}
                timeout={500}
                classNames={{
                  enter: `transition-opacity transform duration-500 ease-in-out delay-${
                    idx * 150
                  }`,
                  enterActive: "opacity-100 scale-100 animate-fadeIn",
                  exit: `transition-opacity transform duration-500 ease-in-out delay-${
                    idx * 150
                  }`,
                  exitActive: "opacity-0 scale-90 animate-fadeOut",
                }}
              >
                <UserApplicationCard
                  key={idx}
                  applicationWithUser={application}
                  flatID={focusedFlat.id}
                />
              </CSSTransition>
            ))
          ) : (
            <CSSTransition
              timeout={500}
              classNames={{
                enter: `transition-opacity transform duration-500 ease-in-out`,
                enterActive: "opacity-100 scale-100 animate-fadeIn",
                exit: `hidden`,
                exitActive: "hidden",
              }}
            >
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="bg-orange-500 text-white text-2xl font-bold p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto">
                  {!focusedFlat
                    ? "Manage your flats all in one place"
                    : "No pending applications yet for this flat :("}
                </div>
              </div>
            </CSSTransition>
          )}
        </TransitionGroup>
      </section>
      <AddFlatFormButton onFinish={getOwnedFlats} />
    </div>
  );
}

export default UserFlatsView;
