// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBovwRJZKgFxsqEsywACIWahuidUk4ZE4",
  authDomain: "realtime-db-af39c.firebaseapp.com",
  projectId: "realtime-db-af39c",
  storageBucket: "realtime-db-af39c.appspot.com",
  messagingSenderId: "35822949353",
  appId: "1:35822949353:web:ae2daad775a02e2664b178",
  databaseURL: "https://realtime-db-af39c-default-rtdb.firebaseio.com"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);