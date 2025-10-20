<!-- src/pages/ProfilePage.vue -->
<template>
  <div class="xl:flex bg-gradient-to-b pt-20 xl:pt-0 from-primaryGreen/0 to-primaryGreen/50 min-h-screen">
    <Navbar />

    <div class="px-5 xl:w-full pt-10 xl:pt-10 pb-16">
      <div class="max-w-screen-xl mx-auto">

        <!-- Sekcja użytkownika -->
<div class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center shadow-md shadow-black/20">
  <div class="flex items-center gap-6">
    <div class="flex items-center justify-center bg-primaryOrange/20 rounded-full aspect-square w-24 sm:w-28 xl:w-20 mx-auto xl:mx-0 overflow-hidden">
      <!-- jeśli chcesz mieć zdjęcie -->
      <img v-if="user.photo" :src="`http://localhost:5000${user.photo}`" alt="Zdjęcie profilowe" class="w-full h-full object-cover" />
      <div v-else v-html="svgBeer" class="w-1/2 h-auto flex-shrink-0" style="max-width: 60%; max-height: 60%;"></div>
    </div>

    <div class="space-y-1">
      <h2 class="text-white text-2xl font-semibold">
        {{ user.firstName }} {{ user.lastName }}, {{ user.age }}
      </h2>

      <p class="text-secondaryGold text-sm flex items-center gap-2">
        <span class="w-4 h-4 text-secondaryGold">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
            <path d="M13.3327 7.16683C13.3327 10.4955 9.64001 13.9622 8.40001 15.0328C8.2845 15.1197 8.14388 15.1667 7.99935 15.1667C7.85482 15.1667 7.7142 15.1197 7.59868 15.0328C6.35868 13.9622 2.66602 10.4955 2.66602 7.16683C2.66602 5.75234 3.22792 4.39579 4.22811 3.39559C5.22831 2.3954 6.58486 1.8335 7.99935 1.8335C9.41384 1.8335 10.7704 2.3954 11.7706 3.39559C12.7708 4.39579 13.3327 5.75234 13.3327 7.16683Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M8 9.16675C9.10457 9.16675 10 8.27132 10 7.16675C10 6.06218 9.10457 5.16675 8 5.16675C6.89543 5.16675 6 6.06218 6 7.16675C6 8.27132 6.89543 9.16675 8 9.16675Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span>{{ user.location }}</span>
      </p>

      <p class="text-secondaryGold text-sm">
        {{ user.bio }}
      </p>
    </div>
  </div>

  <div class="flex flex-col xl:items-end mt-4 xl:mt-0 gap-4">
    <div class="flex items-center gap-2">
      <div class="py-2 px-6 bg-primaryOrange rounded-[10px] flex items-center justify-center">
        <p class="text-white text-sm font-semibold">
          {{ getStatusLabel(user.status) }}
        </p>
      </div>
    </div>

    <button 
      @click="showEditPopup = true"
      class="bg-primaryGreen text-white py-2 px-6 rounded-[10px] font-semibold shadow-md hover:bg-primaryGreen/80 transition duration-300">
      Edytuj profil
    </button>
  </div>
</div>

        <!-- Statystyki -->
        <div class="mt-8">
        <h4 class="text-white text-[22px] font-semibold mb-3">Statystyki</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            <div
            v-for="stat in stats"
            :key="stat.label"
            class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col items-center justify-center gap-2 shadow-md h-full min-h-[140px]"
            >
            <div v-html="stat.icon" class="w-9 h-8"></div>
            <p class="text-white text-2xl font-semibold">{{ stat.value }}</p>
            <p class="text-secondaryGold text-sm">{{ stat.label }}</p>
            </div>
        </div>
        </div>


        <!-- Odznaki -->
        <div class="mt-8">
        <h4 class="text-white text-[22px] font-semibold mb-3">Odznaki</h4>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            <div
            v-for="badge in badges"
            :key="badge.name"
            class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col items-center justify-center gap-2 shadow-md h-full min-h-[140px]"
            >
            <div v-html="badge.icon" class="w-9 h-8"></div>
            <p class="text-white text-sm font-semibold text-center">{{ badge.name }}</p>
            </div>
        </div>
        </div>


        <!-- Akcje -->
        <div class="flex flex-col md:flex-row gap-6 mt-20">
          <router-link to="/ranking" class="w-full md:w-1/2">
            <div class="w-full">
              <button class="bg-primaryOrange text-white font-semibold py-4 px-6 rounded-[10px] w-full shadow-md shadow-primaryOrange/50 hover:shadow-primaryOrange/70 transition duration-300">
                🏆 Zobacz ranking
              </button>
            </div>
          </router-link>

          <router-link to="/moje-piwa" class="w-full md:w-1/2">
            <div class="w-full">
              <button class="bg-tertiaryGreen/50 text-white font-semibold py-4 px-6 rounded-[10px] w-full shadow-md shadow-black/20 hover:bg-tertiaryGreen/70 transition duration-300">
                🍺 Moja historia piw
              </button>
            </div>
          </router-link>
        </div>


      </div>
    </div>
  </div>

  <ProfileEditPopup
  :visible="showEditPopup"
  :userData="user"
  @close="showEditPopup = false"
  @save="updateProfile"
/>

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { statuses } from '../../../shared/statuses.js'
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import ProfileEditPopup from '@/components/ProfileEditPopup.vue'

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

const svgMedal = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" fill="none" viewBox="0 0 36 32">
  <circle cx="18" cy="12" r="6" stroke="#D35226" stroke-width="2"/>
  <path d="M12 20L10 30L18 26L26 30L24 20" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const svgStar = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" fill="none" viewBox="0 0 36 32">
  <path d="M18 2L21.09 11.26L31 12.27L23.5 18.97L25.82 28L18 23L10.18 28L12.5 18.97L5 12.27L14.91 11.26L18 2Z"
        stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const svgTrophy = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" fill="none" viewBox="0 0 36 32">
  <path d="M24 4H12V8C12 9.06087 12.4214 10.0783 13.1716 10.8284C13.9217 11.5786 14.9391 12 16 12H20C21.0609 12 22.0783 11.5786 22.8284 10.8284C23.5786 10.0783 24 9.06087 24 8V4Z" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M12 4H8C8 4 6 12 12 12" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M24 4H28C28 4 30 12 24 12" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 12V16H20V12" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 16H20C21.0609 16 22.0783 16.4214 22.8284 17.1716C23.5786 17.9217 24 18.9391 24 20V28H12V20C12 18.9391 12.4214 17.9217 13.1716 17.1716C13.9217 16.4214 14.9391 16 16 16Z" stroke="#C8A654" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const svgShield = `
<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" fill="none" viewBox="0 0 36 32">
  <path d="M9 4H27V16C27 20.4183 22.9706 24 18 28C13.0294 24 9 20.4183 9 16V4Z" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`

const stats = ref([
  { label: 'Piwa', value: 0, icon: svgBeer },
  { label: 'Znajomi', value: 23, icon: svgFriends },
  { label: 'Ranking', value: '#0', icon: svgRanking },
  { label: 'Odznaki', value: 8, icon: svgBadge }
])

// const badges = [
//   { name: 'Pierwsze piwo', icon: svgBeer },
//   { name: 'Weekendowy wojownik', icon: svgStar },
//   { name: 'Mistrz browarów', icon: svgTrophy },
//   { name: '5 z rzędu', icon: svgShield }
// ]

const showEditPopup = ref(false)
const user = ref({
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  location: '',
  bio: '',
  status: '',
  favoriteBeers: [],
  photo: null,
})
const beerStats = ref({ today: 0, week: 0, month: 0, total: 0 })
const userRanking = ref('#0')
const userAchievements = ref([])

/* ----------------- Functions ----------------- */
function getStatusLabel(value) {
  const status = statuses.find(s => s.value === value)
  return status ? status.label : ''
}

async function fetchUserData() {
  try {
    const token = localStorage.getItem('token')
    if (!token) return
    const res = await axios.get('http://localhost:5000/api/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = res.data
  } catch (err) {
    console.error('Błąd pobierania danych użytkownika:', err)
  }
}

const fetchBeerStats = async () => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get('http://localhost:5000/api/beers/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    beerStats.value = res.data
  } catch (err) {
    console.error('Błąd przy pobieraniu statystyk piw:', err)
  }
}

const fetchUserRanking = async (period = 'all') => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`http://localhost:5000/api/ranking/${period}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    const ranking = res.data
    const me = user.value
    let position = ranking.findIndex(
      r => r.imie === me.firstName && r.nazwisko === me.lastName
    )
    if (position === -1) position = ranking.length
    userRanking.value = `#${position + 1}`
  } catch (err) {
    console.error('Błąd przy pobieraniu rankingu:', err)
  }
}

const fetchUserAchievements = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/achievements/me", {
      headers: { Authorization: `Bearer ${token}` }
    });
    userAchievements.value = res.data;
  } catch (err) {
    console.error("Błąd pobierania odznak:", err);
  }
};

async function updateProfile(updatedData) {
  try {
    const token = localStorage.getItem('token')
    if (!token) return alert('Musisz być zalogowany, aby edytować profil')
    user.value = { ...user.value, ...updatedData }
    const payload = {
      firstName: updatedData.firstName || '',
      lastName: updatedData.lastName || '',
      age: updatedData.age || '',
      gender: updatedData.gender || '',
      location: updatedData.location || '',
      bio: updatedData.bio || '',
      status: updatedData.status || '',
      favoriteBeers: updatedData.favoriteBeers || [],
      photo: updatedData.photo || null
    }
    const res = await axios.put('http://localhost:5000/api/users/me', payload, {
      headers: { Authorization: `Bearer ${token}` }
    })
    user.value = { ...res.data }
    alert('Profil zapisany!')
  } catch (err) {
    console.error('Błąd zapisu profilu', err)
    alert('Nie udało się zapisać profilu.')
    fetchUserData()
  }
}

/* ----------------- Watch ----------------- */
watch([beerStats, userRanking, userAchievements], () => {
  stats.value = [
    { label: 'Piwa', value: beerStats.value.total || 0, icon: svgBeer },
    { label: 'Znajomi', value: 23, icon: svgFriends },
    { label: 'Ranking', value: userRanking.value, icon: svgRanking },
    { label: 'Odznaki', value: userAchievements.value.length || 0, icon: svgBadge }
  ]
})

/* ----------------- Lifecycle ----------------- */
onMounted(async () => {
  await fetchUserData()
  await fetchBeerStats()
  await fetchUserRanking()
  await fetchUserAchievements()
})

const badges = computed(() => {
  return userAchievements.value.map(ach => ({
    name: ach.name,
    icon: ach.icon || svgBadge
  }))
})

</script>

<style scoped>
svg { display: block; }
</style>
