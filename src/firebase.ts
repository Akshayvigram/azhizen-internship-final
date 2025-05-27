// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHyge2TsFYIkLjBdz4lQfTGHKyADOQCYk",
  authDomain: "azhizen-internship.firebaseapp.com",
  projectId: "azhizen-internship",
  storageBucket: "azhizen-internship.firebasestorage.app",
  messagingSenderId: "370699654387",
  appId: "1:370699654387:web:d5ea693d1ae481f5415386"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);