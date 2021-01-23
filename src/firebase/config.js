import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/analytics";

firebase.initializeApp({
  apiKey: "AIzaSyCLOhflVNjR3LxVfT6BFlFSdUz8b6W7xak",
  authDomain: "progresapp-2dd30.firebaseapp.com",
  projectId: "progresapp-2dd30",
  storageBucket: "progresapp-2dd30.appspot.com",
  messagingSenderId: "876917819537",
  appId: "1:876917819537:web:92e904d5148c94c676d730",
  measurementId: "G-70S9L4RP1Q",
});

const auth = firebase.auth();
const firestore = firebase.firestore();

firestore.enablePersistence().catch(function (err) {
    // TODO: Manejar el error
  console.log(err.message);
});

const analytics = firebase.analytics();

export { auth, firestore, analytics };
