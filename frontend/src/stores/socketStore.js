import { defineStore } from 'pinia'
import { io } from 'socket.io-client'
import { ref } from 'vue'

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: null,
    onlineUsers: [],
    userData: null,
    watchingId: null, 
    currentUserPosition: ref(null),
  }),

  actions: {
    initializeSocket(token, userData) {
      if (this.socket) return

      const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"
      this.socket = io(URL, { auth: { token } })
      this.userData = userData

      this.socket.on("connect", () => {
        console.log("Połączono z Socket.IO:", this.socket.id)
        this.startTrackingLocation()
      })

      this.socket.on("disconnect", () => {
        console.log("Rozłączono z Socket.IO")
        this.stopTrackingLocation()
      })

      this.socket.on("updateUserList", (users) => {
        this.onlineUsers = users
      })
    },

    sendLocation(lat, lng) {
      if (!this.socket || !this.userData?._id) return

      this.socket.emit("updateLocation", {
        userId: this.userData._id,
        lat,
        lng,
        firstName: this.userData.firstName,
        lastName: this.userData.lastName,
        age: this.userData.age,
        status: this.userData.status,
      })
    },

    startTrackingLocation() {
      if (!navigator.geolocation) {
        console.warn("Geolokalizacja niedostępna.")
        return
      }

      if (this.watchingId) {
        console.log("Śledzenie już aktywne")
        return
      }

      this.watchingId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          this.currentUserPosition.value = { lat: latitude, lng: longitude }
          console.log(`Aktualna lokalizacja: ${latitude}, ${longitude}`)
          this.sendLocation(latitude, longitude)
        },
        (error) => {
          console.error("Błąd geolokalizacji:", error)
        },
        { enableHighAccuracy: true, maximumAge: 0, timeout: 5000 }
      )
    },

    stopTrackingLocation() {
      if (this.watchingId) {
        navigator.geolocation.clearWatch(this.watchingId)
        this.watchingId = null
      }
    },

    disconnect() {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
      }
      this.stopTrackingLocation()
    }
  }
})
