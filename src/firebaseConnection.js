import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQIX4zaSOxTaOppKf4uotaiHvOf_IMzxo",
  authDomain: "devcurso-764f4.firebaseapp.com",
  projectId: "devcurso-764f4",
  storageBucket: "devcurso-764f4.appspot.com",
  messagingSenderId: "857888774437",
  appId: "1:857888774437:web:31187f3e2daaa69fca62cc"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
})

export { db, auth };