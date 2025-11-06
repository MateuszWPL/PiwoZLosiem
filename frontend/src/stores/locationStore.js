import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { io } from 'socket.io-client'

export const useLocationStore = defineStore('location', () => {
  const currentUserPosition = ref(null)
  const geolocationError = ref(false)
  const onlineUsers = ref([])
  const socket = ref(null)
  const user = ref(null)
  const status = ref('')
  
  let locationUpdateTimer = null
  let watchId = null

  const isSocketConnected = computed(() => {
    return socket.value && socket.value.connected
  })

  const initializeSocket = (token) => {
    if (isSocketConnected.value) {
      console.log("Socket już jest połączony, używam istniejącego")
      return socket.value
    }

    if (socket.value) {
      console.log("Socket istnieje ale jest rozłączony, rozłączam przed stworzeniem nowego")
      socket.value.disconnect()
      socket.value = null
    }

    const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"
    console.log("Tworzenie nowego połączenia Socket.io...")
    
    const newSocket = io(VITE_SOCKET_URL, {
      auth: { token },
      transports: ['websocket', 'polling']
    })
    
    newSocket.on("connect", () => {
      console.log("Połączono z Socket.IO:", newSocket.id)
    })
    
    newSocket.on("disconnect", (reason) => {
      console.log("Rozłączono z Socket.IO, powód:", reason)
    })

    newSocket.on("connect_error", (error) => {
      console.error("Błąd połączenia Socket.IO:", error.message)
    })
    
    newSocket.on('updateUserList', (users) => {
      console.log("Odebrano listę użytkowników:", users.length)
      onlineUsers.value = users
    })

    newSocket.on('error', (error) => {
      console.error("Błąd Socket.IO:", error)
    })
    
    socket.value = newSocket
    return newSocket
  }

  const startLocationTracking = (userData) => {
    if (userData) {
      user.value = userData
    }

    if (!user.value || !user.value._id) {
      console.error("startLocationTracking: Brak danych użytkownika!")
      return
    }

    if (watchId) {
      console.log("Już śledzę lokalizację, restartuję...")
      navigator.geolocation.clearWatch(watchId)
      watchId = null
    }

    if (navigator.geolocation) {
      console.log("Rozpoczynam śledzenie lokalizacji dla:", user.value.firstName)

      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          console.log(`Nowa lokalizacja ${user.value.firstName}: ${latitude}, ${longitude}`)
          currentUserPosition.value = { lat: latitude, lng: longitude }
          geolocationError.value = false

          if (user.value && user.value._id && isSocketConnected.value) {
            if (locationUpdateTimer) {
              clearTimeout(locationUpdateTimer)
            }

            locationUpdateTimer = setTimeout(() => {
              console.log(`Wysyłam lokalizację ${user.value.firstName}: ${latitude}, ${longitude}`)
              socket.value.emit('updateLocation', {
                userId: user.value._id,
                lat: latitude,
                lng: longitude,
                name: user.value.firstName?.charAt(0).toUpperCase() || 'U',
                firstName: user.value.firstName,
                lastName: user.value.lastName,
                age: user.value.age,
                status: status.value,
              })
            }, 3000)
          } else {
            console.warn("Nie mogę wysłać lokalizacji - brak userId lub socket niepołączony")
          }
        },
        (error) => {
          console.error("Błąd geolokalizacji:", error)
          console.error("Kod błędu:", error.code)
          console.error("Wiadomość:", error.message)
          
          switch(error.code) {
            case error.PERMISSION_DENIED:
              console.error("Użytkownik odmówił dostępu do lokalizacji")
              break;
            case error.POSITION_UNAVAILABLE:
              console.error("Informacja o lokalizacji jest niedostępna")
              break;
            case error.TIMEOUT:
              console.error("Timeout podczas pobierania lokalizacji")
              break;
            default:
              console.error("Nieznany błąd geolokalizacji")
              break;
          }
          
          geolocationError.value = true
        },
        { 
          enableHighAccuracy: true, 
          maximumAge: 30000,
          timeout: 30000
        }
      )
    } else {
      console.error("Geolokalizacja nie jest wspierana przez przeglądarkę")
      geolocationError.value = true
    }
  }

  const stopLocationTracking = () => {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId)
      watchId = null
      console.log("Zatrzymano śledzenie lokalizacji")
    }
    if (locationUpdateTimer) {
      clearTimeout(locationUpdateTimer)
      locationUpdateTimer = null
    }
  }

  const disconnectSocket = () => {
    if (socket.value) {
      console.log("Rozłączam Socket.io...")
      socket.value.disconnect()
      socket.value = null
    }
  }

  const reconnectSocket = (token) => {
    if (socket.value) {
      disconnectSocket()
    }
    return initializeSocket(token)
  }

  const getSocketStatus = () => {
    if (!socket.value) return 'disconnected'
    return socket.value.connected ? 'connected' : 'disconnected'
  }

  const setUserData = (userData) => {
    user.value = userData
  }

  const setStatus = (newStatus) => {
    status.value = newStatus
  }

  const checkGeolocationPermission = () => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve('not_supported')
        return
      }

      navigator.geolocation.getCurrentPosition(
        () => resolve('granted'),
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            resolve('denied')
          } else {
            resolve('error')
          }
        },
        { timeout: 5000 }
      )
    })
  }

  return {
    currentUserPosition,
    geolocationError,
    onlineUsers,
    socket,
    user,
    status,
    isSocketConnected,
    initializeSocket,
    startLocationTracking,
    stopLocationTracking,
    disconnectSocket,
    reconnectSocket,
    getSocketStatus,
    setUserData,
    setStatus,
    checkGeolocationPermission
  }
})