// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, DocumentData, updateDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  query,
  where,
} from "firebase/firestore";
import { FlatAdvertisment } from "@/data/flatAdvertisments";
import { TenantData } from "@/data/tenantData";
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
    applications: data?.applications || [],
    labels: data?.labels || [],
  };
};

const fetchAllFlats = async (callback: any) => {
  await getDocs(collection(db, "flats")).then((querySnapshot) => {
    const newData: Array<FlatAdvertisment> = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return getFlatData(doc.id, data);
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
      console.log("No document found with the given email");
      return null;
    }
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

const fetchUserFlatsOwnedByID = async (userID: string, callback: any) => {
  const docRef = doc(db, `users/${userID}`);
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

const addUserOwnedFlatByID = async (userID: string, flatID: string) => {
  const docRef = doc(db, `users/${userID}`);
  const docSnap = await getDoc(docRef);
  console.log("Adding user owned flats...");
  if (docSnap.exists()) {
    const data : string[] = docSnap.data().flatsOwned || [];
    console.log("current user owned flat", data);
    data.push(flatID)
    await updateDoc(doc(db, "users", userID), { flatsOwned: data });
  } else {
    return;
  }
};

const updateApplication = async (flatID: string, approve: boolean, userEmail: string) => {
  const docRef = doc(db, `flats/${flatID}`);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("In flat update")
    const data : UserApplication[] = docSnap.data().applications || [];
    console.log(data)
    let newData: UserApplication[];
    if (approve) {
      newData = data.map(application => application.user.email === userEmail ? { ...application, status: "APPROVED" } : application );
      await updateDoc(doc(db, "flats", flatID), { applications: newData });
    } else {
      newData = data.map(application => application.user.email === userEmail ? { ...application, status: "REJECTED" } : application);
      await updateDoc(doc(db, "flats", flatID), { applications: newData });
    }
    
    console.log(newData)
    
  } else {
    return;
  }
}

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

  const registerUser = async (email: string, password: string, description: string, profilePic: string) => {
      const docRef = await addDoc(collection(db, "users"), {
        email: email,
        password: password,
        description: description,
        profilePic: profilePic,
      })
  };

  const getUserData = (id: string, data: DocumentData) => {
    const profile: UserProfile = {
      email: data.email,
      userID: id,
      description: data.description,
      profilePic: data.profilePic
    };
    return profile
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
    return ;
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

  const addApplication = async (userID: string, message: string, flatID: string) => {
    const docRef = doc(db, `flats/${flatID}`);
    const docSnap = await getDoc(docRef);
    const userProfile = await fetchUserByID(userID);
    if (userProfile) {
      const newUserApplication: UserApplication = {
        user: userProfile,
        msg: message,
        status: "PENDING"
      };
      if (docSnap.exists()) {
        const data : UserApplication[] = docSnap.data().applications || [];
        
        data.push(newUserApplication)
        await updateDoc(doc(db, "flats", flatID), { applications: data });
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
  fetchAllFlats,
  fetchNotOwnedFlats,
  getUserIdByEmail,
  fetchUserByEmail,
  fetchUserByID,
  fetchTenants,
  fetchTenantsByID,
  fetchTenantsByEmail,
  fetchUserFlatsOwnedByID,
  fetchUserIdByEmail,
  addTenantFlatID,
  addApplication,
  addUserOwnedFlatByID,
  updateApplication,
};
