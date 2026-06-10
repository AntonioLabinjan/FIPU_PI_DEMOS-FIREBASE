<script setup>
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const logout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav>
    <span class="logo"> Firebase Demo</span>
    <div class="nav-links">
      <template v-if="authStore.user">
        <span class="user-email">{{ authStore.user.email }}</span>
        <RouterLink to="/">Početna</RouterLink>
        <button class="btn btn-ghost" style="font-size:0.85rem; padding:0.3rem 0.8rem;" @click="logout">
          Odjava
        </button>
      </template>
      <template v-else>
        <RouterLink to="/login">Prijava</RouterLink>
        <RouterLink to="/register">Registracija</RouterLink>
      </template>
    </div>
  </nav>

  <RouterView />
</template>