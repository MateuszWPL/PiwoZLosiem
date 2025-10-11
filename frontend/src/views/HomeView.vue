<template>
  <header
    class="p-6 h-dvh flex flex-col lg:min-w-[260px] lg:max-w-[260px] w-full bg-gradient-to-b from-green-900/20 to-green-900/80"
  >
    <div class="flex justify-end lg:hidden">
      <button @click="menuOpen = !menuOpen" class="p-2 border rounded-md border-secondaryGold">
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

    <!-- Menu -->
    <div :class="[menuOpen ? 'flex' : 'hidden']">
      <div class="border border-secondaryGold solid rounded-xl p-3 relative">
        <div
          class="absolute bg-red-900 -top-2 -right-2 w-4 h-4 rounded-full items-center justify-center flex"
        >
          <p class="text-[12px]">3</p>
        </div>
        <svg
          class="min-w-4 max-w-4 w-4 min-h-4 max-h-4 h4"
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
      </div>
    </div>
    <div
      :class="[
        'flex flex-col gap-4 mt-4 transition-all duration-300  h-dvh',
        menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden',
        'lg:max-h-full lg:opacity-100',
      ]"
    >
      <ul class="flex flex-col gap-4">
        <li class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M15 21V13C15 12.7348 14.8946 12.4804 14.7071 12.2929C14.5196 12.1054 14.2652 12 14 12H10C9.73478 12 9.48043 12.1054 9.29289 12.2929C9.10536 12.4804 9 12.7348 9 13V21"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M3 9.99997C2.99993 9.70904 3.06333 9.42159 3.18579 9.15768C3.30824 8.89378 3.4868 8.65976 3.709 8.47197L10.709 2.47297C11.07 2.16788 11.5274 2.00049 12 2.00049C12.4726 2.00049 12.93 2.16788 13.291 2.47297L20.291 8.47197C20.5132 8.65976 20.6918 8.89378 20.8142 9.15768C20.9367 9.42159 21.0001 9.70904 21 9.99997V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V9.99997Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-secondaryGold">Dashboard</p>
        </li>
        <li class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M14.106 5.55277C14.3836 5.69149 14.6897 5.7637 15 5.7637C15.3103 5.7637 15.6164 5.69149 15.894 5.55277L19.553 3.72277C19.7056 3.64653 19.8751 3.61058 20.0455 3.61834C20.2159 3.6261 20.3814 3.67731 20.5265 3.7671C20.6715 3.8569 20.7911 3.98229 20.874 4.13135C20.9569 4.28042 21.0003 4.44821 21 4.61877V17.3828C20.9999 17.5684 20.9481 17.7504 20.8505 17.9083C20.7528 18.0662 20.6131 18.1938 20.447 18.2768L15.894 20.5538C15.6164 20.6925 15.3103 20.7647 15 20.7647C14.6897 20.7647 14.3836 20.6925 14.106 20.5538L9.894 18.4478C9.6164 18.3091 9.31033 18.2368 9 18.2368C8.68967 18.2368 8.3836 18.3091 8.106 18.4478L4.447 20.2778C4.29436 20.3541 4.12473 20.39 3.95426 20.3822C3.78379 20.3744 3.61816 20.3231 3.47312 20.2332C3.32808 20.1433 3.20846 20.0177 3.12565 19.8685C3.04284 19.7193 2.99958 19.5514 3 19.3808V6.61777C3.0001 6.43211 3.05189 6.25014 3.14956 6.09225C3.24722 5.93435 3.38692 5.80676 3.553 5.72377L8.106 3.44677C8.3836 3.30805 8.68967 3.23584 9 3.23584C9.31033 3.23584 9.6164 3.30805 9.894 3.44677L14.106 5.55277Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M15 5.76416V20.7642"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M9 3.23584V18.2358"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-secondaryGold">Mapa</p>
        </li>
        <li class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.9 20C9.80858 20.9791 12.0041 21.2443 14.0909 20.7478C16.1777 20.2514 18.0186 19.0259 19.2818 17.2922C20.545 15.5586 21.1474 13.4308 20.9806 11.2922C20.8137 9.15366 19.8886 7.14502 18.3718 5.62824C16.855 4.11146 14.8464 3.1863 12.7078 3.01946C10.5693 2.85263 8.44147 3.45509 6.70782 4.71829C4.97417 5.98149 3.74869 7.82236 3.25222 9.90916C2.75575 11.996 3.02094 14.1915 4 16.1L2 22L7.9 20Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-secondaryGold">Chat</p>
        </li>
        <li class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.9 20C9.80858 20.9791 12.0041 21.2443 14.0909 20.7478C16.1777 20.2514 18.0186 19.0259 19.2818 17.2922C20.545 15.5586 21.1474 13.4308 20.9806 11.2922C20.8137 9.15366 19.8886 7.14502 18.3718 5.62824C16.855 4.11146 14.8464 3.1863 12.7078 3.01946C10.5693 2.85263 8.44147 3.45509 6.70782 4.71829C4.97417 5.98149 3.74869 7.82236 3.25222 9.90916C2.75575 11.996 3.02094 14.1915 4 16.1L2 22L7.9 20Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-secondaryGold">Rankingi</p>
        </li>
        <li class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.9 20C9.80858 20.9791 12.0041 21.2443 14.0909 20.7478C16.1777 20.2514 18.0186 19.0259 19.2818 17.2922C20.545 15.5586 21.1474 13.4308 20.9806 11.2922C20.8137 9.15366 19.8886 7.14502 18.3718 5.62824C16.855 4.11146 14.8464 3.1863 12.7078 3.01946C10.5693 2.85263 8.44147 3.45509 6.70782 4.71829C4.97417 5.98149 3.74869 7.82236 3.25222 9.90916C2.75575 11.996 3.02094 14.1915 4 16.1L2 22L7.9 20Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-secondaryGold">Moje piwa</p>
        </li>
        <li class="flex items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M7.9 20C9.80858 20.9791 12.0041 21.2443 14.0909 20.7478C16.1777 20.2514 18.0186 19.0259 19.2818 17.2922C20.545 15.5586 21.1474 13.4308 20.9806 11.2922C20.8137 9.15366 19.8886 7.14502 18.3718 5.62824C16.855 4.11146 14.8464 3.1863 12.7078 3.01946C10.5693 2.85263 8.44147 3.45509 6.70782 4.71829C4.97417 5.98149 3.74869 7.82236 3.25222 9.90916C2.75575 11.996 3.02094 14.1915 4 16.1L2 22L7.9 20Z"
              stroke="#A89E8A"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p class="text-secondaryGold">Moje piwa</p>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
const menuOpen = ref(false)
</script>

<style scoped></style>
