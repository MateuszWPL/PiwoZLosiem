<template>
  <div class="xl:flex bg-gradient-to-b from-primaryGreen/0 to-primaryGreen/50 min-h-screen">
    <Navbar />

    <div class="px-5 xl:flex-1">
      <div class="max-w-screen-xl mx-auto flex flex-col items-center pt-24 xl:pt-10">
        <SvgIcon name="friends" class="text-primaryGold w-12 h-12" />

        <h1 class="text-[32px] font-semibold text-white leading-normal">Znajomi</h1>
        <p class="text-xs font-semibold text-secondaryGold leading-normal">Znajdź kompanów do picia</p>

        <div class="flex gap-1 mt-5 mb-5">
          <button v-for="(tab, index) in tabs" :key="index" @click="selectedTab = index" :class="[
            'px-4 py-2 rounded-[10px] border font-semibold transition-colors text-xs backdrop-blur-sm',
            selectedTab === index
              ? 'bg-primaryOrange/70 text-white border-primaryOrange shadow-[0_0_10px_#F57C00]'
              : 'bg-white/10 text-white border-green-500/70 hover:bg-green-700/20 active:bg-primaryOrange/40'
          ]">
            {{ getTabName(tab, index) }}
          </button>
        </div>

        <div v-if="selectedTab === 1" class="flex gap-1 mb-5">
          <button v-for="(subTab, index) in subTabs" :key="index" @click="selectedSubTab = index" :class="[
            'px-4 py-2 rounded-[10px] border font-semibold transition-colors text-xs backdrop-blur-sm',
            selectedSubTab === index
              ? 'bg-primaryOrange/50 text-white border-primaryOrange'
              : 'bg-white/5 text-white border-green-500/50 hover:bg-green-700/20'
          ]">
            {{ subTab }}
          </button>
        </div>

        <div class="w-full max-w-screen-xl flex flex-col gap-4">

          <!-- Znajomi -->
          <div v-if="selectedTab === 0" class="flex flex-col gap-4">
            <div v-for="friend in friends" :key="friend.id"
              class="bg-tertiaryGreen border border-primaryGreen p-4 rounded-2xl shadow-md text-white flex justify-between items-start">

              <div class="flex items-center gap-4">
                <img :src="friend.photo ? `https://piwozlosiem-backend.onrender.com${friend.photo}` : '/images/defaultAvatar.png'" class="w-12 h-12 rounded-full object-cover"/>
                <div class="flex flex-col">
                  <h3 class="font-semibold">{{ friend.name }}</h3>
                  <div class="flex items-center gap-1">
                      <SvgIcon name="localization" class="text-secondaryGold w-4 h-4" />
                      <p class="text-sm text-secondaryGold">{{ friend.location || 'Brak lokalizacji' }}</p>
                    </div>
                  <span class="mt-2 inline-block px-1.5 py-1 text-xs bg-primaryOrange rounded-full whitespace-nowrap w-fit">{{ getStatusLabel(friend.status) }}</span>
                </div>
              </div>

              <div class="flex flex-col gap-2 ml-4">
                <button class="bg-blue-500 px-3 py-1 rounded-lg hover:bg-blue-600 transition flex items-center gap-1"> <SvgIcon name="chat" class="w-4 h-4" /> Wiadomość</button>
                <button @click="removeFriend(friend.id)"
                  class="bg-primaryOrange px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center gap-1"> <SvgIcon name="cancell" class="w-4 h-4" /> Usuń</button>
              </div>
            </div>
            
            <p v-if="friends.length === 0" class="text-white/70 text-center mt-4">Brak znajomych</p>
          </div>

          <!-- Zaproszenia -->
          <div v-if="selectedTab === 1" class="flex flex-col gap-4">
            <!-- Otrzymane zaproszenia -->
            <div v-if="selectedSubTab === 0" class="flex flex-col gap-4">
              <h3 class="text-white font-semibold text-lg">Otrzymane zaproszenia</h3>
              <div v-for="request in receivedRequests" :key="request.requestId"
                class="bg-tertiaryGreen border border-primaryGreen p-4 rounded-2xl shadow-md text-white flex justify-between items-center">

                <div class="flex items-center gap-4">
                  <img :src="request.photo ? `https://piwozlosiem-backend.onrender.com${request.photo}` : '/images/defaultAvatar.png'" class="w-12 h-12 rounded-full object-cover"/>
                  <div class="flex flex-col gap-1">
                    <h3 class="font-semibold">{{ request.name }}</h3>
                    <div class="flex items-center gap-1">
                      <SvgIcon name="localization" class="text-secondaryGold w-4 h-4" />
                      <p class="text-sm text-secondaryGold">{{ request.location || 'Brak lokalizacji' }}</p>
                    </div>
                    <span class="mt-2 inline-block px-1.5 py-1 text-xs bg-primaryOrange rounded-full whitespace-nowrap w-fit">{{ getStatusLabel(request.status) }}</span>
                    <p class="text-xs text-gray-300 mt-1">Chce zostać Twoim znajomym</p>
                  </div>
                </div>

                <div class="flex flex-col gap-2 ml-4">
                  <button @click="acceptRequest(request.requestId)"
                    class="bg-primaryOrange px-3 py-1 rounded-lg hover:bg-orange-700 transition">Akceptuj</button>
                  <button @click="rejectRequest(request.requestId)"
                    class="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition">Odrzuć</button>
                </div>
              </div>
              
              <p v-if="receivedRequests.length === 0" class="text-white/70 text-center mt-4">Brak otrzymanych zaproszeń</p>
            </div>

            <!-- Wysłane zaproszenia -->
            <div v-if="selectedSubTab === 1" class="flex flex-col gap-4">
              <h3 class="text-white font-semibold text-lg">Wysłane zaproszenia</h3>
              <div v-for="request in sentRequests" :key="request.requestId"
                class="bg-tertiaryGreen border border-primaryGreen p-4 rounded-2xl shadow-md text-white flex justify-between items-center">

                <div class="flex items-center gap-4">
                  <img :src="request.photo ? `https://piwozlosiem-backend.onrender.com${request.photo}` : '/images/defaultAvatar.png'" class="w-12 h-12 rounded-full object-cover" />
                  <div class="flex flex-col">
                    <h3 class="font-semibold">{{ request.name }}</h3>
                    <div class="flex items-center gap-1">
                      <SvgIcon name="localization" class="text-secondaryGold w-4 h-4" />
                      <p class="text-sm text-secondaryGold">{{ request.location || 'Brak lokalizacji' }}</p>
                    </div>
                    <span class="mt-2 inline-block px-1.5 py-1 text-xs bg-primaryOrange rounded-full whitespace-nowrap w-fit">{{ getStatusLabel(request.status) }}</span>
                    <p class="text-xs text-gray-400 mt-1">Wysłano: {{ formatDate(request.createdAt) }}</p>
                  </div>
                </div>

                <div class="flex flex-col gap-2 ml-4">
                  <button @click="cancelRequest(request.requestId)"
                    class="bg-red-500 px-3 py-1 rounded-lg hover:bg-red-600 transition">Anuluj zaproszenie</button>
                </div>
              </div>
              
              <p v-if="sentRequests.length === 0" class="text-white/70 text-center mt-4">Brak wysłanych zaproszeń</p>
            </div>
          </div>

          <!-- Znajdź nowych znajomych -->
          <div v-if="selectedTab === 2" class="flex flex-col gap-4 w-full">
            <div class="search-bar flex items-center bg-tertiaryGreen/50 rounded-[10px] p-3 shadow-md shadow-black/20">
              <svg class="w-6 h-6 text-secondaryGold/80 flex-shrink-0 mr-3" fill="none" stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input type="text" placeholder="Szukaj użytkownika lub statusu..." v-model="searchQuery"
                class="w-full bg-transparent text-white placeholder-secondaryGold/50 focus:outline-none" />
            </div>

            <!-- Lista użytkowników -->
            <div class="flex flex-col gap-4 mt-2">
              <div v-for="user in filteredUsers" :key="user.id"
                class="bg-tertiaryGreen border border-primaryGreen p-4 rounded-2xl shadow-md text-white flex justify-between items-center">

                <div class="flex items-center gap-4">
                  <img :src="user.photo ? `https://piwozlosiem-backend.onrender.com/${user.photo}` : '/images/defaultAvatar.png'" class="w-12 h-12 rounded-full object-cover"/>
                  <div class="flex flex-col">
                    <h3 class="font-semibold">{{ user.name }}</h3>
                    <div class="flex items-center gap-1">
                      <SvgIcon name="localization" class="text-secondaryGold w-4 h-4" />
                      <p class="text-sm text-secondaryGold">{{ user.location || 'Brak lokalizacji' }}</p>
                    </div>
                    <span class="mt-2 inline-block px-1.5 py-1 text-xs bg-primaryOrange rounded-full whitespace-nowrap w-fit">{{ getStatusLabel(user.status) }}</span>
                  </div>
                </div>

                <div class="ml-4 flex items-center">
                  <button @click="sendRequest(user.id)"
                    class="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600 transition">Dodaj</button>
                </div>
              </div>

              <p v-if="filteredUsers.length === 0" class="text-white/70 text-center mt-4">Brak wyników</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Navbar from '@/components/Navbar.vue'
import axios from '@/api/api.js'
import SvgIcon from '@/components/svgIcons/SvgIcon.vue'
import { statuses } from '../../../shared/statuses'
import { useNotifications } from '@/composables/useNotifications'
const { addNotification } = useNotifications()

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/friends`,
  headers: {
    Authorization: `Bearer ${token}`
  }
})


const tabs = ['Znajomi', 'Zaproszenia', 'Znajdź']
const selectedTab = ref(0)

const subTabs = ['Otrzymane', 'Wysłane']
const selectedSubTab = ref(0)

const friends = ref([])
const receivedRequests = ref([])
const sentRequests = ref([])
const allUsers = ref([])
const searchQuery = ref('')

const incomingRequestsCount = computed(() => receivedRequests.value.length)

const getTabName = (tabName, index) => {
  if (index === 1 && incomingRequestsCount.value > 0) {
    return `${tabName} (${incomingRequestsCount.value})`
  }
  return tabName
}

const getStatusLabel = (statusValue) => {
  const status = statuses.find(s => s.value === statusValue);
  return status ? status.label : statusValue
}

const filteredUsers = computed(() => {
  if (!searchQuery.value) return allUsers.value
  return allUsers.value.filter(user =>
    user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    user.status.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

const fetchData = async () => {
  try {
    const [friendsRes, requestsRes, usersRes] = await Promise.all([
      axiosInstance.get('/'),
      axiosInstance.get('/requests'),
      axiosInstance.get('/all')
    ]);

    console.log('Wszystkie dane zaproszeń:', requestsRes.data)

    friends.value = friendsRes.data
    receivedRequests.value = requestsRes.data.received || []
    sentRequests.value = requestsRes.data.sent || []
    allUsers.value = usersRes.data
  } catch (err) {
    console.error('Błąd pobierania danych:', err.response?.data || err.message)
  }
}

const removeFriend = async (id) => {
  try {
    await axiosInstance.delete(`/${id}`)
    friends.value = friends.value.filter(f => f.id !== id)
  } catch (err) { console.error(err) }
}

const acceptRequest = async (requestId) => {
  try {
    const userName = receivedRequests.value.find(r => r.requestId === requestId)?.name || 'Użytkownik'
    await axiosInstance.post(`/requests/${requestId}/accept`)
    receivedRequests.value = receivedRequests.value.filter(r => r.requestId !== requestId)
    addNotification('request_accepted', `Zaakceptowałeś zaproszenie od ${userName} 🍻`)
    await fetchData()
  } catch (err) { console.error(err) }
}

const rejectRequest = async (requestId) => {
  try {
    await axiosInstance.post(`/requests/${requestId}/reject`)
    receivedRequests.value = receivedRequests.value.filter(r => r.requestId !== requestId)
  } catch (err) { console.error(err) }
}

const cancelRequest = async (requestId) => {
  try {
    await axiosInstance.post(`/requests/${requestId}/reject`)``
    sentRequests.value = sentRequests.value.filter(r => r.requestId !== requestId)
  } catch (err) { console.error(err) }
}

const sendRequest = async (userId) => {
  try {
    const invitedUser = allUsers.value.find(u => u.id === userId)
    const userName = invitedUser ? invitedUser.name : 'Użytkownik'

    await axiosInstance.post(`/${userId}`)
    allUsers.value = allUsers.value.filter(u => u.id !== userId)

    addNotification('invite_sent', `Wysłałeś zaproszenie do ${userName} 🍻`)
    await fetchData()
  } catch (err) { console.error(err) }
}

onMounted(() => {
  fetchData()
})
</script>