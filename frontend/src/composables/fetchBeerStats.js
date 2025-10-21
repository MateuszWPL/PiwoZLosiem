import { ref } from 'vue'
import axios from '@/api/api.js'

export const beerStats = ref({
  today: 0,
  week: 0,
  month: 0,
  total: 0
})

export const fetchBeerStats = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return

    const res = await axios.get('http://localhost:5000/api/beers/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })

    beerStats.value = res.data
  } catch (err) {
    console.error('Błąd przy pobieraniu statystyk piw:', err)
  }
}
