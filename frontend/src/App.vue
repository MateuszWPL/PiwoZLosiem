<script setup>
import { RouterView } from 'vue-router'
import { onMounted, onUnmounted, watch } from 'vue'
import { useLocationStore } from '@/stores/locationStore'
import axios from '@/api/api.js'


const locationStore = useLocationStore()

const initializeApp = async () => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    console.log('Brak tokena - użytkownik nie jest zalogowany')
    return
  }

  try {
    const res = await axios.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })
    
    const userData = res.data
    locationStore.setUserData({
      _id: userData._id,
      firstName: userData.firstName,
      lastName: userData.lastName,
      age: userData.age,
      name: `${userData.firstName} ${userData.lastName}`
    })
    locationStore.setStatus(userData.status)

    if (!locationStore.isSocketConnected) {
      console.log("nicjalizuję Socket.io...")
      locationStore.initializeSocket(token)
    } else {
      console.log("Socket.io już jest połączony")
    }
    
    locationStore.startLocationTracking()

  } catch (error) {
    console.error('Błąd inicjalizacji aplikacji:', error)
    
    if (error.response?.status === 401) {
      console.log('Token wygasł lub jest nieprawidłowy')
      localStorage.removeItem('token')
    }
  }
}

watch(() => localStorage.getItem('token'), (newToken, oldToken) => {
  if (newToken && !oldToken) {
    console.log('Wykryto nowy token, inicjalizuję aplikację...')
    initializeApp()
  } else if (!newToken && oldToken) {
    console.log('Wylogowanie - czyszczenie zasobów...')
    locationStore.stopLocationTracking()
    locationStore.disconnectSocket()
    locationStore.setUserData(null)
  }
})

onMounted(() => {
  const token = localStorage.getItem('token')
  if (token) {
    console.log('Znaleziono token, inicjalizuję aplikację...')
    initializeApp()
  } else {
    console.log('Brak tokena - użytkownik nie jest zalogowany')
  }
})

onUnmounted(() => {
  locationStore.stopLocationTracking()
  locationStore.disconnectSocket()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
