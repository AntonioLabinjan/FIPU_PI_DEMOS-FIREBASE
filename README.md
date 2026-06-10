#  Firebase + Vue 3 Demo

Demonstracijska aplikacija: Vue 3 + Vue Router + Pinia + Firebase Auth + Firestore

## Struktura projekta

```
src/
├── firebase.js          ← Firebase konfiguracija (auth + db instance)
├── main.js              ← Entry point (Vue app + Pinia + Router)
├── App.vue              ← Root komponenta s navbarom
├── assets/
│   └── main.css         ← Globalni stilovi
├── router/
│   └── index.js         ← Vue Router + navigation guard
├── stores/
│   └── authStore.js     ← Pinia store za autentifikaciju
└── views/
    ├── LoginView.vue    ← Stranica za prijavu
    ├── RegisterView.vue ← Stranica za registraciju
    └── HomeView.vue     ← Zaštićena stranica s Firestore CRUD
```

## Postavljanje

### 1. Instaliraj pakete
```sh
npm install
```

### 2. Postavi Firebase projekt
1. Idi na https://console.firebase.google.com
2. Kreiraj novi projekt (bez Google Analytics)
3. Dodaj Web app u projekt
4. Kopiraj `firebaseConfig` podatke

### 3. Uključi Firebase servise u konzoli
- **Authentication** → Sign-in method → Email/Password → Enable
- **Firestore** → Create database → Start in test mode

### 4. Postavi Firestore pravila (za produkciju)
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /notes/{noteId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.uid;
      allow create: if request.auth != null;
    }
  }
}
```

### 5. Zamijeni konfiguraciju
Otvori `src/firebase.js` i zamijeni placeholder vrijednosti s tvojim podacima:
```js
const firebaseConfig = {
  apiKey: "TVOJ_API_KEY",
  authDomain: "TVOJ_PROJECT.firebaseapp.com",
  projectId: "TVOJ_PROJECT_ID",
  ...
}
```

### 6. Pokretanje
```sh
npm run dev
```

## Što aplikacija demonstrira

| Feature | Gdje |
|---|---|
| `createUserWithEmailAndPassword` | RegisterView + authStore |
| `signInWithEmailAndPassword` | LoginView + authStore |
| `signOut` | App.vue + authStore |
| `onAuthStateChanged` | authStore (reaktivno praćenje) |
| Navigation guard (zaštita ruta) | router/index.js |
| Firestore `addDoc` | HomeView - dodavanje bilješke |
| Firestore `getDocs` + `query` | HomeView - dohvat bilješki korisnika |
| Firestore `deleteDoc` | HomeView - brisanje bilješke |
| `serverTimestamp` | HomeView - timestamp pri kreiranju |
