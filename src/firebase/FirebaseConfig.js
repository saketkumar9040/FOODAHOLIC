import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgTyTM33fpogRnicjdfF9M3mug0ZU-izY",
  authDomain: "foodaholic-fd71f.firebaseapp.com",
  projectId: "foodaholic-fd71f",
  storageBucket: "foodaholic-fd71f.appspot.com",
  messagingSenderId: "423529748469",
  appId: "1:423529748469:web:c9f01d9597d5b3a87fb2bc",
  measurementId: "G-Z0CB5GLVM5",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase }