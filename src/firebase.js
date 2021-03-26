import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpVAzkQTHvnlTwzGcU47aiSZNwzw9iOCg",
  authDomain: "helponizer-74da5.firebaseapp.com",
  databaseURL: "https://helponizer-74da5-default-rtdb.firebaseio.com",
  projectId: "helponizer-74da5",
  storageBucket: "helponizer-74da5.appspot.com",
  messagingSenderId: "860339054214",
  appId: "1:860339054214:web:32e0ff791058ecbd6cd307",
};

firebase.initializeApp(firebaseConfig);
export const fireData = firebase.database();
export const fireAuth = firebase.auth()
export const fireStore = firebase.firestore()
export const fireGoogleProvider = new firebase.auth.GoogleAuthProvider()