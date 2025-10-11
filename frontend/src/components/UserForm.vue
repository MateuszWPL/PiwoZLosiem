<template>
  <form @submit.prevent="stworzUsera" class="flex flex-col gap-3 w-64 mx-auto mt-10">
    <input v-model="imie" placeholder="Imię" class="border bg-primaryGreen p-2 rounded" />
    <input v-model="nazwisko" placeholder="Nazwisko" class="border bg-primaryGreen p-2 rounded" />
    <input
      v-model="email"
      type="email"
      placeholder="Email"
      class="border bg-primaryGreen p-2 rounded"
    />
    <button type="submit" class="bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
      Zarejestruj
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import api from '../api/api'

const imie = ref('')
const email = ref('')
const nazwisko = ref('')

const stworzUsera = async () => {
  try {
    const res = await api.post('/users', {
      imie: imie.value,
      nazwisko: nazwisko.value,
      email: email.value,
    })
    console.log('Użytkownik utworzony:', res.data)
  } catch (err) {
    console.error('Błąd:', err.response?.data || err.message)
  }
}
</script>
