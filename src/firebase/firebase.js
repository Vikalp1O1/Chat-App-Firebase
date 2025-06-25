// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCU8Fm0gO60WiVtIzWFUr6j11C7IVkR8IY",
  authDomain: "authentication-7b516.firebaseapp.com",
  projectId: "authentication-7b516",
  storageBucket: "authentication-7b516.firebasestorage.app",
  messagingSenderId: "974000652620",
  appId: "1:974000652620:web:f7e2d869e2134900cb8fe9",
  measurementId: "G-T0R7XF1R98",
  // databaseUrl:'https://authentication-7b516-default-rtdb.asia-southeast1.firebasedatabase.app/'

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { app, auth, db };