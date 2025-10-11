<template>
  <div
    class="rounded-[12px] border border-2 solid border-secondaryGreen flex items-center flex-col p-6 max-w-[500px] w-full bg-gradient-to-t to-primaryGreen from-secondaryGreen"
  >
    <FormHeading title="Uzupełnij swój profil" underTitle="Podaj nam kilka informacji o sobie" />
    <form class="flex flex-col gap-3 w-full mt-6 w-full max-w-[500px]" @submit.prevent="submit">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="text-sm font-medium">Imię</label>
          <input
            v-model="imie"
            type="string"
            class="border border-secondaryGreen/50 bg-tertiaryGreen rounded-lg p-2 w-full"
            placeholder="Imię"
          />
        </div>

        <div>
          <label class="text-sm font-medium">Nazwisko</label>
          <input
            v-model="nazwisko"
            type="string"
            class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full"
            placeholder="Nazwisko"
          />
        </div>
      </div>
      <div>
        <label class="text-sm font-medium">Wiek</label>
        <input
          v-model="wiek"
          type="string"
          class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full"
          placeholder="Wiek"
        />
      </div>
      <div>
        <label class="text-sm font-medium">Miasto</label>
        <input
          v-model="miasto"
          type="string"
          class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full"
          placeholder="Miasto"
        />
      </div>

      <div>
        <label class="text-sm font-medium" for="plec">Płeć</label>
        <select
          id="plec"
          v-model="plec"
          class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2 w-full"
        >
          <option value="" disabled selected>Wybierz płeć</option>
          <option value="kobieta">Kobieta</option>
          <option value="mezczyzna">Mężczyzna</option>
        </select>
      </div>
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>
      <button
        type="submit"
        class="bg-primaryOrange flex items-center justify-center gap-4 text-white rounded-lg py-3 mt-1 hover:bg-primaryGold duration-300 transition-all shadow-lg shadow-primaryOrange/50 hover:shadow-primaryGold/50"
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
import FormHeading from '../components/FormHeading.vue'

const router = useRouter()
const imie = ref('')
const nazwisko = ref('')
const wiek = ref(null)
const miasto = ref('')
const plec = ref('')
const errorMessage = ref('')

const submit = async () => {
  errorMessage.value = ''
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
      { headers: { Authorization: `Bearer ${token}` } },
    )

    router.push('/dashboard')
  } catch (error) {
    errorMessage.value = error.response?.data?.message || error.message
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #d35226;
  box-shadow: 0 0 0 3px rgba(211, 82, 38, 0.3);
}
select:focus {
  outline: none;
  border-color: #d35226;
  box-shadow: 0 0 0 3px rgba(211, 82, 38, 0.3);
}
</style>
