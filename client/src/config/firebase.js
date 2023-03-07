// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';

import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCJbiSunLdQtRLr4UMhU2VSnNR1BMIb9Hg',
  authDomain: 'react-training-project-1.firebaseapp.com',
  projectId: 'react-training-project-1',
  storageBucket: 'react-training-project-1.appspot.com',
  messagingSenderId: '102786692673',
  appId: '1:102786692673:web:99c8bbde9c3e5eafe038c0',
  measurementId: 'G-CC6C985QSQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
