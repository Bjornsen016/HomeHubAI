import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
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

export { db, auth };
