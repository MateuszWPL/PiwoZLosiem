import { ref } from 'vue'
import axios from 'axios'

export const friendsCount = ref(0)

const createAxiosInstance = () => {
  const token = localStorage.getItem('token')
  return axios.create({
    baseURL: 'http://localhost:5000/api/friends',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const fetchFriendsCount = async () => {
  try {
    const axiosInstance = createAxiosInstance()
    const res = await axiosInstance.get('/count')

    friendsCount.value = res.data.count
    return friendsCount.value
  } catch (err) {
    console.error('Błąd pobierania liczby znajomych:', err)
    return 0
  }
}