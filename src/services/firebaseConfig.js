// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpqYncjYwGgMGAPtPyDjyD1VqkfozP_FM",
  authDomain: "pesquisa-ec906.firebaseapp.com",
  projectId: "pesquisa-ec906",
  storageBucket: "pesquisa-ec906.appspot.com",
  messagingSenderId: "497987219803",
  appId: "1:497987219803:web:32050aab9a84f08f462a7e",
  measurementId: "G-F9663J3VXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);