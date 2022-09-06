// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  onSignInSubmit,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC12u4tT6ugyic7hVUgrUvPidkujLa6IqU",
  authDomain: "otp-test-c1490.firebaseapp.com",
  projectId: "otp-test-c1490",
  storageBucket: "otp-test-c1490.appspot.com",
  messagingSenderId: "709903048410",
  appId: "1:709903048410:web:c6b24b7d3496f3eddf0fe3",
  measurementId: "G-W5QSFRQJZS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth();

export { auth, signInWithPhoneNumber, RecaptchaVerifier, firebaseConfig };
