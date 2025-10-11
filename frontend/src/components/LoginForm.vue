<template>
  <div
    class="rounded-[12px] border border-2 solid border-secondaryGreen flex items-center flex-col p-6 max-w-[500px] w-full bg-gradient-to-t to-primaryGreen from-secondaryGreen"
  >
    <FormHeading title="Witaj z powrotem!" underTitle="Zaloguj się do swojego konta" />
    <form class="flex flex-col gap-3 w-full mt-6 w-full max-w-[500px]" @submit.prevent="submit">
      <label class="text-sm font-medium">Email</label>
      <input
        v-model="email"
        type="email"
        class="border border-secondaryGreen/50 bg-tertiaryGreen rounded-lg p-2"
      />
      <label class="text-sm font-medium">Hasło</label>
      <input
        v-model="password"
        type="password"
        class="border border-secondaryGreen bg-tertiaryGreen rounded-lg p-2"
      />
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

      <button
        type="submit"
        class="bg-primaryOrange flex items-center justify-center gap-4 text-white rounded-lg py-3 mt-1 hover:bg-primaryGold duration-300 transition-all shadow-lg shadow-primaryOrange/50 hover:shadow-primaryGold/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="25"
          viewBox="0 0 24 25"
          fill="none"
        >
          <path
            d="M17 11.7795H18C18.7956 11.7795 19.5587 12.0956 20.1213 12.6582C20.6839 13.2208 21 13.9839 21 14.7795C21 15.5752 20.6839 16.3383 20.1213 16.9009C19.5587 17.4635 18.7956 17.7795 18 17.7795H17"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M9 12.7795V18.7795"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M13 12.7795V18.7795"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M14 8.27954C13 8.27954 12.56 8.77954 11 8.77954C9.44 8.77954 9 8.27954 8 8.27954C7 8.27954 6.28 8.77954 5.5 8.77954C4.83696 8.77954 4.20107 8.51615 3.73223 8.04731C3.26339 7.57847 3 6.94258 3 6.27954C3 5.6165 3.26339 4.98062 3.73223 4.51177C4.20107 4.04293 4.83696 3.77954 5.5 3.77954C6.28 3.77954 7.07 4.27954 8 4.27954C8.93 4.27954 9.44 2.77954 11 2.77954C12.56 2.77954 13 4.27954 14 4.27954C15 4.27954 15.72 3.77954 16.5 3.77954C17.163 3.77954 17.7989 4.04293 18.2678 4.51177C18.7366 4.98062 19 5.6165 19 6.27954C19 6.94258 18.7366 7.57847 18.2678 8.04731C17.7989 8.51615 17.163 8.77954 16.5 8.77954C15.72 8.77954 15 8.27954 14 8.27954Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M5 8.77954V20.7795C5 21.31 5.21071 21.8187 5.58579 22.1938C5.96086 22.5688 6.46957 22.7795 7 22.7795H15C15.5304 22.7795 16.0391 22.5688 16.4142 22.1938C16.7893 21.8187 17 21.31 17 20.7795V8.77954"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Zaloguj się
      </button>

      <p class="text-sm text-center mt-4">
        Nie masz konta?
        <a
          href="/rejestracja"
          class="text-primaryOrange hover:text-primaryGold duration-300 transition-all font-medium underline"
          >Zarejestruj się</a
        >
      </p>
      <p class="text-sm text-center">
        Zapomniałeś hasła?
        <a
          href="/resetowanie-hasla"
          class="text-primaryOrange hover:text-primaryGold duration-300 transition-all font-medium underline"
          >Zresetuj hasło</a
        >
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import FormHeading from '../components/FormHeading.vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const submit = async () => {
  errorMessage.value = ''
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value,
    })

    localStorage.setItem('token', res.data.token)

    if (!res.data.isProfileComplete) {
      router.push('/rejestracja-uzupelnienie')
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    errorMessage.value = error.response?.data?.message || 'Błąd logowania'
  }
}
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #d35226;
  box-shadow: 0 0 0 3px rgba(211, 82, 38, 0.3);
}
</style>
