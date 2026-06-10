<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const login = async () => {
  await authStore.login(email.value, password.value)
  if (!authStore.error) {
    router.push('/')
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1>Prijava</h1>
      <p class="subtitle">Dobrodošli nazad!</p>

      <div v-if="authStore.error" class="error-msg">
        {{ authStore.error }}
      </div>

      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email adresa" />
        <input v-model="password" type="password" placeholder="Lozinka" />
        <button class="btn btn-primary" @click="login">Prijavi se</button>
      </div>

      <div class="divider">Nemaš račun?</div>
      <RouterLink to="/register">
        <button class="btn btn-ghost" style="width:100%">Registriraj se</button>
      </RouterLink>
    </div>
  </div>
</template>
