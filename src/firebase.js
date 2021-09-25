import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHG4ZMV1mgLrGFJztocTYUJwDnGMPrCIE",
  authDomain: "whatsapp-8a1ce.firebaseapp.com",
  projectId: "whatsapp-8a1ce",
  storageBucket: "whatsapp-8a1ce.appspot.com",
  messagingSenderId: "502978213628",
  appId: "1:502978213628:web:7ff94d630272e5b3f04979",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
