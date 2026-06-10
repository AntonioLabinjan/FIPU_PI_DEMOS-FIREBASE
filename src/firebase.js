// Učitavanje potrebnih funkcija
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

// Firebase inicijalizacija
const app = initializeApp(firebaseConfig)

// Inicijalizacija servisa
const auth = getAuth(app)   // auth instanca
const db = getFirestore(app) // database instanca

// Izvoz servisa
export { auth, db }
