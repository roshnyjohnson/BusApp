import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCRrythZkPODbfKSk5Kyt_UU2kDSO3yl9M",
  authDomain: "bus-tracker-e0905.firebaseapp.com",
  databaseURL: "https://bus-tracker-e0905-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "bus-tracker-e0905",
  storageBucket: "bus-tracker-e0905.firebasestorage.app",
  messagingSenderId: "729061152399",
  appId: "1:729061152399:web:48f9819273fb274721c2fa"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const database = getDatabase(app);
