<template>
  <div
    class="rounded-[12px] border border-2 border-secondaryGreen flex items-center flex-col p-6 max-w-[500px] w-full bg-gradient-to-t to-primaryGreen from-secondaryGreen"
  >
    <FormHeading title="Uzupełnij swój profil" underTitle="Podaj nam kilka informacji o sobie" />

    <form class="flex flex-col gap-3 w-full mt-6 max-w-[500px]" @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium">Imię</label>
          <input
            v-model="imie"
            type="text"
            class="border border-secondaryGreen/50 bg-tertiaryGreen rounded-lg p-2 w-full text-gray-100 placeholder-gray-400"
            placeholder="Imię"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Nazwisko</label>
          <input
            v-model="nazwisko"
            type="text"
            class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full text-gray-100 placeholder-gray-400"
            placeholder="Nazwisko"
          />
        </div>
      </div>

      <div>
        <label class="text-sm font-medium">Wiek</label>
        <input
          v-model="wiek"
          type="number"
          min="18"
          max="120"
          class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full text-gray-100 placeholder-gray-400"
          placeholder="Wiek (min. 18 lat)"
        />
      </div>

      <div>
        <label class="text-sm font-medium">Miasto</label>
        <div class="flex gap-2 items-center">
          <input
            v-model="miasto"
            type="text"
            class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full text-gray-100 placeholder-gray-400"
            placeholder="Miasto"
          />
          <button
            type="button"
            @click="useCurrentLocationHandler"
            class="bg-primaryOrange text-white rounded-lg px-3 py-2 hover:bg-primaryGold transition-all shadow-md shadow-primaryOrange/40"
          >
            📍
          </button>
        </div>
      </div>

      <div>
        <label class="text-sm font-medium" for="plec">Płeć</label>
        <select
          id="plec"
          v-model="plec"
          class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full text-gray-100 placeholder-gray-400"
        >
          <option value="" disabled selected>Wybierz płeć</option>
          <option value="kobieta">Kobieta</option>
          <option value="mezczyzna">Mężczyzna</option>
        </select>
      </div>

      <p v-if="errorMessage" class="text-red-500 text-sm mt-1">{{ errorMessage }}</p>

      <button
        type="submit"
        class="bg-primaryOrange flex items-center justify-center gap-4 text-white rounded-lg py-3 mt-2 hover:bg-primaryGold duration-300 transition-all shadow-lg shadow-primaryOrange/50 hover:shadow-primaryGold/50"
      >
        Zapisz profil
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { io } from 'socket.io-client'
import FormHeading from '../components/FormHeading.vue'
import { useCurrentLocation } from '@/composables/useCurrentLocation'

const router = useRouter()
const socket = io('http://localhost:5000')

const imie = ref('')
const nazwisko = ref('')
const wiek = ref('')
const miasto = ref('')
const plec = ref('')
const errorMessage = ref('')
const { getLocation } = useCurrentLocation()

const validateForm = () => {
  if (!imie.value.trim()) return 'Podaj imię.'
  if (!nazwisko.value.trim()) return 'Podaj nazwisko.'
  if (!wiek.value || isNaN(wiek.value)) return 'Podaj wiek.'
  if (wiek.value < 18) return 'Musisz mieć co najmniej 18 lat.'
  if (wiek.value > 120) return 'Podaj realistyczny wiek (max 120 lat).'
  if (!miasto.value.trim()) return 'Podaj miasto.'
  if (!plec.value) return 'Wybierz płeć.'
  return null
}

const submit = async () => {
  errorMessage.value = ''
  const validationError = validateForm()
  if (validationError) {
    errorMessage.value = validationError
    return
  }

  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error('Brak tokenu')

    await axios.post(
      'http://localhost:5000/api/auth/complete-profile',
      {
        imie: imie.value,
        nazwisko: nazwisko.value,
        wiek: wiek.value,
        miasto: miasto.value,
        plec: plec.value,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    )

    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message
  }
}

const useCurrentLocationHandler = async () => {
  try {
    const location = await getLocation()
    miasto.value = location
  } catch (err) {
    console.warn(err)
  }
}
</script>

<style scoped>
input:focus,
select:focus {
  outline: none;
  border-color: #d35226;
  box-shadow: 0 0 0 3px rgba(211, 82, 38, 0.3);
}

input,
select {
  color: #f0f0f0;
}

::placeholder {
  color: #a1a1a1;
}
</style>