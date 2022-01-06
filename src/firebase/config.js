// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAUs1JZISzvSQONkBXDtjhl6SmizgdqGag",
  authDomain: "poic-b6ff3.firebaseapp.com",
  projectId: "poic-b6ff3",
  storageBucket: "poic-b6ff3.appspot.com",
  messagingSenderId: "709069887955",
  appId: "1:709069887955:web:3f0356f5109f9bec3ff726",
  measurementId: "G-8FM04C8MRY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);