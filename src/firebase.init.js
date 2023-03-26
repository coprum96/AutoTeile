// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: 'AIzaSyB6NQerIr0-TTdYWBBHpxgwi8d5PV0xUms',
   authDomain: process.env.REACT_APP_authDomain,
   projectId: process.env.REACT_APP_projectId,
   storageBucket: process.env.REACT_APP_storageBucket,
   messagingSenderId: process.env.REACT_APP_messagingSenderId,
   appId: process.env.REACT_APP_appId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export default auth;