// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDEFPnwFM2FTdOrmSnfJUiYgWBVKPF54_8",
  authDomain: "priya-d271b.firebaseapp.com",
  projectId: "priya-d271b",
  storageBucket: "priya-d271b.firebasestorage.app",
  messagingSenderId: "919089572466",
  appId: "1:919089572466:web:8d6515f79ddb87d4bf70eb",
  measurementId: "G-FC9R3P42RW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);