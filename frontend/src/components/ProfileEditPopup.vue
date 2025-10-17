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
            <div v-else v-html="svgBeer" class="w-12 h-12 text-secondaryGold"></div>
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
          </div>
          <div>
            <label class="block text-sm mb-1 text-secondaryGold">Wiek</label>
            <input
              v-model="localForm.age"
              type="number"
              class="w-full bg-primaryGreen/30 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primaryOrange"
              placeholder="Wiek"
            />
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
              @click="useCurrentLocation"
              class="text-xs border border-secondaryGold rounded-lg px-2 py-1 hover:bg-secondaryGold/20 transition w-full sm:w-auto"
            >
              Użyj mojej lokalizacji
            </button>
          </div>
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

const props = defineProps({
  visible: Boolean,
  userData: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['close', 'save'])

const svgBeer = `<svg xmlns="http://www.w3.org/2000/svg" width="36" height="32" viewBox="0 0 36 32" fill="none">
  <path d="M25.5 14.6665H27C28.1935 14.6665 29.3381 15.0879 30.182 15.8381C31.0259 16.5882 31.5 17.6056 31.5 18.6665C31.5 19.7274 31.0259 20.7448 30.182 21.4949C29.3381 22.2451 28.1935 22.6665 27 22.6665H25.5" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M13.5 16V24" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M19.5 16V24" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 10.0003C19.5 10.0003 18.84 10.667 16.5 10.667C14.16 10.667 13.5 10.0003 12 10.0003C10.5 10.0003 9.42 10.667 8.25 10.667C7.25544 10.667 6.30161 10.3158 5.59835 9.69068C4.89509 9.06556 4.5 8.21771 4.5 7.33366C4.5 6.4496 4.89509 5.60176 5.59835 4.97664C6.30161 4.35152 7.25544 4.00033 8.25 4.00033C9.42 4.00033 10.605 4.66699 12 4.66699C13.395 4.66699 14.16 2.66699 16.5 2.66699C18.84 2.66699 19.5 4.66699 21 4.66699C22.5 4.66699 23.58 4.00033 24.75 4.00033C25.7446 4.00033 26.6984 4.35152 27.4017 4.97664C28.1049 5.60176 28.5 6.4496 28.5 7.33366C28.5 8.21771 28.1049 9.06556 27.4017 9.69068C26.6984 10.3158 25.7446 10.667 24.75 10.667C23.58 10.667 22.5 10.0003 21 10.0003Z" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M7.5 10.6665V26.6665C7.5 27.3737 7.81607 28.052 8.37868 28.5521C8.94129 29.0522 9.70435 29.3332 10.5 29.3332H22.5C23.2956 29.3332 24.0587 29.0522 24.6213 28.5521C25.1839 28.052 25.5 27.3737 25.5 26.6665V10.6665" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`

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

watch(
  () => props.userData,
  (val) => {
    if (!val) return
    // Przepisujemy dane z props.userData do localForm głęboko
    for (const key in defaultUser) {
      if (Array.isArray(val[key])) {
        localForm[key] = [...val[key]] // kopiujemy tablicę, żeby zachować reaktivność
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

const statuses = [
  { label: '🍺 Wolny na piwo', value: 'available'},
  { label: '❌ Zajęty', value: 'busy' },
  { label: '⚪ Offline', value: 'offline' },
]

const beers = ['ŻUBR', 'WARKA', 'ŁOMŻA', 'WOJANEK']

const toggleBeer = (beer) => {
  const list = localForm.favoriteBeers
  const index = list.indexOf(beer)
  index >= 0 ? list.splice(index, 1) : list.push(beer)
}

// const onImageUpload = (e) => {
//   const file = e.target.files[0]
//   if (!file) return
//   const reader = new FileReader()
//   reader.onload = (ev) => {
//     previewImage.value = ev.target.result
//     localForm.photo = ev.target.result
//   }
//   reader.readAsDataURL(file)
// }

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

const useCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      localForm.location = `Lat: ${coords.latitude.toFixed(2)}, Lng: ${coords.longitude.toFixed(2)}`
    })
  }
}

let prevOverflow = ''
let prevPadding = ''
const lockScroll = () => {
  prevOverflow = document.body.style.overflow
  prevPadding = document.body.style.paddingRight
  const scrollBar = window.innerWidth - document.documentElement.clientWidth
  document.body.style.overflow = 'hidden'
  if (scrollBar > 0) document.body.style.paddingRight = `${scrollBar}px`
}
const restoreScroll = () => {
  document.body.style.overflow = prevOverflow || ''
  document.body.style.paddingRight = prevPadding || ''
}
watch(() => props.visible, (val) => (val ? lockScroll() : restoreScroll()))
onUnmounted(restoreScroll)

const close = () => emit('close')
const saveChanges = () => {
  emit('save', { ...localForm, favoriteBeers: [...localForm.favoriteBeers] })
  close()
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d35226;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>
