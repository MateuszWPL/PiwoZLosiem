<template>
  <div
    class="rounded-[12px] border border-2 solid border-secondaryGreen flex items-center flex-col p-6 max-w-[500px] w-full bg-gradient-to-t to-primaryGreen from-secondaryGreen"
  >
    <FormHeading title="Zapomniałeś hasła?" underTitle="Wprowadź swój adres email, a wyślemy Ci link do resetowania hasła" />
    
    <form class="flex flex-col gap-3 w-full mt-6 w-full max-w-[500px]" @submit.prevent="sendResetLink">
      <label class="text-sm font-medium">Email</label>
      <input
        v-model="email"
        type="email"
        class="border border-secondaryGreen/50 bg-tertiaryGreen rounded-lg p-2"
        :disabled="loading"
      />
      <button
        type="submit"
        class="bg-primaryOrange flex items-center justify-center gap-4 text-white rounded-lg py-3 mt-1 hover:bg-primaryGold duration-300 transition-all shadow-lg shadow-primaryOrange/50 hover:shadow-primaryGold/50"
        :disabled="loading"
      >
        <span v-if="!loading">Wyślij link resetujący</span>
        <span v-else class="flex items-center gap-2">
          <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
          </svg>
          Wysyłanie...
        </span>
      </button>

      <p v-if="message" :class="{'text-green-500': success, 'text-red-500': !success}">{{ message }}</p>

      <a
        href="/logowanie"
        class="text-sm text-center mt-4 text-primaryOrange hover:text-primaryGold duration-300 transition-all font-medium underline"
      >
        Powrót
      </a>
    </form>
  </div>
</template>

<script setup>
import FormHeading from '../components/FormHeading.vue'
import { ref } from "vue";
import axios from "axios";

const email = ref('')
const loading = ref(false)
const message = ref('')
const success = ref(false)

const sendResetLink = async () => {
  loading.value = true
  message.value = ''
  success.value = false

  try {
    const response = await axios.post(
      'http://localhost:5000/api/auth/request-password-reset',
      { email: email.value }
    )

    success.value = true
    message.value = response.data.message || 'Link do resetu został wysłany!'
  } catch (error) {
    success.value = false

    if (error.response && error.response.status === 404 && error.response.data.message) {
      message.value = error.response.data.message
    } 
    else if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message
    } 
    else {
      message.value = 'Wystąpił błąd. Spróbuj ponownie.'
    }
  } finally {
    loading.value = false
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
