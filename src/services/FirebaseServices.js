import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBDGfZv_dOCpVsNCrANOjgTxjI8cgeDY0I",
    authDomain: "react-coderhouse-dbd34.firebaseapp.com",
    projectId: "react-coderhouse-dbd34",
    storageBucket: "react-coderhouse-dbd34.firebasestorage.app",
    messagingSenderId: "1074928592627",
    appId: "1:1074928592627:web:14bd76a10c26f2da457986"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);