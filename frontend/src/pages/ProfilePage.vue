<!-- src/pages/ProfilePage.vue -->
<template>
  <div class="xl:flex bg-gradient-to-b pt-20 xl:pt-0 from-primaryGreen/0 to-primaryGreen/50 min-h-screen">
    <Navbar />

    <div class="px-5 xl:w-full pt-10 xl:pt-10 pb-16">
      <div class="max-w-screen-xl mx-auto">

        <!-- Sekcja użytkownika -->
        <div
          class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center shadow-md shadow-black/20">
          <div class="flex items-center gap-6">
            <div
              class="flex items-center justify-center bg-primaryOrange/20 rounded-full aspect-square w-24 sm:w-28 xl:w-20 mx-auto xl:mx-0 overflow-hidden">
              <img v-if="user.photo" :src="`http://localhost:5000${user.photo}`" alt="Zdjęcie profilowe"
                class="w-full h-full object-cover" />
              <div v-else class="w-1/2 h-auto flex-shrink-0" style="max-width: 60%; max-height: 60%;">
                <SvgIcon name="beer" class="w-full h-full" style="color: #D35226"/>
              </div>
            </div>

            <div class="space-y-1">
              <h2 class="text-white text-2xl font-semibold">
                {{ user.firstName }} {{ user.lastName }}, {{ user.age }}
              </h2>

              <p class="text-secondaryGold text-sm flex items-center gap-2">
                <span class="w-4 h-4 text-secondaryGold">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                    <path
                      d="M13.3327 7.16683C13.3327 10.4955 9.64001 13.9622 8.40001 15.0328C8.2845 15.1197 8.14388 15.1667 7.99935 15.1667C7.85482 15.1667 7.7142 15.1197 7.59868 15.0328C6.35868 13.9622 2.66602 10.4955 2.66602 7.16683C2.66602 5.75234 3.22792 4.39579 4.22811 3.39559C5.22831 2.3954 6.58486 1.8335 7.99935 1.8335C9.41384 1.8335 10.7704 2.3954 11.7706 3.39559C12.7708 4.39579 13.3327 5.75234 13.3327 7.16683Z"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
                    <path
                      d="M8 9.16675C9.10457 9.16675 10 8.27132 10 7.16675C10 6.06218 9.10457 5.16675 8 5.16675C6.89543 5.16675 6 6.06218 6 7.16675C6 8.27132 6.89543 9.16675 8 9.16675Z"
                      stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
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

            <button @click="showEditPopup = true"
              class="bg-primaryGreen text-white py-2 px-6 rounded-[10px] font-semibold shadow-md hover:bg-primaryGreen/80 transition duration-300">
              Edytuj profil
            </button>
          </div>
        </div>

        <!-- Statystyki -->
        <div class="mt-8">
          <h4 class="text-white text-[22px] font-semibold mb-3">Statystyki</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6 items-stretch">
            <div v-for="stat in stats" :key="stat.label"
              class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col items-center justify-center gap-2 shadow-md h-full min-h-[140px]">
              <SvgIcon :name="stat.icon" class="w-9 h-8 text-secondaryGold" style="color: #C8A654;"/>
              <p class="text-white text-2xl font-semibold">{{ stat.value }}</p>
              <p class="text-secondaryGold text-sm">{{ stat.label }}</p>
            </div>
          </div>
        </div>

        <!-- Odznaki -->
        <div class="mt-8">
          <h4 class="text-white text-[22px] font-semibold mb-3">Odznaki</h4>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            <div v-for="badge in badges" :key="badge.name"
              class="bg-tertiaryGreen/50 rounded-[10px] p-6 flex flex-col items-center justify-center gap-3 shadow-md min-h-[160px] transition hover:bg-tertiaryGreen/70">
              <div v-if="badge.icon?.startsWith('<svg')" v-html="badge.icon" class="w-9 h-8"></div>
              <SvgIcon v-else :name="badge.icon || 'medal'" class="w-9 h-8" style="color: #C8A654"/>
              <p class="text-white text-sm font-semibold text-center">
                {{ badge.name }}
              </p>
              <p class="text-secondaryGold text-xs text-center leading-tight opacity-90">
                {{ badge.description }}
              </p>
            </div>
          </div>
        </div>


        <!-- Akcje -->
        <div class="flex flex-col md:flex-row gap-6 mt-20">
          <router-link to="/ranking" class="w-full md:w-1/2">
            <div class="w-full">
              <button
                class="bg-primaryOrange text-white font-semibold py-4 px-6 rounded-[10px] w-full shadow-md shadow-primaryOrange/50 hover:shadow-primaryOrange/70 transition duration-300">
                🏆 Zobacz ranking
              </button>
            </div>
          </router-link>

          <router-link to="/moje-piwa" class="w-full md:w-1/2">
            <div class="w-full">
              <button
                class="bg-tertiaryGreen/50 text-white font-semibold py-4 px-6 rounded-[10px] w-full shadow-md shadow-black/20 hover:bg-tertiaryGreen/70 transition duration-300">
                🍺 Moja historia piw
              </button>
            </div>
          </router-link>
        </div>


      </div>
    </div>
  </div>

  <ProfileEditPopup :visible="showEditPopup" :userData="user" @close="showEditPopup = false" @save="updateProfile" />

</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import { statuses } from '../../../shared/statuses.js'
import axios from '@/api/api.js'
import Navbar from '@/components/Navbar.vue'
import ProfileEditPopup from '@/components/ProfileEditPopup.vue'
import SvgIcon from '@/components/svgIcons/SvgIcon.vue'
import { userRanking, fetchUserRanking } from '@/composables/fetchUserRanking.js'
import { user, fetchUserData } from '@/composables/fetchUserData'
import { beerStats, fetchBeerStats } from '@/composables/fetchBeerStats'
import { friendsCount, fetchFriendsCount } from '@/composables/fetchFriendsCount.js'

const stats = ref([
  { label: 'Piwa', value: 0, icon: 'beer'},
  { label: 'Znajomi', value: 23, icon: 'friends' },
  { label: 'Ranking', value: '#0', icon: 'ranking' },
  { label: 'Odznaki', value: 8, icon: 'badge' }
])

const showEditPopup = ref(false)
const userAchievements = ref([])

/* ----------------- Functions ----------------- */
function getStatusLabel(value) {
  const status = statuses.find(s => s.value === value)
  return status ? status.label : ''
}

const fetchUserAchievements = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/achievements/me", {
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
    const res = await axios.put('/users/me', payload, {
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
    { label: 'Piwa', value: beerStats.value.total || 0, icon: 'beer' },
    { label: 'Znajomi', value: friendsCount.value || 0, icon: 'friends' },
    { label: 'Ranking', value: userRanking.value, icon: 'ranking' },
    { label: 'Odznaki', value: userAchievements.value.length || 0, icon: 'badge' }
  ]
})

/* ----------------- Lifecycle ----------------- */
onMounted(async () => {
  user.value = await fetchUserData() 
  await Promise.all([
    fetchBeerStats(),
    fetchUserRanking('all'),
    fetchUserAchievements(),
    fetchFriendsCount()
  ])
})

const badges = computed(() => {
  return userAchievements.value.map(ach => ({
    name: ach.name,
    description: ach.description || "Brak opisu",
    icon: ach.icon || null
  }))
})
</script>

<style scoped>
svg { display: block; }
</style>
