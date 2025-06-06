// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfSOzUQPmXfjDqxnSRvO1JlZW8cbFEc8k",
  authDomain: "azhizen-solutions-portfolio.firebaseapp.com",
  databaseURL: "https://azhizen-solutions-portfolio-default-rtdb.firebaseio.com/",
  projectId: "azhizen-solutions-portfolio",
  storageBucket: "azhizen-solutions-portfolio.firebasestorage.app",
  messagingSenderId: "1048325427961",
  appId: "1:1048325427961:web:5500191f5d2e97febf4828",
  measurementId: "G-4LF3R4VDLE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

export { db, realtimeDb }; 