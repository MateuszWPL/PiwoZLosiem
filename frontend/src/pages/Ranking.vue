<template>
  <div class="xl:flex bg-gradient-to-b from-primaryGreen/0 to-primaryGreen/50 min-h-screen">
    <!-- Navbar -->
    <Navbar />

    <!-- Glowna tresc -->
    <div class="px-5 xl:flex-1">
      <div class="max-w-screen-xl mx-auto flex flex-col items-center pt-24 xl:pt-10">
        <!-- Trofeum -->
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-12 h-12 flex-shrink-0"
          fill="var(--PrimaryGold, #C8A654)">
          <path
            d="M10.6667 48V42.6667H21.3333V34.4C19.1556 33.9111 17.2116 32.9893 15.5013 31.6347C13.7911 30.28 12.5351 28.5796 11.7333 26.5333C8.4 26.1333 5.61156 24.6782 3.368 22.168C1.12444 19.6578 0.00177778 16.7129 0 13.3333V10.6667C0 9.2 0.522667 7.94489 1.568 6.90133C2.61333 5.85778 3.86844 5.33511 5.33333 5.33333H10.6667V0H37.3333V5.33333H42.6667C44.1333 5.33333 45.3893 5.856 46.4347 6.90133C47.48 7.94667 48.0018 9.20178 48 10.6667V13.3333C48 16.7111 46.8773 19.656 44.632 22.168C42.3867 24.68 39.5982 26.1351 36.2667 26.5333C35.4667 28.5778 34.2116 30.2782 32.5013 31.6347C30.7911 32.9911 28.8462 33.9129 26.6667 34.4V42.6667H37.3333V48H10.6667ZM10.6667 20.8V10.6667H5.33333V13.3333C5.33333 15.0222 5.82222 16.5449 6.8 17.9013C7.77778 19.2578 9.06667 20.224 10.6667 20.8ZM24 29.3333C26.2222 29.3333 28.1111 28.5556 29.6667 27C31.2222 25.4444 32 23.5556 32 21.3333V5.33333H16V21.3333C16 23.5556 16.7778 25.4444 18.3333 27C19.8889 28.5556 21.7778 29.3333 24 29.3333ZM37.3333 20.8C38.9333 20.2222 40.2222 19.2551 41.2 17.8987C42.1778 16.5422 42.6667 15.0204 42.6667 13.3333V10.6667H37.3333V20.8Z" />
        </svg>

        <!-- Nagłówek -->
        <h1 class="text-[32px] font-semibold text-white leading-normal">Ranking</h1>
        <p class="text-xs font-semibold text-secondaryGold leading-normal">Sprawdź swoją pozycję</p>

        <!-- Tabsy -->
        <div class="flex gap-1 mt-5 mb-5">
          <button v-for="(tab, index) in tabs" :key="index" @click="selectedTab = index" :class="[
            'px-4 py-2 rounded-[10px] border font-semibold transition-colors text-xs backdrop-blur-sm',
            selectedTab === index
              ? 'bg-primaryOrange/70 text-white border-primaryOrange shadow-[0_0_10px_#F57C00]'
              : 'bg-white/10 text-white border-green-500/70 hover:bg-green-700/20 active:bg-primaryOrange/40',
          ]">
            {{ tab }}
          </button>
        </div>

        <!-- Ranking top10 + aktualny użytkownik -->
        <div class="flex flex-col w-full gap-3 mt-4 mb-3">
          <RankingPoints :users="rankings[selectedTab]" :current-user="currentUserRankings[selectedTab]" />
        </div>

        <!-- Dolny modul -->
        <div
          class="w-full h-[180px] shrink-0 rounded-[15px] border border-primaryOrange flex flex-col justify-start items-center p-6 text-center pt-4 pb-8 mt-6">
          <h2 class="text-xl font-semibold text-white leading-normal">Wspinaj się wyżej!</h2>
          <p class="text-xs font-semibold leading-normal text-white/80 mt-2">
            Pij więcej piwa i zdobywaj kolejne miejsca w rankingu
          </p>
          <router-link to="/odkrywaj">
            <button class="mt-8 inline-flex h-[50px] px-8 py-4 justify-center items-center rounded-[15px] bg-primaryGold text-black text-sm font-semibold leading-normal
           hover:bg-yellow-400 hover:scale-105 transition-all duration-300 transform origin-center">
              Znajdź towarzystwo
            </button>
          </router-link>


        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import Navbar from '@/components/Navbar.vue'
import RankingPoints from '@/components/RankingPoints.vue'

const tabs = ['Tydzień', 'Miesiąc', 'Cały czas']
const selectedTab = ref(0)

// dane top10 dla kazdego
const rankings = ref([[], [], []])

// dane zalogowanego uzytkownika dla kazdego okresu
const currentUserRankings = ref([null, null, null])

// pobranie danych ranking top10
const fetchRanking = async (period) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/ranking/${period}`)
    return res.data
  } catch (err) {
    console.error(`Błąd przy pobieraniu rankingu (${period}):`, err)
    return []
  }
}

// pobranie danych ranking zalogowany uzytkownik
const fetchCurrentUserRanking = async (period) => {
  try {
    const token = localStorage.getItem('token')
    const res = await axios.get(`http://localhost:5000/api/ranking/${period}/current-user`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    return res.data
  } catch (err) {
    console.error(`Błąd przy pobieraniu aktualnego użytkownika (${period}):`, err)
    return null
  }
}

// pobranie danych po mount
onMounted(async () => {
  const periods = ['week', 'month', 'all']
  for (let i = 0; i < periods.length; i++) {
    rankings.value[i] = await fetchRanking(periods[i])
    currentUserRankings.value[i] = await fetchCurrentUserRanking(periods[i])
  }
})
</script>
