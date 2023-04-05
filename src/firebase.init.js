// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyB6NQerIr0-TTdYWBBHpxgwi8d5PV0xUms",
   authDomain: "autoteile-f77cc.firebaseapp.com",
   projectId: "autoteile-f77cc",
   storageBucket: "autoteile-f77cc.appspot.com",
   messagingSenderId: "836585083210",
   appId: "1:836585083210:web:1e2f6d0de06cd308e431b3",
   measurementId: "G-E6QZP7TG64"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
export default auth;