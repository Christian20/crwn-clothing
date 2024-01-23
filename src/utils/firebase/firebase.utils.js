import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCJskE6-rMCvkxx-X6jtts6zUOV-jLbh4s",
  authDomain: "crwn-clothing-db-916bd.firebaseapp.com",
  projectId: "crwn-clothing-db-916bd",
  storageBucket: "crwn-clothing-db-916bd.appspot.com",
  messagingSenderId: "50003683204",
  appId: "1:50003683204:web:bc1d993a44c83d5c8d1fd1"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (
    userAuth, 
    additionalInformation = {}
  ) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);

  if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
}