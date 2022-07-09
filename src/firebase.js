import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/storage";
import { getAuth } from "firebase/auth";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBnbnYFwL8WhODgei2xHYsiZod6hVNm2KI",
  authDomain: "boxer-development.firebaseapp.com",
  projectId: "boxer-development",
  storageBucket: "boxer-development.appspot.com",
  messagingSenderId: "39352833479",
  appId: "1:39352833479:web:3a1c1066f1d56436dff5e2",
});

const firestore = app.firestore();
export const database = {
  folders: firestore.collection("folders"),
  files: firestore.collection("files"),
  formatDoc: (doc) => {
    return { id: doc.id, ...doc.data() };
  },
  getCurrentTimeStamp: firebase.firestore.FieldValue.serverTimestamp,
};

export const auth = app.auth();
export const authentication = getAuth(app);
export default app;
