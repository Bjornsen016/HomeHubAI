import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  User,
} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCjYgwnoJPVVC28uHm6ZUMRykTHzb8oUys',
  authDomain: 'homehubai.firebaseapp.com',
  projectId: 'homehubai',
  storageBucket: 'homehubai.appspot.com',
  messagingSenderId: '612121578085',
  appId: '1:612121578085:web:8494c28076eeca9086548c',
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

async function signInWithGoogle(): Promise<User | null> {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error('Error signing in with Google:', error);
    return null;
  }
}

async function signOutUser(): Promise<void> {
  try {
    await signOut(auth);
  } catch (error) {
    console.error('Error signing out:', error);
  }
}

export { db, auth, signInWithGoogle, signOutUser };
