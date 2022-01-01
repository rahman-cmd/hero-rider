import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
   apiKey: "AIzaSyC7XKcOD_a9Glvd5gDacLVCdIlQiOLakMk",
   authDomain: "hero-rider-app.firebaseapp.com",
   projectId: "hero-rider-app",
   storageBucket: "hero-rider-app.appspot.com",
   messagingSenderId: "7184478752",
   appId: "1:7184478752:web:1f51f388c7112ae7c04245"
 };

// Initialize Firebase
const initializeFirebase = () => initializeApp(firebaseConfig);
export default initializeFirebase;
