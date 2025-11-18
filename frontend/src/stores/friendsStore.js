import { defineStore } from 'pinia'
import axios from '@/api/api.js'

export const useFriendsStore = defineStore('friends', {
  state: () => ({
    friends: [],
    receivedRequests: [],
    sentRequests: [],
    allUsers: [],
    incomingRequestsCount: 0,
  }),

  actions: {
    async fetchData() {
      const token = localStorage.getItem('token')

      try {
        const [friendsRes, requestsRes, usersRes] = await Promise.all([
            axios.get('/friends', { headers: { Authorization: `Bearer ${token}` } }),
            axios.get('/friends/requests', { headers: { Authorization: `Bearer ${token}` } }),
            axios.get('/friends/all', { headers: { Authorization: `Bearer ${token}` } })
        ])

        this.friends = friendsRes.data
        this.receivedRequests = requestsRes.data.received || []
        this.sentRequests = requestsRes.data.sent || []
        this.allUsers = usersRes.data || []
        this.incomingRequestsCount = this.receivedRequests.length
      } catch (err) {
        console.error('Błąd pobierania danych znajomych:', err)
      }
    },

    async fetchIncomingRequestsCount() {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/friends/requests/count', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.incomingRequestsCount = res.data.receivedRequestsCount || 0;
      } catch (err) {
        console.error('Błąd pobierania liczby zaproszeń:', err);
      }
    }
  }
})
