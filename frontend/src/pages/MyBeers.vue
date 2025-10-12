<template>
  <div
    class="xl:flex bg-gradient-to-b pt-20 xl:pt-0 from-primaryGreen/0 to-primaryGreen/50 h-dvh flex-stretch min-h-screen"
  >
    <Navbar />
    <div class="p-5 w-full h-full">
      <div class="max-w-screen-xl mx-auto h-full">
        <div class="">
          <div class="flex items-center justify-between items-center">
            <div>
              <h1 class="text-3xl text-white font-serif mb-2 mt-5">Moje Piwa</h1>
              <p class="text-secondaryGold mb-4">Śledź swoje osiągnięcia piwne</p>
            </div>

            <button
              class="flex items-center gap-2 bg-primaryOrange hover:bg-primaryOrange/80 text-white px-4 py-2 rounded-lg text-base font-semibold transition-all duration-300 shadow-lg shadow-primaryOrange/30 hover:shadow-primaryOrange/50"
              @click="showModal = true"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              <span class="hidden sm:inline">Dodaj piwo</span>
            </button>

            <div
              v-if="showModal"
              class="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
            >
              <div
                class="bg-neutral-900 rounded-xl p-8 w-full max-w-xs sm:max-w-sm shadow-lg border border-primaryOrange relative"
              >
                <button
                  class="absolute top-2 right-2 text-gray-400 hover:text-white"
                  @click="showModal = false"
                  aria-label="Zamknij"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h3 class="text-lg font-semibold mb-4 text-white">Dodaj piwo</h3>
                <form @submit.prevent="addBeer">
                  <div class="mb-3">
                    <label class="block text-sm text-white mb-1" for="beerAmount">Ilość piw</label>
                    <input
                      id="beerAmount"
                      v-model="beerAmount"
                      type="number"
                      min="1"
                      class="w-full rounded px-3 py-2 bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-primaryOrange"
                      required
                    />
                  </div>
                  <div class="mb-3">
                    <label class="block text-sm text-white mb-1" for="beerType">Rodzaj piwa</label>
                    <input
                      id="beerType"
                      v-model="beerType"
                      type="text"
                      class="w-full rounded px-3 py-2 bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-primaryOrange"
                      required
                    />
                  </div>
                  <div class="mb-5">
                    <label class="block text-sm text-white mb-1" for="beerPlace">Miejsce</label>
                    <input
                      id="beerPlace"
                      v-model="beerPlace"
                      type="text"
                      class="w-full rounded px-3 py-2 bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-primaryOrange"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    class="w-full bg-primaryOrange hover:bg-primaryOrange/80 text-white font-semibold py-2 rounded transition"
                  >
                    Dodaj
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-slide-up mb-6">
            <div
              class="bg-secondaryGreen/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-secondaryGold text-sm">Dziś</span>
                <svg
                  class="w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="32"
                  viewBox="0 0 36 32"
                  fill="none"
                >
                  <path
                    d="M25.5 14.6665H27C28.1935 14.6665 29.3381 15.0879 30.182 15.8381C31.0259 16.5882 31.5 17.6056 31.5 18.6665C31.5 19.7274 31.0259 20.7448 30.182 21.4949C29.3381 22.2451 28.1935 22.6665 27 22.6665H25.5"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.5 16V24"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.5 16V24"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 10.0003C19.5 10.0003 18.84 10.667 16.5 10.667C14.16 10.667 13.5 10.0003 12 10.0003C10.5 10.0003 9.42 10.667 8.25 10.667C7.25544 10.667 6.30161 10.3158 5.59835 9.69068C4.89509 9.06556 4.5 8.21771 4.5 7.33366C4.5 6.4496 4.89509 5.60176 5.59835 4.97664C6.30161 4.35152 7.25544 4.00033 8.25 4.00033C9.42 4.00033 10.605 4.66699 12 4.66699C13.395 4.66699 14.16 2.66699 16.5 2.66699C18.84 2.66699 19.5 4.66699 21 4.66699C22.5 4.66699 23.58 4.00033 24.75 4.00033C25.7446 4.00033 26.6984 4.35152 27.4017 4.97664C28.1049 5.60176 28.5 6.4496 28.5 7.33366C28.5 8.21771 28.1049 9.06556 27.4017 9.69068C26.6984 10.3158 25.7446 10.667 24.75 10.667C23.58 10.667 22.5 10.0003 21 10.0003Z"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 10.6665V26.6665C7.5 27.3737 7.81607 28.052 8.37868 28.5521C8.94129 29.0522 9.70435 29.3332 10.5 29.3332H22.5C23.2956 29.3332 24.0587 29.0522 24.6213 28.5521C25.1839 28.052 25.5 27.3737 25.5 26.6665V10.6665"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p class="text-3xl font-bold text-primaryOrange">{{ beerStats.today }}</p>
              <p class="text-xs text-gray-400 mt-1">piw</p>
            </div>

            <div
              class="bg-secondaryGreen/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-secondaryGold text-sm">Tydzień</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 text-accent"
                >
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline>
                  <polyline points="16 7 22 7 22 13"></polyline>
                </svg>
              </div>
              <p class="text-3xl font-bold text-primaryGold">{{ beerStats.week }}</p>
              <p class="text-xs text-gray-400 mt-1">piw</p>
            </div>

            <div
              class="bg-secondaryGreen/50 backdrop-blur-sm border border-neutral-700 rounded-2xl p-6"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="text-secondaryGold text-sm">Miesiąc</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5 text-accent"
                >
                  <path d="M8 2v4"></path>
                  <path d="M16 2v4"></path>
                  <rect width="18" height="18" x="3" y="4" rx="2"></rect>
                  <path d="M3 10h18"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-primaryGold">{{ beerStats.month }}</p>
              <p class="text-xs text-gray-400 mt-1">piw</p>
            </div>

            <div class="rounded-2xl p-6 border border-primaryOrange">
              <div class="flex items-center justify-between mb-2">
                <span class="text-white/80 text-sm">Łącznie</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C8A654"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-5 h-5"
                >
                  <path d="M17 11h1a3 3 0 0 1 0 6h-1"></path>
                  <path d="M9 12v6"></path>
                  <path d="M13 12v6"></path>
                  <path
                    d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z"
                  ></path>
                  <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8"></path>
                </svg>
              </div>
              <p class="text-3xl font-bold text-white">{{ beerStats.total }}</p>
              <p class="text-xs text-white/80 mt-1">piw</p>
            </div>
          </div>

          <div
            class="bg-secondaryGreen/50 backdrop-blur-sm border border-neutral-700 rounded-2xl animate-slide-up"
          >
            <div class="p-6 border-b border-neutral-700">
              <h2 class="font-serif text-xl">Historia</h2>
            </div>
            <div class="p-6 space-y-3">
              <div>
                <div class="flex gap-2 mb-4">
                  <button
                    :class="[
                      'px-4 py-2 rounded-t-lg font-semibold transition-all duration-200',
                      activeTab === 'all'
                        ? 'bg-primaryOrange text-white'
                        : 'bg-secondaryGreen/30 text-white/70 hover:bg-secondaryGreen/60',
                    ]"
                    @click="activeTab = 'all'"
                  >
                    Wszystkie
                  </button>
                  <button
                    :class="[
                      'px-4 py-2 rounded-t-lg font-semibold transition-all duration-200',
                      activeTab === 'week'
                        ? 'bg-primaryOrange text-white'
                        : 'bg-secondaryGreen/30 text-white/70 hover:bg-secondaryGreen/60',
                    ]"
                    @click="activeTab = 'week'"
                  >
                    Tydzień
                  </button>
                  <button
                    :class="[
                      'px-4 py-2 rounded-t-lg font-semibold transition-all duration-200',
                      activeTab === 'month'
                        ? 'bg-primaryOrange text-white'
                        : 'bg-secondaryGreen/30 text-white/70 hover:bg-secondaryGreen/60',
                    ]"
                    @click="activeTab = 'month'"
                  >
                    Miesiąc
                  </button>
                </div>
                <div>
                  <div v-if="filteredBeers.length === 0">Musisz wybrać się na piwko 🍺</div>
                  <div v-if="activeTab === 'all'">
                    <BeerHistory v-for="beer in filteredBeers" :key="beer.id" v-bind="beer" />
                  </div>
                  <div v-else-if="activeTab === 'week'">
                    <BeerHistory v-for="beer in filteredBeers" :key="beer.id" v-bind="beer" />
                  </div>
                  <div v-else-if="activeTab === 'month'">
                    <BeerHistory v-for="beer in filteredBeers" :key="beer.id" v-bind="beer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import axios from '@/api/api.js'
import BeerHistory from '@/components/BeerHistory.vue'
import { ref, onMounted, computed } from 'vue'
import { useNotifications } from '@/composables/useNotifications'

const { addNotification } = useNotifications()
const beerAmount = ref('')
const beerType = ref('')
const beerPlace = ref('')
const activeTab = ref('all')
const showModal = ref(false)

const addBeer = async () => {
  try {
    const token = localStorage.getItem('token')
    await axios.post(
      '/beers',
      {
        amount: beerAmount.value,
        type: beerType.value,
        place: beerPlace.value,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    addNotification('beer_added', 'Dodałeś nowe piwo 🍺')

    // Zamknij modal i wyczyść formularz
    showModal.value = false
    beerAmount.value = ''
    beerType.value = ''
    beerPlace.value = ''

    // Odśwież dane bez przeładowania strony
    await fetchBeers()
  } catch (err) {
    console.error(err)
  }
}

//Funkcja do liczenia piwka

const beerStats = computed(() => {
  const now = new Date()
  const today = now.getDate()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(now.getDate() - 7)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(now.getDate() - 30)

  let todayCount = 0
  let weekCount = 0
  let monthCount = 0
  let totalCount = 0

  beers.value.forEach((beer) => {
    const date = new Date(beer.createdAt)
    const amount = beer.amount || 0

    totalCount += amount

    // Dziś
    if (
      date.getFullYear() === now.getFullYear() &&
      date.getMonth() === now.getMonth() &&
      date.getDate() === today
    ) {
      todayCount += amount
    }

    // Ostatnie 7 dni (łącznie z dzisiaj)
    if (date >= sevenDaysAgo && date <= now) {
      weekCount += amount
    }

    // Ostatnie 30 dni (łącznie z dzisiaj)
    if (date >= thirtyDaysAgo && date <= now) {
      monthCount += amount
    }
  })

  return {
    today: todayCount,
    week: weekCount,
    month: monthCount,
    total: totalCount,
  }
})

//Funkcja do pobierania wszystkich piw i wyswietlania ich w historii

const beers = ref([])

const fetchBeers = async () => {
  try {
    const token = localStorage.getItem('token')
    const { data } = await axios.get('/beers', {
      headers: { Authorization: `Bearer ${token}` },
    })
    beers.value = data
  } catch (err) {
    console.error(err)
  }
}

onMounted(fetchBeers)

const filteredBeers = computed(() => {
  const now = new Date()
  const sevenDaysAgo = new Date()
  sevenDaysAgo.setDate(now.getDate() - 7)
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(now.getDate() - 30)

  return beers.value.filter((beer) => {
    const date = new Date(beer.createdAt)

    if (activeTab.value === 'week') {
      return date >= sevenDaysAgo && date <= now
    }

    if (activeTab.value === 'month') {
      return date >= thirtyDaysAgo && date <= now
    }

    return true // all
  })
})
</script>
