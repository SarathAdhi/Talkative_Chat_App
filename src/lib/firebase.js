// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDPZVrpeck9Q6liI8LN6RuoHTy5aue1c-c",
  authDomain: "talkative-chatapp.firebaseapp.com",
  databaseURL: "https://talkative-chatapp-default-rtdb.firebaseio.com",
  projectId: "talkative-chatapp",
  storageBucket: "talkative-chatapp.appspot.com",
  messagingSenderId: "863417755743",
  appId: "1:863417755743:web:d9a3b1ba5c10a6e77f53ea",
  measurementId: "G-XY75Q1DM2J",
};

const app = initializeApp(firebaseConfig);

export const dbFireStore = getFirestore(app);
export const userCollectionRef = collection(dbFireStore, "users");
export const roomCollectionRef = collection(dbFireStore, "rooms");

export const dbDatabase = getDatabase(app);
