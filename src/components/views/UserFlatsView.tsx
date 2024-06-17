import React, { useEffect, useState } from "react";
import ManageFlatCard from "../cards/ManageFlatCard";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import UserApplicationCard from "../cards/UserApplicationCard";
import {
  closeAdvertisement,
  fetchFlatByID,
  fetchUserByID,
} from "@/lib/firebase";
import AddFlatFormButton from "../forms/AddFlatFormButton";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { fetchApplicationByID } from "@/lib/firebase";
import { UserApplication } from "@/data/userApplication";
import { UserProfile } from "@/data/userProfile";
import Cookies from "js-cookie";
import { db } from "@/lib/firebase"; // Import your Firestore instance
import { collection, query, where, onSnapshot, doc } from "firebase/firestore";
import Spinner from "../helper/Spinner";

type Props = { ownedFlats: FlatAdvertisment[]; getOwnedFlats: () => void };

function UserFlatsView({ ownedFlats, getOwnedFlats }: Props) {
  const [focusedFlatID, setFocusedFlatID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state

  // This contains all applications with user profiles attached, filtering out
  // applications that have already been rejected
  const [focusedApplications, setFocusedApplications] =
    useState<(UserApplication & { user: UserProfile })[]>();

  const userID = Cookies.get("userID");

  const alignLeftPanel =
    ownedFlats.length > 0 ? "justify-start" : "justify-center";
  const alignRightPanel = focusedFlatID ? "justify-start" : "justify-center";

  const closeAdvertisementAction = async (flatID: string) => {
    if (userID) {
      await closeAdvertisement(flatID, userID);
      getOwnedFlats();
    } else {
      console.log("ERR: No userID set?");
    }
  };

  const fetchData = async () => {
    if (focusedFlatID) {
      const focus = await fetchFlatByID(focusedFlatID);
      if (focus) {
        const fetchedApplications = (
          await Promise.all(
            focus.applications.map((app) => fetchApplicationByID(app))
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
          setIsLoading(false);
          setFocusedApplications(applicationsWithUsers);
        }
      }
    }
  };

  useEffect(() => {
    if (focusedFlatID) {
      // Reference to the specific document in the 'flats' collection
      const docRef = doc(db, "flats", focusedFlatID);

      // Query for the 'applications' collection where 'flatID' matches the focusedFlatID
      const q = query(
        collection(db, "applications"),
        where("flatID", "==", focusedFlatID)
      );

      // Listener for the document in the 'flats' collection
      const unsubscribeFlat = onSnapshot(docRef, (docSnapshot) => {
        if (docSnapshot.exists()) {
          fetchData();
        }
      });

      // Listener for the 'applications' collection query
      const unsubscribeApplications = onSnapshot(q, (querySnapshot) => {
        fetchData();
      });

      // Cleanup both listeners on component unmount or when focusedFlatID changes
      return () => {
        unsubscribeFlat();
        unsubscribeApplications();
      };
    }
  }, [focusedFlatID]);

  return (
    <div className="w-full flex flex-row">
      <section
        className={`flex flex-col items-center ${alignLeftPanel} min-h-screen w-3/5 ml-6`}
      >
        {ownedFlats.length > 0 ? (
          ownedFlats.map((ownedFlat, idx) => (
            <ManageFlatCard
              key={idx}
              flat={ownedFlat}
              seeInterestedAction={async () => {
                setIsLoading(true);
                setFocusedFlatID(ownedFlat.id);
              }}
              closeAdvertisementAction={() =>
                closeAdvertisementAction(ownedFlat.id)
              }
              focused={focusedFlatID === ownedFlat.id}
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
      <section
        className={`w-3/5 ml-6 flex flex-col items-center h-screen ${alignRightPanel}`}
      >
        <TransitionGroup>
          {focusedFlatID &&
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
                  flatID={focusedFlatID}
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
              <div className="flex flex-col items-center h-full w-full">
                <div className="bg-orange-500 text-white text-2xl font-bold p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto">
                  {!focusedFlatID ? (
                    "Manage your flats all in one place"
                  ) : isLoading ? (
                    <div className="bg-white text-gray-800 text-2xl font-bold p-8 rounded-xl shadow-2xl text-center max-w-lg mx-auto">
                      <Spinner />
                    </div>
                  ) : (
                    "No pending applications yet for this flat :("
                  )}
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
