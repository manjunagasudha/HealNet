// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAXJSdBNTfOfF1jsXiEgZo1-1sFwOPop38",
  authDomain: "healnet-75b2c.firebaseapp.com",
  projectId: "healnet-75b2c",
  storageBucket: "healnet-75b2c.firebasestorage.app",
  messagingSenderId: "994644959106",
  appId: "1:994644959106:web:569ea8c6aa17576ad0f99b",
  measurementId: "G-VW8GXGV38B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
