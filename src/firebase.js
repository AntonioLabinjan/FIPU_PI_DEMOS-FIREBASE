// Učitavanje potrebnih funkcija
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyDpf7gkhVtZYc3kqEzoqUYrd0dZ-7qJ_M4",
  authDomain: "demos-sample.firebaseapp.com",
  projectId: "demos-sample",
  storageBucket: "demos-sample.firebasestorage.app",
  messagingSenderId: "1021768695491",
  appId: "1:1021768695491:web:ec5eaad9727d90c93b6c76",
  measurementId: "G-M50CPHPD1S"
}

// Firebase inicijalizacija
const app = initializeApp(firebaseConfig)

// Inicijalizacija servisa
const auth = getAuth(app)   // auth instanca
const db = getFirestore(app) // database instanca

// Izvoz servisa
export { auth, db }