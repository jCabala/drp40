// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, DocumentData, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { UserApplication } from "@/data/userApplication";
import { UserProfile } from "@/data/userProfile";

// Your web app's Firebase configuration
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  databaseURL: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

const firebaseConfig = {
  apiKey: process.env["NEXT_PUBLIC_FIREBASE_API_KEY"],
  authDomain: process.env["NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"],
  projectId: process.env["NEXT_PUBLIC_FIREBASE_PROJECT_ID"],
  storageBucket: process.env["NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET"],
  messagingSenderId: process.env["NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID"],
  appId: process.env["NEXT_PUBLIC_FIREBASE_APP_ID"],
};

const fetchTenantsByID = async (id: string, callback: any) => {
  const docRef = doc(db, `flats/${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data: string[] = docSnap.data().tenants || [];
    const tenants = await Promise.all(data.map((id) => fetchUserByID(id)));
    callback(tenants);
  } else {
    return;
  }
};

const getFlatData = (id: string, data: DocumentData) => {
  return {
    id: id,
    address: data.address,
    rentPerWeek: data.rentPerWeek,
    numberOfGaps: data.numberOfGaps,
    numberOfRooms: data.numberOfRooms,
    lng: data.longitude,
    lat: data.latitude,
    images: data.images,
    houseDescription: data.houseDescription,
    applications: data?.applications || [],
    labels: data?.labels || [],
    tenants: data?.tenants || [],
  } as FlatAdvertisment;
};

const fetchAllFlats = async (callback: any) => {
  await getDocs(collection(db, "flats")).then((querySnapshot) => {
    const newData: Array<FlatAdvertisment> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return getFlatData(doc.id, data) as FlatAdvertisment;
    });

    callback(newData);
  });
};

const fetchNotOwnedFlats = async (userID: string, callback: any) => {
  const q = query(collection(db, "flats"), where("lister", "!=", userID));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const newData: Array<FlatAdvertisment> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return getFlatData(doc.id, data);
    });
    callback(newData);
  } else {
    console.log("No document found with the given ID");
    return null;
  }
};

const fetchFlat = async (id: string, callback: any) => {
  callback(await fetchFlatByID(id));
  return;
};

// Helper to actually return the flat object
const fetchFlatByID = async (id: string) => {
  const docRef = doc(db, `flats/${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log(data.images);
    return getFlatData(docSnap.id, data);
  } else {
    return;
  }
};

const fetchUserFlatsOwnedByID = async (userID: string, callback: any) => {
  const docRef = doc(db, `users/${userID}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data: string[] = docSnap.data().flatsOwned || [];
    console.log("FLAT IDS", data);
    const flatsOwned = await Promise.all(data.map((id) => fetchFlatByID(id)));
    console.log("OWNED FLATS", flatsOwned);
    callback(flatsOwned);
  } else {
    return;
  }
};

const addUserOwnedFlatByID = async (userID: string, flatID: string) => {
  const docRef = doc(db, `users/${userID}`);
  const docSnap = await getDoc(docRef);
  console.log("Adding user owned flats...", userID);
  if (docSnap.exists()) {
    const data: string[] = docSnap.data().flatsOwned || [];
    console.log("current user owned flat", data);
    data.push(flatID);
    await updateDoc(doc(db, "users", userID), { flatsOwned: data });
  } else {
    return;
  }
};

const getUserIdByEmail = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0]; // Assuming there is only one document with the given email
    return doc.id;
  } else {
    console.log("No document found with the given email");
    return null;
  }
};

const registerUser = async (
  email: string,
  password: string,
  profilePic: string,
  phoneNumber: string
) => {
  const docRef = await addDoc(collection(db, "users"), {
    email: email,
    password: password,
    profilePic: profilePic,
    phoneNumber: phoneNumber,
  });
};

const getUserData = (id: string, data: DocumentData) => {
  const profile: UserProfile = {
    email: data.email,
    userID: id,
    description: data.description,
    profilePic: data.profilePic,
  };
  return profile;
};

const fetchUserByEmail = async (email: string): Promise<UserProfile | null> => {
  const q = query(collection(db, "users"), where("email", "==", email));
  let userProfile: UserProfile | null = null;

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    const data = doc.data();
    userProfile = getUserData(doc.id, data);
    console.log("FETCHING USER", userProfile);
  }
  return userProfile;
};

const fetchUserIdByEmail = async (email: string) => {
  const q = query(collection(db, "users"), where("email", "==", email));

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.id;
  }
  return;
};

const fetchUserByID = async (userID: string): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const userProfile = docSnap.data() as UserProfile;
    userProfile.userID = userID;
    return userProfile;
  } else {
    console.log("No document found with the given ID");
    return null;
  }
};

const getApplicationData = (id: string, data: DocumentData) => {
  return {
    id: id,
    userID: data.userID,
    flatID: data.flatID,
    msg: data.msg,
    status: data.status,
  } as UserApplication;
};

const fetchApplicationByID = async (
  appID: string
): Promise<UserApplication | null> => {
  const docRef = doc(db, "applications", appID);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const userProfile = getApplicationData(docSnap.id, docSnap.data());
    return userProfile;
  } else {
    console.log("No document found with the given ID");
    return null;
  }
};

const fetchAllApplicationsByUserID = async (
  userID: string
): Promise<UserApplication[]> => {
  const applications: UserApplication[] = [];

  // Query the applications collection where userID field matches the passed-in value
  const querySnapshot = await getDocs(
    query(collection(db, "applications"), where("userID", "==", userID))
  );

  // Iterate through the query snapshot
  querySnapshot.forEach((doc) => {
    const userProfile = getApplicationData(doc.id, doc.data());
    applications.push(userProfile);
  });

  return applications;
};

const addApplication = async (
  userID: string,
  message: string,
  flatID: string
) => {
  const newUserApplication = {
    userID: userID,
    flatID: flatID,
    msg: message,
    status: "PENDING",
  };

  const applicationID = (
    await addDoc(collection(db, "applications"), newUserApplication)
  ).id;

  const docRef = doc(db, `flats/${flatID}`);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const data: string[] = docSnap.data().applications || [];

    data.push(applicationID);
    await updateDoc(doc(db, "flats", flatID), { applications: data });
  } else {
    return;
  }
};

type UserProfileRefs = {
  // Basic
  profilePic?: string;
  phoneNumber?: string;

  // University
  universityName?: string;
  graduationYear?: number;

  // Lifestyle
  drinkFrequency?: string;
  smoker?: string;
  sleepHours?: string;

  // Other
  description?: string;
  hobbies?: string[];
};
const updateUserProfile = async (userId: string, refs: UserProfileRefs) => {
  const docRef = doc(db, "users", userId);
  await updateDoc(docRef, refs);
};

const updateApplication = async (
  flatID: string,
  userID: string,
  approve: boolean
) => {
  const q = query(
    collection(db, "applications"),
    where("userID", "==", userID),
    where("flatID", "==", flatID) // Add your additional condition here
  );
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const refDoc = querySnapshot.docs[0];
    const newStatus = approve ? "APPROVED" : "REJECTED";

    await updateDoc(doc(db, "applications", refDoc.id), { status: newStatus });
  } else {
    console.log("No document found with the given ID");
    return null;
  }
};

const withdrawApplication = async (applicationID: string, flatID: string) => {
  {
    const docRef = doc(db, "applications", applicationID);
    await deleteDoc(docRef);
  }

  console.log("TRYING TO WITHDRAW APPLOICATION OF FLAT ID", flatID);

  const docRef = doc(db, "flats", flatID);
  const docSnap = await getDoc(docRef);
  if (docSnap) {
    const data: string[] = docSnap.data()?.applications || [];
    console.log("CURRENT APPLICATION IDS stored ", data);
    const newData = data.filter((appID) => appID !== applicationID);
    await updateDoc(doc(db, "flats", flatID), { applications: newData });
  }
};

const closeAdvertisement = async (flatID: string, ownerID: string) => {
  // DELETE FLAT FROM flats db
  const docRef = doc(db, `flats/${flatID}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const docRef = doc(db, "flats", flatID);
    await deleteDoc(docRef);
  }

  // Look at what applications to this flat are pending and reject them
  // automatically
  {
    const q = query(
      collection(db, "applications"),
      where("flatID", "==", flatID)
    );

    const querySnapshot = await getDocs(q);
    const updatePromises = querySnapshot.docs.map(async (docSnapshot) => {
      const docRef = doc(db, "applications", docSnapshot.id);
      const userApplication = docSnap.data() as UserApplication;
      if (userApplication.status == "PENDING") {
        await updateDoc(docRef, { status: "REJECTED" });
      }
    });

    await Promise.all(updatePromises);
  }

  {
    const docRef = doc(db, `users/${ownerID}`);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data: string[] = docSnap.data().flatsOwned || [];
      const newData = data.filter((id) => id !== flatID);
      await updateDoc(doc(db, "users", ownerID), { flatsOwned: newData });
    } else {
      return;
    }
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
export {
  db,
  storage,
  registerUser,
  fetchFlat,
  fetchFlatByID,
  fetchAllFlats,
  fetchNotOwnedFlats,
  getUserIdByEmail,
  fetchUserByEmail,
  fetchUserByID,
  fetchTenantsByID,
  fetchUserFlatsOwnedByID,
  fetchUserIdByEmail,
  addApplication,
  fetchApplicationByID,
  fetchAllApplicationsByUserID,
  addUserOwnedFlatByID,
  updateApplication,
  withdrawApplication,
  closeAdvertisement,
  updateUserProfile,
};

export type { UserProfileRefs };
