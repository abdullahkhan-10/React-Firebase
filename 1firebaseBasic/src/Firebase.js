// This file will helps to connect our react application Frontend with firebase/Backend

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_t2uRMcThXTszKAPtkXRuDE9xhZKwt8w",
  authDomain: "react-firebase-e1790.firebaseapp.com",
  projectId: "react-firebase-e1790",
  storageBucket: "react-firebase-e1790.appspot.com",
  messagingSenderId: "239534908940",
  appId: "1:239534908940:web:38009f8bffd52533e2b029",
  measurementId: "G-8239GSG6PE",

  // we need to add the url of database from firebase.
  databaseURL: "https://react-firebase-e1790-default-rtdb.firebaseio.com"
};

// Initialize Firebase
// we will need this app in our components to connect them with firebase, so we need to export it.
export const app = initializeApp(firebaseConfig);
