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
  databaseURL: "https://priya-d271b-default-rtdb.firebaseio.com/", // Ajoute cette ligne
};

// Initialiser Firebase UNE SEULE FOIS
const app = initializeApp(firebaseConfig);

// Exporter les services Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
export const realtimeDB = getDatabase(app); // Export Realtime Database
