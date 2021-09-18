import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAp2ukhn3eHzM4Mt6n7RMmFF_JAbaR0piY",
  authDomain: "atomic-griffin-322805.firebaseapp.com",
  databaseURL: "https://atomic-griffin-322805-default-rtdb.firebaseio.com",
  projectId: "atomic-griffin-322805",
  storageBucket: "atomic-griffin-322805.appspot.com",
  messagingSenderId: "281245010500",
  appId: "1:281245010500:web:ee59809aa14afbf3c38a11",
  measurementId: "G-HK1NXT0JH9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

module.exports = app;




/*const firebase = require('firebase-admin');

const app = firebase.initializeApp({
    apiKey: "AIzaSyAp2ukhn3eHzM4Mt6n7RMmFF_JAbaR0piY",
    authDomain: "atomic-griffin-322805.firebaseapp.com",
    databaseURL: "https://atomic-griffin-322805-default-rtdb.firebaseio.com",
})

  // Get a reference to the database service
 module.exports = app; */

