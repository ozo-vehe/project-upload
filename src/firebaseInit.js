// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe1J6dp4WTXiCEXTiluxGAbFZYjf8X0hk",
  authDomain: "obatobiayeni.firebaseapp.com",
  projectId: "obatobiayeni",
  storageBucket: "obatobiayeni.appspot.com",
  messagingSenderId: "846468506565",
  appId: "1:846468506565:web:64582dc723e625e8cb61ac",
  measurementId: "G-N4K9TSV2Y7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;