/*eslint-disable*/
import firebase from "firebase";
require('dotenv').config()

const firebaseConfig = {
//   apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DB_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.VUE_APP_APPID,
  measurementId: process.env.VUE_APP_MEASUREMENTID
};

var firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;
export const db = firebaseApp.database();
export const notesRef = db.ref('notes');

/*eslint-enable*/