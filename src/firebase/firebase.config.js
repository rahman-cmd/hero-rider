import { initializeApp } from 'firebase/app';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ7OHRLPuRGpkUPy9rzaoqbGGpP6nHQUk",
  authDomain: "hero-rider-f09e5.firebaseapp.com",
  projectId: "hero-rider-f09e5",
  storageBucket: "hero-rider-f09e5.appspot.com",
  messagingSenderId: "53920347416",
  appId: "1:53920347416:web:c8ff60e07f2d99afc89a6d"
};

// Initialize Firebase
const initializeFirebase = () => initializeApp(firebaseConfig);
export default initializeFirebase;
