<template>
  <div
    v-if="visible"
    class="fixed inset-0 z-50 bg-black/70 flex items-center justify-center px-4 overflow-x-hidden"
  >
    <div
      class="bg-tertiaryGreen/90 rounded-2xl w-full max-w-lg md:max-w-[720px] shadow-2xl relative text-white backdrop-blur-md overflow-hidden overflow-x-hidden mx-4"
      role="dialog"
      aria-modal="true"
    >
      <div class="flex justify-between items-center px-6 pt-6">
        <h2 class="text-2xl font-bold">Edytuj profil</h2>
        <button
          @click="close"
          class="text-secondaryGold hover:text-primaryOrange transition"
          aria-label="Zamknij"
        >
          ✕
        </button>
      </div>
      <p class="text-sm text-secondaryGold px-6 mt-1 mb-4">
        Zaktualizuj swoje dane osobowe. Kliknij zapisz, aby zatwierdzić zmiany.
      </p>

      <form
        @submit.prevent="saveChanges"
        class="px-4 md:px-6 pb-6 space-y-5 max-h-[75vh] overflow-y-auto custom-scrollbar"
      >
        <!-- Zdjęcie profilowe -->
        <div class="flex flex-col items-center mb-4">
          <div
            class="relative w-24 h-24 flex items-center justify-center rounded-full border-2 border-secondaryGold bg-primaryGreen/20 overflow-hidden"
          >
            <img
              v-if="previewImage || (!!localForm.photo && typeof localForm.photo === 'string' && !isSvg(localForm.photo))"
              :src="previewImage ? previewImage : resolvePhotoUrl(localForm.photo)"
              alt="Profil"
              class="w-full h-full object-cover"
            />
            <div v-else class="w-12 h-12 text-secondaryGold">
              <SvgIcon name="beer" class="w-full h-full" style="color: #D35226"/>
            </div>
          </div>

          <label
            class="text-xs text-secondaryGold mt-2 underline cursor-pointer hover:text-primaryOrange"
          >
            Zmień zdjęcie
            <input
              type="file"
              accept="image/*"
              class="hidden"
              @change="onImageUpload"
            />
          </label>
        </div>

        <!-- Imię i nazwisko + wiek -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm mb-1 text-secondaryGold">Imię i nazwisko</label>
            <input
              v-model="fullName"
              type="text"
              class="w-full bg-primaryGreen/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primaryOrange"
              placeholder="np. Jan Kowalski"
            />
            <p v-if="errors.fullName" class="text-red-400 text-xs mt-1">{{ errors.fullName }}</p>
          </div>
          <div>
            <label class="block text-sm mb-1 text-secondaryGold">Wiek</label>
            <input
              v-model="localForm.age"
              type="number"
              min="18"
              class="w-full bg-primaryGreen/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primaryOrange"
              placeholder="Wiek"
            />
            <p v-if="errors.age" class="text-red-400 text-xs mt-1">{{ errors.age }}</p>
          </div>
        </div>

        <!-- Bio -->
        <div>
          <label class="block text-sm mb-1 text-secondaryGold">Bio</label>
          <textarea
            v-model="localForm.bio"
            rows="3"
            class="w-full bg-primaryGreen/30 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-primaryOrange"
            placeholder="Napisz coś o sobie..."
          ></textarea>
          <p v-if="errors.bio" class="text-red-400 text-xs mt-1">{{ errors.bio }}</p>
        </div>

        <!-- Płeć -->
        <div>
          <label class="block text-sm mb-1 text-secondaryGold">Płeć</label>
          <select
            v-model="localForm.gender"
            class="w-full bg-primaryGreen/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primaryOrange"
          >
            <option value="Kobieta">Kobieta</option>
            <option value="Mężczyzna">Mężczyzna</option>
          </select>
          <p v-if="errors.gender" class="text-red-400 text-xs mt-1">{{ errors.gender }}</p>
        </div>

        <!-- Lokalizacja -->
        <div>
          <label class="block text-sm mb-1 text-secondaryGold">Lokalizacja</label>
          <div class="flex flex-col sm:flex-row sm:items-center sm:gap-2 gap-2">
            <input
              v-model="localForm.location"
              type="text"
              class="flex-1 bg-primaryGreen/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primaryOrange"
              placeholder="Miasto"
            />
            <button
              type="button"
              @click="useCurrentLocationHandler"
              class="text-xs border border-secondaryGold rounded-lg px-2 py-1 hover:bg-secondaryGold/20 transition w-full sm:w-auto"
            >
              Użyj mojej lokalizacji
            </button>
          </div>
          <p v-if="errors.location" class="text-red-400 text-xs mt-1">{{ errors.location }}</p>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-sm mb-2 text-secondaryGold">Status</label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="option in statuses"
              :key="option.value"
              type="button"
              @click="localForm.status = option.value"
              class="px-4 py-2 rounded-lg text-sm font-semibold transition flex-1 sm:flex-none"
              :class="{
                'bg-primaryGreen text-white': localForm.status === option.value,
                'bg-primaryGreen/30 text-secondaryGold hover:bg-primaryGreen/50':
                  localForm.status !== option.value
              }"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- Ulubione Piwa -->
        <div>
          <label class="block text-sm mb-2 text-secondaryGold">Ulubione piwa</label>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <button
              v-for="beer in beers"
              :key="beer"
              type="button"
              @click="toggleBeer(beer)"
              class="px-4 py-2 rounded-lg text-sm font-semibold border transition flex-1 sm:flex-none text-center"
              :class="{
                'bg-primaryOrange text-white border-primaryOrange':
                  localForm.favoriteBeers.includes(beer),
                'bg-transparent text-secondaryGold border-secondaryGold hover:bg-secondaryGold/20':
                  !localForm.favoriteBeers.includes(beer)
              }"
            >
              {{ beer }}
            </button>
          </div>
        </div>

        <!-- Przyciski -->
        <div class="flex flex-col sm:flex-row justify-between pt-4 gap-3">
          <button
            type="button"
            @click="close"
            class="border border-secondaryGold rounded-lg py-2 px-6 text-white hover:bg-secondaryGold/20 transition w-full sm:w-auto"
          >
            Anuluj
          </button>
          <button
            type="submit"
            class="bg-primaryOrange rounded-lg py-2 px-6 font-semibold text-white shadow-md hover:bg-primaryOrange/80 transition w-full sm:w-auto"
          >
            Zapisz zmiany
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed, defineProps, defineEmits, onUnmounted } from 'vue'
import { io } from 'socket.io-client'
import SvgIcon from '@/components/svgIcons/SvgIcon.vue'
import { statuses } from '../../../shared/statuses'
import { useCurrentLocation } from '@/composables/useCurrentLocation'

const socket = io('http://localhost:5000')

const props = defineProps({
  visible: Boolean,
  userData: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['close', 'save'])
const isSvg = (content) => typeof content === 'string' && content.trim().startsWith('<svg')

function resolvePhotoUrl(photo) {
  if (!photo) return ''
  if (photo.startsWith('data:image') || photo.startsWith('<svg')) return photo
  if (photo.startsWith('http')) return photo
  return `http://localhost:5000${photo}`
}

const defaultUser = {
  photo: null,
  firstName: '',
  lastName: '',
  age: '',
  bio: '',
  gender: 'Kobieta',
  location: '',
  status: 'wolny',
  favoriteBeers: []
}

const localForm = reactive({ ...defaultUser })
const errors = reactive({ fullName: '', age: '', bio: '', gender: '', location: '' })
const { getLocation } = useCurrentLocation()

watch(
  () => props.userData,
  (val) => {
    if (!val) return
    for (const key in defaultUser) {
      if (Array.isArray(val[key])) {
        localForm[key] = [...val[key]]
      } else {
        localForm[key] = val[key] ?? defaultUser[key]
      }
    }
  },
  { immediate: true, deep: true }
)

const fullName = computed({
  get: () => `${localForm.firstName} ${localForm.lastName}`.trim(),
  set: (val) => {
    const parts = val.trim().split(/\s+/)
    localForm.firstName = parts.shift() || ''
    localForm.lastName = parts.join(' ') || ''
  }
})

const previewImage = ref(null)
const beers = ['ŻUBR', 'WARKA', 'ŁOMŻA', 'WOJANEK']

const toggleBeer = (beer) => {
  const list = localForm.favoriteBeers
  const index = list.indexOf(beer)
  index >= 0 ? list.splice(index, 1) : list.push(beer)
}

async function onImageUpload(e) {
  const file = e.target.files[0]
  if (!file) return

  const formData = new FormData()
  formData.append('photo', file)

  try {
    const res = await fetch('http://localhost:5000/api/users/me/photo', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    })
    const data = await res.json()
    if (data.photo) {
      localForm.photo = data.photo
      previewImage.value = data.photo
    }
  } catch (err) {
    console.error('Błąd uploadu zdjęcia:', err)
  }
}

// const useCurrentLocation = async () => {
//   if (!navigator.geolocation) {
//     alert('Twoja przeglądarka nie obsługuje geolokalizacji.')
//     return
//   }

//   navigator.geolocation.getCurrentPosition(
//     async ({ coords }) => {
//       const { latitude, longitude } = coords
//       let location = `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`

//       try {
//         const res = await fetch(
//           `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
//         )
//         const data = await res.json()
//         if (data?.address?.city || data?.address?.town) {
//           location = data.address.city || data.address.town
//         }
//       } catch (err) {
//         console.warn('Nie udało się pobrać nazwy miasta:', err)
//       }

//       localForm.location = location
//     },
//     (error) => {
//       console.error('Błąd geolokalizacji:', error)
//       alert('Nie udało się uzyskać Twojej lokalizacji.')
//     },
//     { enableHighAccuracy: true }
//   )
// }

const useCurrentLocationHandler = async () => {
  try {
    const location = await getLocation()
    localForm.location = location
  } catch (err) {
    console.warn(err)
  }
}

function validateForm() {
  let isValid = true
  errors.fullName = ''
  errors.age = ''
  errors.bio = ''
  errors.gender = ''
  errors.location = ''

  if (!localForm.firstName || !localForm.lastName) {
    errors.fullName = 'Podaj imię i nazwisko.'
    isValid = false
  }

  const ageNum = parseInt(localForm.age, 10)
  if (isNaN(ageNum) || ageNum < 18) {
    errors.age = 'Musisz mieć co najmniej 18 lat, aby korzystać z aplikacji.'
    isValid = false
  }

  if (!localForm.bio || localForm.bio.trim().length < 10) {
    errors.bio = 'Bio musi zawierać co najmniej 10 znaków.'
    isValid = false
  }

  if (!localForm.gender) {
    errors.gender = 'Wybierz płeć.'
    isValid = false
  }

  if (!localForm.location) {
    errors.location = 'Podaj lokalizację lub użyj geolokalizacji.'
    isValid = false
  }

  return isValid
}

const close = () => emit('close')

const saveChanges = () => {
  if (!validateForm()) return
  emit('save', { ...localForm, favoriteBeers: [...localForm.favoriteBeers] })
  close()
}

onUnmounted(() => {
  socket.disconnect()
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #d35226;
  border-radius: 10px;
}
</style>