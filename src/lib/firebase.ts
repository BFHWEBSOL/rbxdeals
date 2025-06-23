import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
import { doc, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCEN3MM5sgtqEvjhvLLMF_wC0CJWn6jzss",
  authDomain: "speed-camera-50eee.firebaseapp.com",
  projectId: "speed-camera-50eee",
  storageBucket: "speed-camera-50eee.appspot.com",
  messagingSenderId: "610205067430",
  appId: "1:610205067430:web:3661d1425a02f0f214ac67",
  measurementId: "G-GBENFVWGHL"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, auth, db, analytics }; 