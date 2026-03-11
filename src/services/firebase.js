import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCZjSILNd-7_GNEIdjwWWiTT9L0hrjbWqA",
  authDomain: "elagy-76383.firebaseapp.com",
  projectId: "elagy-76383",
  storageBucket: "elagy-76383.firebasestorage.app",
  messagingSenderId: "753237140435",
  appId: "1:753237140435:web:f920c05bdc7d30f3014526",
  measurementId: "G-41NHF1T86M"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);