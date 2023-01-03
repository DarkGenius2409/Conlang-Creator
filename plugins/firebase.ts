// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBHA8h7jHepIEqMNuHOAEW5dOO6jID3mtQ',
  authDomain: 'conlang-creator-9bd5e.firebaseapp.com',
  projectId: 'conlang-creator-9bd5e',
  storageBucket: 'conlang-creator-9bd5e.appspot.com',
  messagingSenderId: '975571533700',
  appId: '1:975571533700:web:b39dec13c9cc47291127d1',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
