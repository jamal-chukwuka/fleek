import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth }      from 'firebase/auth';
import { getStorage }   from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyB6ZFGQ4CJlpsdaJMo5zILJbEyy0WPOjrs",
    authDomain: "fleek-uic-5.firebaseapp.com",
    projectId: "fleek-uic-5",
    storageBucket: "fleek-uic-5.firebasestorage.app",
    messagingSenderId: "1010458266361",
    appId: "1:1010458266361:web:6bf4634b21bfab2bf17028",
    measurementId: "G-1R1RL11WLL"
  };

const app      = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth    = getAuth(app);
export const storage = getStorage(app);
