// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzFnFt0bbjHXNf_sXsCox-PEV1N-bmPyQ",
  authDomain: "storage-9ebf5.firebaseapp.com",
  projectId: "storage-9ebf5",
  // storage id 
  storageBucket: "storage-9ebf5.appspot.com",
  messagingSenderId: "325352217349",
  appId: "1:325352217349:web:aa2a7452cf47ad1866b56c",
  measurementId: "G-RDVFCXXBTX",

  // Change the url.
  databaseURL: "https://storage-9ebf5-default-rtdb.firebaseio.com"

};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);