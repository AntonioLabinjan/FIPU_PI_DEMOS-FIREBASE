// src/stores/authStore.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const error = ref(null)

  // Praćenje stanja autentifikacije - reagira na svaku promjenu
  onAuthStateChanged(auth, (currentUser) => {
    user.value = currentUser
  })

  // Registracija novog korisnika
  const register = async (email, password) => {
    error.value = null
    try {
      await createUserWithEmailAndPassword(auth, email, password)
    } catch (e) {
      error.value = e.message
    }
  }

  // Prijava postojećeg korisnika
  const login = async (email, password) => {
    error.value = null
    try {
      await signInWithEmailAndPassword(auth, email, password)
    } catch (e) {
      error.value = e.message
    }
  }

  // Odjava korisnika
  const logout = async () => {
    await signOut(auth)
  }

  return { user, error, register, login, logout }
})



// frontend -> pinia -> firebase