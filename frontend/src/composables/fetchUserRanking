import { ref } from 'vue'
import axios from 'axios'

export const userRanking = ref('#0')

export const fetchUserRanking = async (period = 'all') => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.warn('Brak tokena – użytkownik niezalogowany.')
      return
    }

    const res = await axios.get(
      `http://localhost:5000/api/ranking/${period}/current-user`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )

    //console.log('fetchUserRanking endpoint:', res.data)
    userRanking.value = `#${res.data.rank || 0}`
  } catch (err) {
    console.error('Błąd przy pobieraniu rankingu:', err)
  }
}
