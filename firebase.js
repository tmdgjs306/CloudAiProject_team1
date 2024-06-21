// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {getAuth, initializeAuth, getReactNativePersistence} from 'firebase/auth';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDy1kVtd90Yxc73y4yJpLJJgrzCmmfrtBk",
  authDomain: "react-native-project-dogfinder.firebaseapp.com",
  projectId: "react-native-project-dogfinder",
  storageBucket: "react-native-project-dogfinder.appspot.com",
  messagingSenderId: "357228065811",
  appId: "1:357228065811:web:23ce8c7318d1798823bbe6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Auth 초기화
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export default app;