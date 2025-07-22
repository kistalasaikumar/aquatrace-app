// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "aquatrace-l99bg.firebaseapp.com",
  projectId: "aquatrace-l99bg",
  storageBucket: "aquatrace-l99bg.appspot.com",
  messagingSenderId: "951994027736",
  appId: "1:951994027736:web:109e2b1a1f0a0c2c10b1a0",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
