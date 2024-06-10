// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, DocumentData, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  setDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { TenantData } from "@/data/tenantData";
import { UserApplication } from "@/data/userApplication";

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
      return getTenantData(doc.id, data);
    });
    callback(newData);
  });
};

const fetchTenantsByEmail = async (email: string, callback: any) => {
  const q = query(collection(db, "tenants"), where("email", "==", email));
  await getDocs(q).then((querySnapshot) => {
    const newData: Array<TenantData> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return getTenantData(doc.id, data);
    });
    callback(newData);
  });
};

const addTenantFlatID = async (email: string, newID: string, callback: any) => {
  const emailHandler = async (data: Array<TenantData>) => {
    if (data.length == 1) {
      await updateDoc(doc(db, "tenants", data[0].id), { flatID: newID });
      callback(newID);
    }
  };

  const tenants = await fetchTenantsByEmail(
    email,
    (data: Array<TenantData>) => {
      emailHandler(data);
    }
  );
};

const fetchTenantsByID = async (id: string, callback: any) => {
  const q = query(collection(db, "tenants"), where("flatID", "==", id));
  await getDocs(q).then((querySnapshot) => {
    const newData: Array<TenantData> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return getTenantData(doc.id, data);
    });
    callback(newData);
  });
};

const getTenantData = (id: string, data: DocumentData) => {
  return {
    id: id,
    name: data.name,
    description: data.description,
    flatID: data.flatID,
    image: data.image,
    email: data.email,
  };
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
    labels: data?.labels || [],
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
  callback(await _fetchFlat(id));
};

// Helper to actually return the flat object
const _fetchFlat = async (id: string) => {
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

const fetchUserFlatsOwned = async (username: string, callback: any) => {
  const docRef = doc(db, `users/${username}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data : string[] = docSnap.data().flatsOwned || [];
    console.log("FLAT IDS", data);
    const flatsOwned = await Promise.all(data.map((id) => _fetchFlat(id)));
    console.log("OWNED FLATS",flatsOwned);
    callback(flatsOwned);
  } else {
    return;
  }
};

const addUserOwnedFlat = async (username: string, flatID: string) => {
  const docRef = doc(db, `users/${username}`);
  const docSnap = await getDoc(docRef);
  console.log("Adding user owned flats...");
  if (docSnap.exists()) {
    const data : string[] = docSnap.data().flatsOwned || [];
    console.log("current user owned flat", data);
    data.push(flatID)
    await updateDoc(doc(db, "users", username), { flatsOwned: data });
  } else {
    return;
  }
};

  const addUser = async (username: string) => {
    const userRef = doc(db, 'users', username);
    const docSnap = await getDoc(userRef);
  
    if (!docSnap.exists()) {
      await setDoc(userRef, {});
      console.log(`User ${username} added successfully.`);
    } else {
      console.log(`User ${username} already exists.`);
    }
  };

  const addApplication = async (username: string, message: string, flatID: string) => {
    const docRef = doc(db, `flats/${flatID}`);
    const docSnap = await getDoc(docRef);
    const newUserApplication: UserApplication = {
      user: username,
      msg: message,
      status: "PENDING"
    };
    console.log("Adding application");
    if (docSnap.exists()) {
      const data : UserApplication[] = docSnap.data().applications || [];
      
      data.push(newUserApplication)
      await updateDoc(doc(db, "flats", flatID), { applications: data });
    } else {
      return;
    }
  };


      
    


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
export {
  db,
  storage,
  addUser,
  fetchFlat,
  fetchFlats,
  fetchUserFlatsOwned,
  addUserOwnedFlat,
  fetchTenants,
  fetchTenantsByID,
  fetchTenantsByEmail,
  addTenantFlatID,
  addApplication,
};
