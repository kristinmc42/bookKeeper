// firebase.js
import firebase from "firebase";
import "firebase/database";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD72lLrkz0agPfN5_gB6VbgrHBs6uneJro",
  authDomain: "book-keeper-a3900.firebaseapp.com",
  projectId: "book-keeper-a3900",
  storageBucket: "book-keeper-a3900.appspot.com",
  messagingSenderId: "230085694888",
  appId: "1:230085694888:web:43186704ef905c54e5399d",
  measurementId: "G-SKRQBN9QJQ"
};

// setting a variable that initializes our application
firebase.initializeApp(firebaseConfig);

// this exports the CONFIGURED version of firebase
export default firebase;