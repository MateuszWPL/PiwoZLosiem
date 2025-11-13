<template>
  <div class="xl:flex bg-gradient-to-b pt-20 xl:pt-0 from-primaryGreen/0 to-primaryGreen/50 h-dvh">
    <Navbar />
    <div class="px-5 xl:w-full">
      <div class="max-w-screen-xl mx-auto">
        <div>
          <h3 class="text-white text-[30px] tracking-[-0.75px] mt-10">
            Cześć, <span class="text-primaryOrange">{{ user.firstName || "Piwosz"}}</span
            ><span class="text-primaryOrange">!</span>
          </h3>
          <p class="text-secondaryGold text-sm leading-5 mt-1 mb-6">Gotowy na piwo ?</p>
        </div>
        <div class="xl:grid xl:grid-cols-2 xl:gap-10">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center gap-4 bg-tertiaryGreen/50 rounded-[10px] p-6">
              <p>Twój status</p>
              <div class="flex items-center gap-2">
                <div class="py-2 px-4 bg-primaryOrange rounded-full w-fit">
                  <p class="text-white"> {{ statusLabel }}</p>
                </div>
                <button class="text-white bg-primaryGreen py-2 px-3 rounded-full" @click="isStatusPopupVisible = true">Zmień</button>
              </div>
              <ChangeStatusPopup 
                :visible="isStatusPopupVisible" 
                :statuses="statuses" 
                :current-status="statusLabel"
                @close="isStatusPopupVisible = false" 
                @select="updateStatus"
              />
            </div>
            <div class="grid template-columns-1 gap-6 md:grid-cols-3">
              <div
                class="flex flex-col gap-2 items-center mx-auto w-full rounded-[10px] bg-tertiaryGreen/50 p-4 md:max-w-none"
              >
                <SvgIcon name="beer" style="color: #D35226"/>
                <p class="text-white text-2xl">{{ beerStats.total }}</p>
                <p>Piwa</p>
              </div>
              <div
                class="flex flex-col gap-2 items-center mx-auto w-full rounded-[10px] bg-tertiaryGreen/50 p-4 md:max-w-none"
              >
                <SvgIcon name="friends" style="color:#C8A654; width: 36px; height: 32px;"/>
                <p class="text-white text-2xl">{{ friendsCount }}</p>
                <p>Znajomi</p>
              </div>
              <div
                class="flex flex-col gap-2 items-center mx-auto w-full rounded-[10px] bg-tertiaryGreen/50 p-4 md:max-w-none"
              >
                <SvgIcon name="ranking" style="color:#C8A654; width: 36px; height: 32px;"/>
                <p class="text-white text-2xl">{{ userRanking }}</p>
                <p>Ranking</p>
              </div>
            </div>
          </div>
          <div>
            <h4
              class="text-white text-[24px] tracking-[-0.6px] font-semibold mt-10 xl:mt-0 xl:w-full"
            >
              Szybkie akcje
            </h4>
            <div class="flex flex-col gap-6 mt-8">
              <router-link to="/odkrywaj">
                  <button
                    class="bg-primaryOrange text-white flex items-center gap-3 rounded-[10px] p-4 w-full shadow-md shadow-primaryOrange/50 hover:shadow-primaryOrange/70 transition duration-300"
                  >
                    <SvgIcon name="localization" class="w-6 h-6" style="color: white;"/>
                    <p class="text-white font-semibold">Zaproś ludzi w pobliżu</p>
                  </button>
              </router-link>

              <router-link to="/ranking">
                <button
                  class="bg-primaryGold text-white flex items-center gap-3 rounded-[10px] p-4 w-full shadow-md shadow-primaryGold hover:shadow-primaryGold/70 transition duration-300"
                >
                  <SvgIcon name="ranking" style="width: 24px; height: 24px; color: black; stroke-width: 3;"/>
                  <p class="text-black font-semibold">Zobacz rankingi</p>
                </button>
              </router-link>

              <router-link to="/profil">
                <button
                  class="bg-primaryGreen text-white flex items-center gap-3 rounded-[10px] p-4 w-full shadow-md shadow-primaryGreen hover:shadow-primaryGreen/70 transition duration-300"
                >
                  <SvgIcon name="friends" style="width: 24px; height: 24px; color: white; stroke-width: 3;"/>
                  <p class="text-white font-semibold">Sprawdź odznaki</p>
                </button>
              </router-link>
            </div>
          </div>
        </div>
        <!-- <div class="bg-tertiaryGreen/50 rounded-[10px] p-5 w-full shadow-md shadow-black/20 mt-10">
          <h4 class="text-white text-[24px] tracking-[-0.6px] font-semibold">Ostatnia aktywność</h4>
          <div class="mt-6 flex flex-col gap-6">
            <div class="flex items-center gap-4 border-b border-b-secondaryGold/20 pb-4">
              <div class="bg-primaryOrange/50 p-3 rounded-full">
                <SvgIcon name="beer" style="color: #D35226; width: 24px; height: 25px; stroke-width: 3;"/>
              </div>
              <div class="flex flex-col">
                <p class="text-white font-semibold">Michał wypił piwo z Janem</p>
                <p class="text-secondaryGold text-sm mt-1">2 godziny temu</p>
              </div>
            </div>
            <div class="flex items-center gap-4 border-b border-b-secondaryGold/20 pb-4">
              <div class="bg-primaryOrange/50 p-3 rounded-full">
                <SvgIcon name="beer" style="color: #D35226; width: 24px; height: 25px; stroke-width: 3;"/>
              </div>
              <div class="flex flex-col">
                <p class="text-white font-semibold">Michał wypił piwo z Janem</p>
                <p class="text-secondaryGold text-sm mt-1">2 godziny temu</p>
              </div>
            </div>
            <div class="flex items-center gap-4 border-b border-b-secondaryGold/20 pb-4">
              <div class="bg-primaryOrange/50 p-3 rounded-full">
                <SvgIcon name="beer" style="color: #D35226; width: 24px; height: 25px; stroke-width: 3;"/>
              </div>
              <div class="flex flex-col">
                <p class="text-white font-semibold">Michał wypił piwo z Janem</p>
                <p class="text-secondaryGold text-sm mt-1">2 godziny temu</p>
              </div>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'
import axios from '@/api/api.js'
import { useNotifications } from '@/composables/useNotifications'
import StatusPopup from '@/components/ChangeStatusPopup.vue'
import ChangeStatusPopup from '@/components/ChangeStatusPopup.vue'
import { statuses } from '../../../shared/statuses.js'
import SvgIcon from '@/components/svgIcons/SvgIcon.vue'
import { userRanking, fetchUserRanking } from '@/composables/fetchUserRanking.js'
import { user, fetchUserData } from '@/composables/fetchUserData'
import { beerStats, fetchBeerStats } from '@/composables/fetchBeerStats'
import { friendsCount, fetchFriendsCount } from '@/composables/fetchFriendsCount'
import { useSocket } from '@/composables/socketService.js';

const { addNotification } = useNotifications()
const status = ref('')
const firstName = ref('')
const lastName = ref('')
const isStatusPopupVisible = ref(false)
const token = localStorage.getItem('token')
const { socket, userStatus, initializeSocket } = useSocket()

const statusLabel = computed(() => {
  const current = statuses.find(s => s.value === status.value)
  return current ? current.label : 'Nie ustawiono statusu'
})

const updateStatus = async (newStatusValue) => {
  isStatusPopupVisible.value = false 

  const token = localStorage.getItem('token')
  try {
    const { data } = await axios.post(
      '/users/status',
      { status: newStatusValue }, 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    status.value = data.status
    addNotification('status_changed', `Status zaktualizowany na ${statusLabel.value}`)
  } catch (err) {
    console.error('Błąd podczas aktualizacji statusu:', err)
  }
}

onMounted(async () => {
  initializeSocket(token);

  await Promise.all([
    fetchUserData(),
    fetchBeerStats(),
    fetchUserRanking('all'),
    fetchFriendsCount()
  ])

  // await fetchUserData()
  // await fetchBeerStats()
  // await fetchUserRanking(user, userRanking, 'all')
  // await fetchFriendsCount()

  watch(userStatus, (newStatus) => {
  if (newStatus) {
    status.value = newStatus;
  }
}, { immediate: true });
})
</script>
