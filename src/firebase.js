import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database"; // Import Realtime Database

const firebaseConfig = {
  apiKey: "AIzaSyDEFPnwFM2FTdOrmSnfJUiYgWBVKPF54_8",
  authDomain: "priya-d271b.firebaseapp.com",
  projectId: "priya-d271b",
  storageBucket: "priya-d271b.appspot.com",
  messagingSenderId: "919089572466",
  appId: "1:919089572466:web:8d6515f79ddb87d4bf70eb",
  measurementId: "G-FC9R3P42RW",
  databaseURL: "https://priya-d271b-default-rtdb.firebaseio.com/", // Realtime Database URL
};

// Initialize Firebase once
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app); // Authentication
export const db = getFirestore(app); // Firestore database
export const realtimeDB = getDatabase(app); // Realtime Database
