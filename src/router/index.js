// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import { auth } from '@/firebase'

import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import HomeView from '@/views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: true } // samo za prijavljene korisnike
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Navigation guard - zaštita ruta
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth
  const currentUser = auth.currentUser

  if (requiresAuth && !currentUser) {
    // Ruta zahtjeva prijavu, ali korisnik nije prijavljen
    next('/login')
  } else if ((to.name === 'login' || to.name === 'register') && currentUser) {
    // Korisnik je već prijavljen, ne treba mu login/register stranica
    next('/')
  } else {
    next()
  }
})

export default router
