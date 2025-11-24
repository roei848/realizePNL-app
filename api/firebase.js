import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyC-vxvzyFhXNQupCbl0ZKzQ0UYEwi9cZ8E",
    authDomain: "realizepnl-app.firebaseapp.com",
    projectId: "realizepnl-app",
    storageBucket: "realizepnl-app.firebasestorage.app",
    messagingSenderId: "48814722820",
    appId: "1:48814722820:web:6b33bafc45b664b4a50a51",
  };

// Initialize once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Persistent auth
let auth;
try {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} catch (err) {
  auth = getAuth(app);
}

// Firestore
export const db = getFirestore(app);
export { auth };
export default app;

