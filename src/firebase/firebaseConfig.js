import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const app = initializeApp({
  apiKey: "AIzaSyCBIAIfEj1fcMDp-ccDMOR72yhVdZGOvxQ",
  authDomain: "react-todos-6a1c5.firebaseapp.com",
  projectId: "react-todos-6a1c5",
  storageBucket: "react-todos-6a1c5.appspot.com",
  messagingSenderId: "76213690061",
  appId: "1:76213690061:web:a00a6d15cc9a991507d384",
});

export const auth = getAuth(app);

export const db = getFirestore(app);
