import { ref } from 'vue'
import axios from 'axios'

export const user = ref({
  firstName: '',
  lastName: '',
  age: '',
  gender: '',
  location: '',
  bio: '',
  status: '',
  favoriteBeers: [],
  photo: null,
})

export const fetchUserData = async () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) {
      console.warn('Brak tokena – użytkownik niezalogowany.')
      return null
    }

    const res = await apiClient.get('/users/me', {
      headers: { Authorization: `Bearer ${token}` }
    })

    user.value = res.data
    return user.value
  } catch (err) {
    console.error('Błąd pobierania danych użytkownika:', err)
    return null
  }
}
