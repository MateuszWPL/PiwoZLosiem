<!-- src/pages/ProfilePage.vue -->
<template>
  <div class="xl:flex bg-gradient-to-b pt-20 xl:pt-0 from-primaryGreen/0 to-primaryGreen/50 h-dvh">
    <Navbar />

    <div class="px-5 xl:w-full pt-10 xl:pt-10">
      <div class="max-w-screen-xl mx-auto">

        <!-- Sekcja użytkownika -->
        <div class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center shadow-md shadow-black/20">
          <div class="flex items-center gap-6">
            <div class="w-20 h-20 bg-primaryOrange/20 rounded-full flex items-center justify-center">
              <!-- duże avatar SVG -->
              <div v-html="svgBeer" class="w-10 h-10"></div>
            </div>
            <div>
              <h2 class="text-white text-2xl font-semibold">Michał Kowalski, 29</h2>
              <p class="text-secondaryGold text-sm mt-1 flex items-center gap-2">
                <span>📍Poznań</span>
              </p>
              <p class="text-secondaryGold text-sm mt-2">Miłośnik kraftów i dobrych pubów. Zawsze chętny na odkrywanie nowych smaków!</p>
            </div>
          </div>
          <div class="flex flex-col xl:items-end mt-4 xl:mt-0 gap-4">
            <div class="flex items-center gap-2">
              <div class="py-2 px-4 bg-primaryOrange rounded-full">
                <p class="text-white text-sm font-semibold">🍺 wolny na piwo</p>
              </div>
            </div>
            <button class="bg-primaryGreen text-white py-2 px-6 rounded-[10px] font-semibold shadow-md hover:bg-primaryGreen/80 transition duration-300">
              Edytuj profil
            </button>
          </div>
        </div>

        <!-- Statystyki -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
          <div v-for="stat in stats" :key="stat.label" class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col items-center gap-2 shadow-md">
            <div v-html="stat.icon" class="w-9 h-8"></div>
            <p class="text-white text-2xl font-semibold">{{ stat.value }}</p>
            <p class="text-secondaryGold text-sm">{{ stat.label }}</p>
          </div>
        </div>

        <!-- Odznaki -->
        <div class="mt-10">
          <h4 class="text-white text-[24px] font-semibold mb-6">Odznaki</h4>
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div v-for="badge in badges" :key="badge.name" class="bg-tertiaryGreen/50 rounded-[10px] p-6 text-center shadow-md">
              <p class="text-primaryOrange text-2xl mb-2">🍺</p>
              <p class="text-white font-semibold">{{ badge.name }}</p>
            </div>
          </div>
        </div>

        <!-- Akcje -->
        <div class="flex flex-col md:flex-row gap-6 mt-10">
          <button class="bg-primaryOrange text-white font-semibold py-4 px-6 rounded-[10px] w-full md:w-1/2 shadow-md shadow-primaryOrange/50 hover:shadow-primaryOrange/70 transition duration-300">
            🏆 Zobacz ranking
          </button>
          <button class="bg-tertiaryGreen/50 text-white font-semibold py-4 px-6 rounded-[10px] w-full md:w-1/2 shadow-md shadow-black/20 hover:bg-tertiaryGreen/70 transition duration-300">
            🍺 Moja historia piw
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
/* minimalne importy i dane — brak JSX */
import Navbar from '@/components/Navbar.vue'

/* SVG jako stringy — używamy dokładnych path z Twojego dashboardu */
const svgBeer = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none">
  <path d="M25.5 14.6665H27C28.1935 14.6665 29.3381 15.0879 30.182 15.8381C31.0259 16.5882 31.5 17.6056 31.5 18.6665C31.5 19.7274 31.0259 20.7448 30.182 21.4949C29.3381 22.2451 28.1935 22.6665 27 22.6665H25.5" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.5 16V24" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.5 16V24" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 10.0003C19.5 10.0003 18.84 10.667 16.5 10.667C14.16 10.667 13.5 10.0003 12 10.0003C10.5 10.0003 9.42 10.667 8.25 10.667C7.25544 10.667 6.30161 10.3158 5.59835 9.69068C4.89509 9.06556 4.5 8.21771 4.5 7.33366C4.5 6.4496 4.89509 5.60176 5.59835 4.97664C6.30161 4.35152 7.25544 4.00033 8.25 4.00033C9.42 4.00033 10.605 4.66699 12 4.66699C13.395 4.66699 14.16 2.66699 16.5 2.66699C18.84 2.66699 19.5 4.66699 21 4.66699C22.5 4.66699 23.58 4.00033 24.75 4.00033C25.7446 4.00033 26.6984 4.35152 27.4017 4.97664C28.1049 5.60176 28.5 6.4496 28.5 7.33366C28.5 8.21771 28.1049 9.06556 27.4017 9.69068C26.6984 10.3158 25.7446 10.667 24.75 10.667C23.58 10.667 22.5 10.0003 21 10.0003Z" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.5 10.6665V26.6665C7.5 27.3737 7.81607 28.052 8.37868 28.5521C8.94129 29.0522 9.70435 29.3332 10.5 29.3332H22.5C23.2956 29.3332 24.0587 29.0522 24.6213 28.5521C25.1839 28.052 25.5 27.3737 25.5 26.6665V10.6665" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const svgFriends = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none">
  <path d="M24 28V25.3333C24 23.9188 23.3679 22.5623 22.2426 21.5621C21.1174 20.5619 19.5913 20 18 20H9C7.4087 20 5.88258 20.5619 4.75736 21.5621C3.63214 22.5623 3 23.9188 3 25.3333V28" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.5 14.6667C16.8137 14.6667 19.5 12.2789 19.5 9.33333C19.5 6.38781 16.8137 4 13.5 4C10.1863 4 7.5 6.38781 7.5 9.33333C7.5 12.2789 10.1863 14.6667 13.5 14.6667Z" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M33 28V25.3333C32.999 24.1516 32.5565 23.0037 31.742 22.0698C30.9276 21.1358 29.7872 20.4688 28.5 20.1733" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 4.17334C25.2906 4.46707 26.4346 5.13427 27.2515 6.06975C28.0684 7.00523 28.5118 8.15578 28.5118 9.34001C28.5118 10.5242 28.0684 11.6748 27.2515 12.6103C26.4346 13.5457 25.2906 14.2129 24 14.5067" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const svgRanking = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none">
  <path d="M33 9.3335L20.25 20.6668L12.75 14.0002L3 22.6668" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 9.3335H33V17.3335" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const svgBadge = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none">
  <path d="M9 4L27 4L27 20L18 28L9 20L9 4Z" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

/* dane do wyświetlenia */
const stats = [
  { label: 'Piwa', value: 47, icon: svgBeer },
  { label: 'Znajomi', value: 23, icon: svgFriends },
  { label: 'Ranking', value: '#12', icon: svgRanking },
  { label: 'Odznaki', value: 8, icon: svgBadge }
]

const badges = [
  { name: 'Pierwsze piwo' },
  { name: 'Weekendowy wojownik' },
  { name: 'Mistrz browarów' },
  { name: '5 z rzędu' }
]
</script>

<style scoped>
/* Dodaj drobne poprawki jeśli trzeba, np. aby SVG-y miały lepsze skalowanie */
svg { display: block; }
</style>
