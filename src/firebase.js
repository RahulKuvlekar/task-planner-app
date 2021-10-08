import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyD9ez_keqLXbmrrlsH3qjn3kPENuDui1k4",
  authDomain: "task-planner-app-167dd.firebaseapp.com",
  projectId: "task-planner-app-167dd",
  storageBucket: "task-planner-app-167dd.appspot.com",
  messagingSenderId: "451560933194",
  appId: "1:451560933194:web:76405697372df0117863b3",
  measurementId: "G-31D5WTPKVQ",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default db;
