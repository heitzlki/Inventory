// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from '@env';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // apiKey: 'AIzaSyCa0QtmnTR2PmUj-dd1WeQPK_H4hKsRyP0',
  // authDomain: 'cap-inventur.firebaseapp.com',
  // projectId: 'cap-inventur',
  // storageBucket: 'cap-inventur.appspot.com',
  // messagingSenderId: '448881811072',
  // appId: '1:448881811072:web:325e7535b9d634a0b05065',
  // measurementId: 'G-WSRED3VDDP',
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
