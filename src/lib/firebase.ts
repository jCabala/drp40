// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, DocumentData } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { TenantData } from "@/data/tenantData";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

const fetchTenants = async (callback: any) => {
  await getDocs(collection(db, "tenants")).then((querySnapshot) => {
    const newData: Array<TenantData> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.name,
        description: data.description,
        flatID: data.flatID,
        image: data.image,
      };
    });
    callback(newData);
  });
};

const fetchTenantsByID = async (id: string, callback: any) => {
  const q = query(collection(db, "tenants"), where("flatID", "==", id));
  await getDocs(q).then((querySnapshot) => {
    const newData: Array<TenantData> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        name: data.name,
        description: data.description,
        flatID: data.flatID,
        image: data.image,
      };
    });
    callback(newData);
  });
};

const getFlatData = (id: string, data: DocumentData) => {
  return {
    id: id,
    rentPerWeek: data.rentPerWeek,
    numberOfGaps: data.numberOfGaps,
    numberOfRooms: data.numberOfRooms,
    lng: data.longitude,
    lat: data.latitude,
    images: data.images,
    houseDescription: data.houseDescription,
    labels: [
      { name: "Women only", color: "#C70039" },
      { name: "No smoking", color: "#FFC300" },
    ],
  };
};

const fetchFlats = async (callback: any) => {
  await getDocs(collection(db, "flats")).then((querySnapshot) => {
    const newData: Array<FlatAdvertisment> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return getFlatData(doc.id, data);
    });

    callback(newData);
  });
};

const fetchFlat = async (id: string, callback: any) => {
  const docRef = doc(db, `flats/${id}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    console.log(data.images);
    const newData = getFlatData(docSnap.id, data);
    callback(newData);
  } else {
    alert("Invalid url!!!");
  }
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
export { db, storage, fetchFlat, fetchFlats, fetchTenants, fetchTenantsByID };
