<template>
  <div class="ranking-list flex flex-col gap-2">
    <!-- Top 10 -->
    <div v-for="(user, index) in users" :key="index"
      class="h-[60px] w-full flex items-center gap-3 rounded-[15px] border border-[#22392E] bg-[rgba(31,46,38,0.5)] px-4">

      <!-- trofeum / SVG miejsca -->
      <div class="flex-shrink-0">
        <template v-if="index === 0">
          <!-- SVG dla 1 miejsca -->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
            class="w-8 h-8 flex-shrink-0">
            <path
              d="M9.33333 28V25.3333H14.6667V21.2C13.5778 20.9556 12.6058 20.4947 11.7507 19.8173C10.8956 19.14 10.2676 18.2898 9.86667 17.2667C8.2 17.0667 6.80578 16.3391 5.684 15.084C4.56222 13.8289 4.00089 12.3564 4 10.6667V9.33333C4 8.6 4.26133 7.97244 4.784 7.45067C5.30667 6.92889 5.93422 6.66756 6.66667 6.66667H9.33333V4H22.6667V6.66667H25.3333C26.0667 6.66667 26.6947 6.928 27.2173 7.45067C27.74 7.97333 28.0009 8.60089 28 9.33333V10.6667C28 12.3556 27.4387 13.828 26.316 15.084C25.1933 16.34 23.7991 17.0676 22.1333 17.2667C21.7333 18.2889 21.1058 19.1391 20.2507 19.8173C19.3956 20.4956 18.4231 20.9564 17.3333 21.2V25.3333H22.6667V28H9.33333Z"
              fill="#C8A654" />
          </svg>
        </template>

        <template v-else-if="index === 1">
          <!-- SVG dla 2 miejsca -->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
            class="w-8 h-8 flex-shrink-0">
            <path
              d="M9.33333 28V25.3333H14.6667V21.2C13.5778 20.9556 12.6058 20.4947 11.7507 19.8173C10.8956 19.14 10.2676 18.2898 9.86667 17.2667C8.2 17.0667 6.80578 16.3391 5.684 15.084C4.56222 13.8289 4.00089 12.3564 4 10.6667V9.33333C4 8.6 4.26133 7.97244 4.784 7.45067C5.30667 6.92889 5.93422 6.66756 6.66667 6.66667H9.33333V4H22.6667V6.66667H25.3333C26.0667 6.66667 26.6947 6.928 27.2173 7.45067C27.74 7.97333 28.0009 8.60089 28 9.33333V10.6667C28 12.3556 27.4387 13.828 26.316 15.084C25.1933 16.34 23.7991 17.0676 22.1333 17.2667C21.7333 18.2889 21.1058 19.1391 20.2507 19.8173C19.3956 20.4956 18.4231 20.9564 17.3333 21.2V25.3333H22.6667V28H9.33333Z"
              fill="#C0C0C0" />
          </svg>
        </template>

        <template v-else-if="index === 2">
          <!-- SVG dla 3 miejsca -->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none"
            class="w-8 h-8 flex-shrink-0">
            <path
              d="M9.33333 28V25.3333H14.6667V21.2C13.5778 20.9556 12.6058 20.4947 11.7507 19.8173C10.8956 19.14 10.2676 18.2898 9.86667 17.2667C8.2 17.0667 6.80578 16.3391 5.684 15.084C4.56222 13.8289 4.00089 12.3564 4 10.6667V9.33333C4 8.6 4.26133 7.97244 4.784 7.45067C5.30667 6.92889 5.93422 6.66756 6.66667 6.66667H9.33333V4H22.6667V6.66667H25.3333C26.0667 6.66667 26.6947 6.928 27.2173 7.45067C27.74 7.97333 28.0009 8.60089 28 9.33333V10.6667C28 12.3556 27.4387 13.828 26.316 15.084C25.1933 16.34 23.7991 17.0676 22.1333 17.2667C21.7333 18.2889 21.1058 19.1391 20.2507 19.8173C19.3956 20.4956 18.4231 20.9564 17.3333 21.2V25.3333H22.6667V28H9.33333Z"
              fill="#CD7F32" />
          </svg>
        </template>

        <template v-else>
          <div class="w-8 h-8 flex items-center justify-center bg-transparent rounded-full">
            <span class="text-xl font-semibold text-secondaryGold leading-4 min-w-[32px]">#{{ index + 1 }}</span>
          </div>
        </template>
      </div>

      <!-- informacje o uzytkowniku w top10 -->
      <div class="flex flex-col ml-4">
        <span class="text-white font-semibold text-[20px] leading-normal">
          {{ user.imie }} {{ user.nazwisko }}
        </span>
        <span class="text-secondaryGold font-semibold text-sm leading-4">
          {{ user.miasto }}
        </span>
      </div>

      <!-- pkt rankingowe -->
      <div class="ml-auto flex flex-col items-end gap-1.5">
        <span class="text-primaryOrange font-semibold text-[20px] leading-4 text-right">
          {{ user.points }}
        </span>
        <span class="text-secondaryGold font-semibold text-[12px] leading-4 w-[21px] h-[18px] text-right">
          piw
        </span>
      </div>
    </div>

    <!-- Kafelek aktualnego użytkownika -->
    <div v-if="currentUser"
      class="h-[60px] w-full flex items-center gap-3 rounded-[15px] border border-primaryOrange bg-[rgba(211,82,38,0.3)] px-4">
      <!-- numer miejsca w rankignu -->
      <div class="flex-shrink-0">
        <div class="w-8 h-8 flex items-center justify-center bg-transparent rounded-full">
          <span class="text-xl font-semibold text-secondaryGold leading-4 min-w-[32px]">#{{ currentUser.rank }}</span>
        </div>
      </div>

      <!-- informacje o uzytkowniku -->
      <div class="flex flex-col ml-4">
        <span class="text-white font-semibold text-[20px] leading-normal">
          {{ currentUser.imie }} {{ currentUser.nazwisko }}
        </span>
        <span class="text-secondaryGold font-semibold text-sm leading-4">
          {{ currentUser.miasto }}
        </span>
      </div>

      <!-- punkty -->
      <div class="ml-auto flex flex-col items-end gap-1.5">
        <span class="text-primaryOrange font-semibold text-[20px] leading-4 text-right">
          {{ currentUser.points }}
        </span>
        <span class="text-secondaryGold font-semibold text-[12px] leading-4 w-[21px] h-[18px] text-right">
          piw
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  users: { type: Array, default: () => [] },
  currentUser: { type: Object, default: null }
})
</script>
