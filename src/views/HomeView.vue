<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { db } from '@/firebase'
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'

const authStore = useAuthStore()

const notes = ref([])
const newNote = ref('')
const loading = ref(false)
const successMsg = ref('')

// Dohvati bilješke trenutnog korisnika iz Firestorea
const fetchNotes = async () => {
  loading.value = true
  try {
    const q = query(
      collection(db, 'notes'),
      where('uid', '==', authStore.user.uid),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    notes.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (e) {
    console.error('Greška pri dohvatu bilješki:', e)
  } finally {
    loading.value = false
  }
}

// Dodaj novu bilješku u Firestore
const addNote = async () => {
  if (!newNote.value.trim()) return
  try {
    await addDoc(collection(db, 'notes'), {
      text: newNote.value.trim(),
      uid: authStore.user.uid,
      email: authStore.user.email,
      createdAt: serverTimestamp()
    })
    newNote.value = ''
    successMsg.value = 'Bilješka dodana!'
    setTimeout(() => successMsg.value = '', 2000)
    await fetchNotes()
  } catch (e) {
    console.error('Greška pri dodavanju:', e)
  }
}

// Obriši bilješku iz Firestorea
const deleteNote = async (id) => {
  await deleteDoc(doc(db, 'notes', id))
  notes.value = notes.value.filter(n => n.id !== id)
}

onMounted(fetchNotes)
</script>

<template>
  <div class="page">
    <!-- Korisničke informacije -->
    <div class="card" style="margin-bottom: 1rem;">
      <h1>Početna stranica</h1>
      <p class="subtitle">
        Prijavljen kao: <strong>{{ authStore.user?.email }}</strong>
      </p>
      <p style="font-size:0.8rem; color:#94a3b8;">UID: {{ authStore.user?.uid }}</p>
    </div>

    <!-- Firestore - bilješke -->
    <div class="card">
      <h1>Moje bilješke</h1>
      <p class="subtitle">Podaci se čuvaju u Firestoreu</p>

      <div v-if="successMsg" class="success-msg">{{ successMsg }}</div>

      <!-- Forma za dodavanje -->
      <div class="form-group">
        <textarea v-model="newNote" placeholder="Napiši bilješku..." rows="3" />
        <button class="btn btn-primary" @click="addNote">
          + Dodaj bilješku
        </button>
      </div>

      <!-- Lista bilješki -->
      <div v-if="loading" style="text-align:center; color:#94a3b8; margin-top:1rem;">
        Učitavanje...
      </div>

      <div v-else-if="notes.length === 0" style="text-align:center; color:#94a3b8; margin-top:1.5rem; font-size:0.9rem;">
        Nema bilješki. Dodaj prvu! 👆
      </div>

      <div v-else class="notes-list">
        <div v-for="note in notes" :key="note.id" class="note-item">
          <div>
            <p>{{ note.text }}</p>
            <p class="note-meta">
              {{ note.createdAt?.toDate?.().toLocaleString('hr-HR') ?? 'upravo sada' }}
            </p>
          </div>
          <button @click="deleteNote(note.id)" title="Obriši">🗑️</button>
        </div>
      </div>
    </div>
  </div>
</template>
