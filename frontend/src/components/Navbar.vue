<template>
  <header
    class="p-6 h-dvh flex flex-col xl:min-w-[260px] xl:max-w-[260px] w-full bg-black bg-gradient-to-b from-green-900/30 to-green-900/80 xl:h-screen duration-300 transition-all fixed top-0 left-0 z-50 xl:relative"
  >
    <div class="flex justify-between">
      <div class="xl:w-full xl:flex xl:justify-end">
        <a
          href="#"
          class="border group block border-secondaryGold solid rounded-xl p-3 relative w-fit hover:bg-secondaryGold/20 transition-all duration-300"
        >
          <div
            class="absolute bg-red-900 -top-2 -right-2 w-4 h-4 rounded-full items-center justify-center flex group-hover:scale-110 transition-all duration-300"
          >
            <p class="text-[12px] leading-none">3</p>
          </div>
          <svg
            class="min-w-4 max-w-4 w-4 min-h-4 max-h-4 h-4 group-hover:scale-110 transition-all duration-300"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M4 5.3335C4 4.27263 4.42143 3.25521 5.17157 2.50507C5.92172 1.75492 6.93913 1.3335 8 1.3335C9.06087 1.3335 10.0783 1.75492 10.8284 2.50507C11.5786 3.25521 12 4.27263 12 5.3335C12 10.0002 14 11.3335 14 11.3335H2C2 11.3335 4 10.0002 4 5.3335Z"
              stroke="#A89E8A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6.86719 14C6.97878 14.203 7.14282 14.3722 7.34218 14.4901C7.54154 14.608 7.76891 14.6702 8.00052 14.6702C8.23213 14.6702 8.4595 14.608 8.65886 14.4901C8.85822 14.3722 9.02227 14.203 9.13385 14"
              stroke="#A89E8A"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>
      </div>
      <div class="flex justify-start xl:hidden">
        <button
          @click="menuOpen = !menuOpen"
          class="p-2 border rounded-md border-secondaryGold group hover:bg-secondaryGold/20 transition-all duration-300"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              v-if="!menuOpen"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
            <path
              v-else
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
    <!-- Menu -->

    <div
      :class="[
        'flex flex-col transition-all duration-500',
        menuOpen
          ? 'opacity-100 mt-4 h-full max-h-screen'
          : 'max-h-0 h-0 opacity-0 overflow-hidden items-between justify-between',
        'xl:max-h-full xl:h-full xl:opacity-100',
      ]"
    >
      <ul class="flex flex-col xl:mt-4">
        <RouterLink to="/dashboard" class="flex items-center gap-4 py-3 group">
          <svg
            class="group-hover:scale-110 transition-all duration-300 group-hover:stroke-primaryOrange"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M3 9.99997C2.99993 9.70904 3.06333 9.42159 3.18579 9.15768C3.30824 8.89378 3.4868 8.65976 3.709 8.47197L10.709 2.47297C11.07 2.16788 11.5274 2.00049 12 2.00049C12.4726 2.00049 12.93 2.16788 13.291 2.47297L20.291 8.47197C20.5132 8.65976 20.6918 8.89378 20.8142 9.15768C20.9367 9.42159 21.0001 9.70904 21 9.99997V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0393 3 19.5304 3 19V9.99997Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            class="text-secondaryGold group-hover:translate-x-1 transition-all duration-300 group-hover:text-primaryOrange"
          >
            Dashboard
          </p>
        </RouterLink>
        <RouterLink to="/mapa" class="flex items-center gap-4 py-3 group">
          <svg
            class="group-hover:scale-110 transition-all duration-300 group-hover:stroke-primaryOrange"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M14.106 5.55277C14.3836 5.69149 14.6897 5.7637 15 5.7637C15.3103 5.7637 15.6164 5.69149 15.894 5.55277L19.553 3.72277C19.7056 3.64653 19.8751 3.61058 20.0455 3.61834C20.2159 3.6261 20.3814 3.67731 20.5265 3.7671C20.6715 3.8569 20.7911 3.98229 20.874 4.13135C20.9569 4.28042 21.0003 4.44821 21 4.61877V17.3828C20.9999 17.5684 20.9481 17.7504 20.8505 17.9083C20.7528 18.0662 20.6131 18.1938 20.447 18.2768L15.894 20.5538C15.6164 20.6925 15.3103 20.7647 15 20.7647C14.6897 20.7647 14.3836 20.6925 14.106 20.5538L9.894 18.4478C9.6164 18.3091 9.31033 18.2368 9 18.2368C8.68967 18.2368 8.3836 18.3091 8.106 18.4478L4.447 20.2778C4.29436 20.3541 4.12473 20.39 3.95426 20.3822C3.78379 20.3744 3.61816 20.3231 3.47312 20.2332C3.32808 20.1433 3.20846 20.0177 3.12565 19.8685C3.04284 19.7193 2.99958 19.5514 3 19.3808V6.61777C3.0001 6.43211 3.05189 6.25014 3.14956 6.09225C3.24722 5.93435 3.38692 5.80676 3.553 5.72377L8.106 3.44677C8.3836 3.30805 8.68967 3.23584 9 3.23584C9.31033 3.23584 9.6164 3.30805 9.894 3.44677L14.106 5.55277Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M15 5.76416V20.7642"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M9 3.23584V18.2358"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            class="text-secondaryGold group-hover:translate-x-1 transition-all duration-300 group-hover:text-primaryOrange"
          >
            Mapa
          </p>
        </RouterLink>
        <RouterLink to="/chat" class="flex items-center gap-4 py-3 group">
          <svg
            class="group-hover:scale-110 transition-all duration-300 group-hover:stroke-primaryOrange"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M7.9 20C9.80858 20.9791 12.0041 21.2443 14.0909 20.7478C16.1777 20.2514 18.0186 19.0259 19.2818 17.2922C20.545 15.5586 21.1474 13.4308 20.9806 11.2922C20.8137 9.15366 19.8886 7.14502 18.3718 5.62824C16.855 4.11146 14.8464 3.1863 12.7078 3.01946C10.5693 2.85263 8.44147 3.45509 6.70782 4.71829C4.97417 5.98149 3.74869 7.82236 3.25222 9.90916C2.75575 11.996 3.02094 14.1915 4 16.1L2 22L7.9 20Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            class="text-secondaryGold group-hover:translate-x-1 transition-all duration-300 group-hover:text-primaryOrange"
          >
            Chat
          </p>
        </RouterLink>
        <RouterLink to="/rankingi" class="flex items-center gap-4 py-3 group">
          <svg
            class="group-hover:scale-110 transition-all duration-300 group-hover:stroke-primaryOrange"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M6 9H4.5C3.83696 9 3.20107 8.73661 2.73223 8.26777C2.26339 7.79893 2 7.16304 2 6.5C2 5.83696 2.26339 5.20107 2.73223 4.73223C3.20107 4.26339 3.83696 4 4.5 4H6"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M18 9H19.5C20.163 9 20.7989 8.73661 21.2678 8.26777C21.7366 7.79893 22 7.16304 22 6.5C22 5.83696 21.7366 5.20107 21.2678 4.73223C20.7989 4.26339 20.163 4 19.5 4H18"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M4 22H20"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M10 14.6602V17.0002C10 17.5502 9.53 17.9802 9.03 18.2102C7.85 18.7502 7 20.2402 7 22.0002"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M14 14.6602V17.0002C14 17.5502 14.47 17.9802 14.97 18.2102C16.15 18.7502 17 20.2402 17 22.0002"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M18 2H6V9C6 10.5913 6.63214 12.1174 7.75736 13.2426C8.88258 14.3679 10.4087 15 12 15C13.5913 15 15.1174 14.3679 16.2426 13.2426C17.3679 12.1174 18 10.5913 18 9V2Z"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            class="text-secondaryGold group-hover:translate-x-1 transition-all duration-300 group-hover:text-primaryOrange"
          >
            Rankingi
          </p>
        </RouterLink>
        <RouterLink to="/moje-piwa" class="flex items-center gap-4 py-3 group">
          <svg
            class="group-hover:scale-110 transition-all duration-300 group-hover:stroke-primaryOrange"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="21"
            viewBox="0 0 24 21"
            fill="none"
          >
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M17 9.625H18C18.7956 9.625 19.5587 9.90156 20.1213 10.3938C20.6839 10.8861 21 11.5538 21 12.25C21 12.9462 20.6839 13.6139 20.1213 14.1062C19.5587 14.5984 18.7956 14.875 18 14.875H17"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M9 10.5V15.75"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M13 10.5V15.75"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M14 6.5625C13 6.5625 12.56 7 11 7C9.44 7 9 6.5625 8 6.5625C7 6.5625 6.28 7 5.5 7C4.83696 7 4.20107 6.76953 3.73223 6.3593C3.26339 5.94906 3 5.39266 3 4.8125C3 4.23234 3.26339 3.67594 3.73223 3.2657C4.20107 2.85547 4.83696 2.625 5.5 2.625C6.28 2.625 7.07 3.0625 8 3.0625C8.93 3.0625 9.44 1.75 11 1.75C12.56 1.75 13 3.0625 14 3.0625C15 3.0625 15.72 2.625 16.5 2.625C17.163 2.625 17.7989 2.85547 18.2678 3.2657C18.7366 3.67594 19 4.23234 19 4.8125C19 5.39266 18.7366 5.94906 18.2678 6.3593C17.7989 6.76953 17.163 7 16.5 7C15.72 7 15 6.5625 14 6.5625Z"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M5 7V17.5C5 17.9641 5.21071 18.4092 5.58579 18.7374C5.96086 19.0656 6.46957 19.25 7 19.25H15C15.5304 19.25 16.0391 19.0656 16.4142 18.7374C16.7893 18.4092 17 17.9641 17 17.5V7"
              stroke="#A89E8A"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            class="text-secondaryGold group-hover:translate-x-1 transition-all duration-300 group-hover:text-primaryOrange"
          >
            Moje piwa
          </p>
        </RouterLink>
        <RouterLink to="/profil" class="flex items-center gap-4 py-3 group">
          <svg
            class="group-hover:scale-110 transition-all duration-300 group-hover:stroke-primaryOrange"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              class="group-hover:stroke-primaryOrange duration-300 transistion-all"
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p
            class="text-secondaryGold group-hover:translate-x-1 transition-all duration-300 group-hover:text-primaryOrange"
          >
            Mój profil
          </p>
        </RouterLink>
      </ul>
      <a
        @click.prevent="logout"
        class="h-fit flex cursor-pointer items-center gap-4 py-3 group mt-auto"
      >
        <svg
          class="group-hover:scale-110 transition-all duration-300 group-hover:stroke-primaryOrange"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            class="group-hover:stroke-primaryOrange duration-300 transistion-all"
            d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
            stroke="#A89E8A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="group-hover:stroke-primaryOrange duration-300 transistion-all"
            d="M16 17L21 12L16 7"
            stroke="#A89E8A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            class="group-hover:stroke-primaryOrange duration-300 transistion-all"
            d="M21 12H9"
            stroke="#A89E8A"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
        <p
          class="text-secondaryGold leading-none group-hover:translate-x-1 transition-all duration-300 group-hover:text-primaryOrange"
        >
          Wyloguj się
        </p>
      </a>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

const router = useRouter()
const menuOpen = ref(false)

const logout = () => {
  localStorage.removeItem('token')
  router.push('/logowanie')
}
</script>

<style scoped>
.router-link-exact-active svg path {
  stroke: #d35226;
}
.router-link-exact-active p {
  color: #d35226;
  transform: translateX(4px);
}
</style>
