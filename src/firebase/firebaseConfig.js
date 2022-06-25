import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// import { ref, set } from "firebase/database";

const app = initializeApp({
  apiKey: "AIzaSyCBIAIfEj1fcMDp-ccDMOR72yhVdZGOvxQ",
  authDomain: "react-todos-6a1c5.firebaseapp.com",
  projectId: "react-todos-6a1c5",
  storageBucket: "react-todos-6a1c5.appspot.com",
  messagingSenderId: "76213690061",
  appId: "1:76213690061:web:a00a6d15cc9a991507d384",
  databaseURL:
    "https://react-todos-6a1c5-default-rtdb.europe-west1.firebasedatabase.app",
});

export const auth = getAuth(app);

export const db = getDatabase(app);
