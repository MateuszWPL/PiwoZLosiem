import { ref } from 'vue'
import axios from '@/api/api.js'

export const friendsCount = ref(0)

export const fetchFriendsCount = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) throw new Error("Brak tokena")

    const res = await axios.get('/friends/count', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    friendsCount.value = res.data.count
    return friendsCount.value
  } catch (err) {
    console.error('Błąd pobierania liczby znajomych:', err)
    return 0
  }
}