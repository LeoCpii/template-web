import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import {
    getAuth,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    connectAuthEmulator,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
} from 'firebase/auth';

import DB from '@template-web/services/db';
import AuthServices from '@template-web/services/auth';
import UserServices from '@template-web/services/user';

// VARIABLES
export const url = {
    sso: import.meta.env.VITE_SSO_URL,
    manager: import.meta.env.VITE_MANAGER_URL,
};

export const release = import.meta.env.VITE_RELEASE;

export const isLocal = import.meta.env.VITE_ENV === 'local';

// FIREBASE
const app = initializeApp({
    appId: import.meta.env.VITE_ID,
    apiKey: import.meta.env.VITE_API_KEY,
    projectId: import.meta.env.VITE_PROJECT_ID,
    authDomain: import.meta.env.VITE_AUTH_DOMAIN,
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
    measurementId: import.meta.env.VITE_MEASUREMENT_ID,
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
}, 'sso');

// FIREBASE SERVICES
const firebaseAuth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const firestore = getFirestore(app);

export const authServices = new AuthServices({
    signOut: () => signOut(firebaseAuth),
    googleAuth: () => signInWithPopup(firebaseAuth, googleProvider),
    signInWithPassword: (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password),
    createUserWithEmailAndPassword: (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password),
});

export const db = new DB(firestore);

if (isLocal) {
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectAuthEmulator(firebaseAuth, 'http://localhost:9099');
}

// ENTITY SERVICES
export const userServices = new UserServices(db, url.sso);