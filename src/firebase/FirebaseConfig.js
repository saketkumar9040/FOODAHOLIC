import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9PAsVzy6WAUBE_EiO5HCMBdBa8w9QMW8",
  authDomain: "foodaholic-fd324.firebaseapp.com",
  projectId: "foodaholic-fd324",
  storageBucket: "foodaholic-fd324.appspot.com",
  messagingSenderId: "104513043816",
  appId: "1:104513043816:web:142d173b125fb356516add",
  measurementId: "G-PQ6FYZ2DPC",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export { firebase };

/*       OLD  -  FIREBASE - CREDENTIALS

  apiKey: "AIzaSyCgTyTM33fpogRnicjdfF9M3mug0ZU-izY",
  authDomain: "foodaholic-fd71f.firebaseapp.com",
  projectId: "foodaholic-fd71f",
  storageBucket: "foodaholic-fd71f.appspot.com",
  messagingSenderId: "423529748469",
  appId: "1:423529748469:web:c9f01d9597d5b3a87fb2bc",
  measurementId: "G-Z0CB5GLVM5",
*/
