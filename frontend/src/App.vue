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

    console.log("Dane użytkownika załadowane:", userData.firstName)

    const permission = await locationStore.checkGeolocationPermission()
    console.log('Status uprawnień do lokalizacji:', permission)

    if (permission === 'denied') {
      console.error('Brak uprawnień do lokalizacji')
      return
    }

    if (!locationStore.isSocketConnected) {
      console.log("Inicjalizuję Socket.io z userId:", userData._id)
      locationStore.initializeSocket(token)
    } else {
      console.log("Socket.io już jest połączony")
    }
    
    if (permission === 'granted') {
      console.log("Uruchamiam śledzenie lokalizacji dla:", userData.firstName)
      locationStore.startLocationTracking()
    } else {
      console.log('Oczekiwanie na uprawnienia do lokalizacji...')
    }

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
  console.log('Czyszczenie zasobów aplikacji...')
  locationStore.stopLocationTracking()
  locationStore.disconnectSocket()
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>