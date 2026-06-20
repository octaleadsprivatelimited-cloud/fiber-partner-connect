import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAuth, type Auth } from "firebase/auth";
import { getStorage, type FirebaseStorage } from "firebase/storage";
import { getAnalytics, type Analytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAXdC1bcD66N9PkpJHG3YOQm0udfUg5SiY",
  authDomain: "satyapowertechnologys-293df.firebaseapp.com",
  projectId: "satyapowertechnologys-293df",
  storageBucket: "satyapowertechnologys-293df.firebasestorage.app",
  messagingSenderId: "510357840168",
  appId: "1:510357840168:web:0a155cf7303a69017b701d",
  measurementId: "G-QTKJGLH2EL",
};

let app: FirebaseApp | null = null;
let _db: Firestore | null = null;
let _auth: Auth | null = null;
let _storage: FirebaseStorage | null = null;
let _analytics: Analytics | null = null;

export function getFirebase() {
  if (typeof window === "undefined") return null;
  if (!app) {
    try {
      app = initializeApp(firebaseConfig);
      _db = getFirestore(app);
      _auth = getAuth(app);
      _storage = getStorage(app);
      _analytics = getAnalytics(app);
    } catch (e) {
      console.warn("Firebase init failed:", e);
    }
  }
  return app ? { app, db: _db!, auth: _auth!, storage: _storage!, analytics: _analytics! } : null;
}
