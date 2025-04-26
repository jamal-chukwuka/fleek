// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth }      from 'firebase/auth';
// import { getStorage }   from 'firebase/storage';

// const firebaseConfig = {
//     apiKey: "AIzaSyB6ZFGQ4CJlpsdaJMo5zILJbEyy0WPOjrs",
//     authDomain: "fleek-uic-5.firebaseapp.com",
//     projectId: "fleek-uic-5",
//     storageBucket: "fleek-uic-5.firebasestorage.app",
//     messagingSenderId: "1010458266361",
//     appId: "1:1010458266361:web:6bf4634b21bfab2bf17028",
//     measurementId: "G-1R1RL11WLL"
//   };

// const app      = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// export const auth    = getAuth(app);
// export const storage = getStorage(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";   // ✅ Needed for 'db'

const firebaseConfig = {
  apiKey: "AIzaSyCcigJZeLPHmAM2bEH1MkUOP9pW9SR6Zmk",
  authDomain: "fleek-uic-5-c217a.firebaseapp.com",
  projectId: "fleek-uic-5-c217a",
  storageBucket: "fleek-uic-5-c217a.appspot.com",          // ✅ FIX THIS (correct spelling)
  messagingSenderId: "316728257670",
  appId: "1:316728257670:web:636d5387daea5c452bf507",
  measurementId: "G-YNFH7S2SV4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);                      // ✅ Now 'db' is available here
