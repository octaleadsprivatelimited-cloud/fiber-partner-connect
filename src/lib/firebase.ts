// Firebase placeholder configuration.
// Replace these values with your real Firebase project credentials.
// Get them from: https://console.firebase.google.com/ → Project Settings → General → Your apps
import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "REPLACE_WITH_YOUR_API_KEY",
  authDomain: "fujitomo-electronics.firebaseapp.com",
  projectId: "fujitomo-electronics",
  storageBucket: "fujitomo-electronics.appspot.com",
  messagingSenderId: "REPLACE",
  appId: "REPLACE",
};

let app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;
let _storage: FirebaseStorage | null = null;

export function getFirebase() {
  if (typeof window === "undefined") return null;
  if (!app) {
    try {
      app = initializeApp(firebaseConfig);
      _db = getFirestore(app);
      _auth = getAuth(app);
      _storage = getStorage(app);
    } catch (e) {
      console.warn("Firebase init skipped (placeholder config):", e);
    }
  }
  return app ? { app, db: _db!, auth: _auth!, storage: _storage! } : null;
}
