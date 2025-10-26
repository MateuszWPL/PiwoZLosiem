<template>
  <div
    class="rounded-[12px] border border-2 solid border-secondaryGreen flex items-center flex-col p-6 max-w-[500px] w-full bg-gradient-to-t to-primaryGreen from-secondaryGreen"
  >
    <FormHeading
      title="Ustaw nowe hasło"
      underTitle="Wprowadź nowe hasło dla swojego konta"
    />

    <form
      class="flex flex-col gap-3 w-full mt-6 w-full max-w-[500px]"
      @submit.prevent="resetPassword"
    >
      <label class="text-sm font-medium">Nowe hasło</label>
      <input
        v-model="password"
        type="password"
        placeholder="Wpisz nowe hasło"
        class="border border-secondaryGreen/50 bg-tertiaryGreen rounded-lg p-2"
        required
      />

      <label class="text-sm font-medium">Potwierdź hasło</label>
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Powtórz hasło"
        class="border border-secondaryGreen/50 bg-tertiaryGreen rounded-lg p-2"
        required
      />

      <button
        type="submit"
        :disabled="loading"
        class="bg-primaryOrange flex items-center justify-center gap-4 text-white rounded-lg py-3 mt-1 hover:bg-primaryGold duration-300 transition-all shadow-lg shadow-primaryOrange/50 hover:shadow-primaryGold/50"
      >
        Zmień hasło
      </button>

      <p
        v-if="message"
        :class="{'text-green-600': success, 'text-red-600': !success}"
        class="mt-2 text-center"
      >
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import FormHeading from "../components/FormHeading.vue";

const route = useRoute();
const router = useRouter();

const token = ref("");
const password = ref("");
const confirmPassword = ref("");
const loading = ref(false);
const message = ref("");
const success = ref(false);

onMounted(() => {
  token.value = route.query.token || "";
  if (!token.value) {
    message.value = "Brak tokenu w URL!";
    success.value = false;
  }
});

const resetPassword = async () => {
  if (password.value !== confirmPassword.value) {
    message.value = "Hasła nie są identyczne!";
    success.value = false;
    return;
  }

  loading.value = true;
  message.value = "";
  success.value = false;

  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/reset-password",
      {
        token: token.value,
        newPassword: password.value,
      }
    );

    success.value = true;
    message.value = response.data.message || "Hasło zostało zaktualizowane!";
    
    setTimeout(() => {
      router.push("/logowanie");
    }, 5000);

  } catch (error) {
    success.value = false;
    if (error.response && error.response.data && error.response.data.message) {
      message.value = error.response.data.message;
    } else {
      message.value = "Wystąpił błąd. Spróbuj ponownie.";
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #d35226;
  box-shadow: 0 0 0 3px rgba(211, 82, 38, 0.3);
}
</style>
