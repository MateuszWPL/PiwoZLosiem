import { defineStore } from 'pinia'
import { io } from 'socket.io-client'

export const useSocketStore = defineStore('socket', {
  state: () => ({
    socket: null,
    onlineUsers: []
  }),
  
  actions: {
    initializeSocket(token) {
      if (this.socket && this.socket.connected) {
        console.log("✅ Socket już jest połączony")
        return 
      }
      
      const URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000"
      this.socket = io(URL, { 
        auth: { token },
        closeOnBeforeunload: false
      })

      this.socket.on("connect", () => {
        console.log("✅ Połączono z Socket.IO", this.socket.id)
      })

      this.socket.on("disconnect", () => {
        console.log("❌ Rozłączono z Socket.IO")
      })

      this.socket.on("updateUserList", (users) => {
        this.onlineUsers = users
      })
    },

    sendLocation(userId, lat, lng, userData) {
      if (!this.socket || !this.socket.connected) return
      this.socket.emit('updateLocation', {
        userId,
        lat,
        lng,
        ...userData
      })
    },

    disconnect() {
      if (this.socket) {
        this.socket.disconnect()
        this.socket = null
      }
    }
  }
})