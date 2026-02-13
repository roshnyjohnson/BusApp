// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your Firebase config (replace the values below with yours)
const firebaseConfig = {
  apiKey: "AIzaSyCRrythZkPODbfKSk5Kyt_UU2kDSO3yl9M",
  authDomain: "bus-tracker-e0905.firebaseapp.com",
  databaseURL: "https://bus-tracker-e0905-default-rtdb.asia-southeast1.firebasedatabase.app", // <-- ADD THIS
  projectId: "bus-tracker-e0905",
  storageBucket: "bus-tracker-e0905.firebasestorage.app",
  messagingSenderId: "729061152399",
  appId: "1:729061152399:web:48f9819273fb274721c2fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and export
export const database = getDatabase(app);
