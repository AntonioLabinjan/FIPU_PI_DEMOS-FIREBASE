<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const register = async () => {
  await authStore.register(email.value, password.value)
  if (!authStore.error) {
    router.push('/')
  }
}
</script>

<template>
  <div class="page">
    <div class="card">
      <h1>Registracija</h1>
      <p class="subtitle">Kreiraj novi račun</p>

      <div v-if="authStore.error" class="error-msg">
        {{ authStore.error }}
      </div>

      <div class="form-group">
        <input v-model="email" type="email" placeholder="Email adresa" />
        <input v-model="password" type="password" placeholder="Lozinka (min. 6 znakova)" />
        <button class="btn btn-primary" @click="register">Registriraj se</button>
      </div>

      <div class="divider">Već imaš račun?</div>
      <RouterLink to="/login">
        <button class="btn btn-ghost" style="width:100%">Prijavi se</button>
      </RouterLink>
    </div>
  </div>
</template>
