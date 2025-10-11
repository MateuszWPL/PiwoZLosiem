<template>
  <div
    class="rounded-[12px] border border-2 solid border-secondaryGreen flex items-center flex-col p-6 max-w-[500px] w-full bg-gradient-to-t to-primaryGreen from-secondaryGreen"
  >
    <FormHeading
      title="Zapomniałeś hasła?
"
      underTitle="Wprowadź swój adres email, a wyślemy Ci link do resetowania hasła

"
    />
    <form
      class="flex flex-col gap-3 w-full mt-6 w-full max-w-[500px]"
      @submit.prevent="$emit('submit')"
    >
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

      <button
        type="submit"
        class="bg-primaryOrange flex items-center justify-center gap-4 text-white rounded-lg py-3 mt-1 hover:bg-primaryGold duration-300 transition-all shadow-lg shadow-primaryOrange/50 hover:shadow-primaryGold/50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20 4H4C2.89543 4 2 4.89543 2 6V18C2 19.1046 2.89543 20 4 20H20C21.1046 20 22 19.1046 22 18V6C22 4.89543 21.1046 4 20 4Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M22 7L13.03 12.7C12.7213 12.8934 12.3643 12.996 12 12.996C11.6357 12.996 11.2787 12.8934 10.97 12.7L2 7"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        Wyślij link resetujący
      </button>

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
</script>

<style scoped>
input:focus {
  outline: none;
  border-color: #d35226;
  box-shadow: 0 0 0 3px rgba(211, 82, 38, 0.3);
}
</style>
