<template>
  <div
    class="w-full mx-auto relative bg-gradient-to-b from-primaryGreen/0 to-primaryGreen/50 h-full overflow-hidden"
  >
    <div
      class="relative w-full aspect-[4/3] md:aspect-[16/9] h-full max-h-[80%]"
      @mousedown="startDrag"
      @touchstart.passive="startDrag"
      @touchmove.passive="onDrag"
      @touchend="endDrag"
      @mouseleave="endDrag"
    >
      <div
        v-for="(slide, index) in slides"
        :key="slide.id"
        class="absolute inset-0 w-full h-full transition-all duration-500 ease-in-out"
        :class="getSlideClasses(index)"
      >
        <div class="w-full h-full relative">
          <img
            :src="slide.image"
            :alt="'Slider Image ' + slide.id"
            class="w-full h-full object-cover"
          />
          <div class="absolute inset-0 bg-black/60">
            <div class="max-w-screen-xl mx-auto flex items-end h-full pb-10 xl:pb-20 px-5 xl:px-0">
              <div>
                <div
                  class="bg-primaryOrange/30 w-16 h-16 flex items-center justify-center rounded-lg shadow-[0_0_14px_rgba(211,82,38,0.7)]"
                >
                  <svg
                    v-html="slide.svg"
                    xmlns="http://www.w3.org/2000/svg"
                    width="40"
                    height="40"
                    viewBox="0 0 40 40"
                    fill="none"
                  ></svg>
                </div>
                <h3 class="text-white text-2xl font-semibold xl:text-[36px] leading-[56px]">
                  {{ slide.title }}
                </h3>
                <div class="text-white text-base leading-6 xl:leading-7">
                  <p>{{ slide.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex justify-center mt-4 gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="currentIndex = index"
        class="w-3 h-3 rounded-full transition-all duration-300"
        :class="index === currentIndex ? 'bg-primaryOrange !w-8' : 'bg-gray-500'"
        aria-label="Go to slide"
      ></button>
    </div>

    <div class="flex flex-col max-w-md mx-auto justify-center gap-4 mt-8 px-5">
      <template v-if="currentIndex < slides.length - 1">
        <button @click="nextSlide" class="px-4 py-2 bg-primaryOrange rounded-lg text-white">
          Dalej
        </button>
        <button @click="skip" class="px-4 py-2 border border-primaryOrange rounded-lg text-white">
          Pomiń
        </button>
      </template>
      <template v-else>
        <button @click="finish" class="px-4 py-2 bg-primaryOrange rounded-lg text-white">
          Zaczynamy!
        </button>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentIndex = ref(0)

// Pełne ścieżki SVG są tutaj dla uproszczenia
// W większych projektach lepiej byłoby importować je jako komponenty lub z pliku JSON
const svgLocationIcon = `
  <path
    d="M33.3334 16.6666C33.3334 24.9883 24.1017 33.6549 21.0017 36.3316C20.713 36.5487 20.3614 36.6662 20.0001 36.6662C19.6388 36.6662 19.2872 36.5487 18.9984 36.3316C15.8984 33.6549 6.66675 24.9883 6.66675 16.6666C6.66675 13.1304 8.07151 9.73898 10.572 7.23849C13.0725 4.73801 16.4639 3.33325 20.0001 3.33325C23.5363 3.33325 26.9277 4.73801 29.4282 7.23849C31.9287 9.73898 33.3334 13.1304 33.3334 16.6666Z"
    stroke="#D35226"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M20 21.6667C22.7614 21.6667 25 19.4282 25 16.6667C25 13.9053 22.7614 11.6667 20 11.6667C17.2386 11.6667 15 13.9053 15 16.6667C15 19.4282 17.2386 21.6667 20 21.6667Z"
    stroke="#D35226"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
`

const svgFriendsIcon = `
  <path d="M28.3335 18.3333H30.0002C31.3262 18.3333 32.598 18.86 33.5357 19.7977C34.4734 20.7354 35.0002 22.0072 35.0002 23.3333C35.0002 24.6593 34.4734 25.9311 33.5357 26.8688C32.598 27.8065 31.3262 28.3333 30.0002 28.3333H28.3335" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M15 20V30" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21.6665 20V30" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M23.3333 12.4999C21.6667 12.4999 20.9333 13.3333 18.3333 13.3333C15.7333 13.3333 15 12.4999 13.3333 12.4999C11.6667 12.4999 10.4667 13.3333 9.16667 13.3333C8.0616 13.3333 7.00179 12.8943 6.22039 12.1129C5.43899 11.3315 5 10.2717 5 9.16659C5 8.06152 5.43899 7.00171 6.22039 6.22031C7.00179 5.43891 8.0616 4.99992 9.16667 4.99992C10.4667 4.99992 11.7833 5.83325 13.3333 5.83325C14.8833 5.83325 15.7333 3.33325 18.3333 3.33325C20.9333 3.33325 21.6667 5.83325 23.3333 5.83325C25 5.83325 26.2 4.99992 27.5 4.99992C28.6051 4.99992 29.6649 5.43891 30.4463 6.22031C31.2277 7.00171 31.6667 8.06152 31.6667 9.16659C31.6667 10.2717 31.2277 11.3315 30.4463 12.1129C29.6649 12.8943 28.6051 13.3333 27.5 13.3333C26.2 13.3333 25 12.4999 23.3333 12.4999Z" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M8.3335 13.3333V33.3333C8.3335 34.2173 8.68469 35.0652 9.30981 35.6903C9.93493 36.3154 10.7828 36.6666 11.6668 36.6666H25.0002C25.8842 36.6666 26.7321 36.3154 27.3572 35.6903C27.9823 35.0652 28.3335 34.2173 28.3335 33.3333V13.3333" stroke="#D35226" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
`

const svgCalendarIcon = `
  <path
    d="M13.3334 3.33325V8.33325"
    stroke="#D35226"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M26.6667 3.33325V8.33325"
    stroke="#D35226"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M6.66675 13.3333H33.3334"
    stroke="#D35226"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
  <path
    d="M31.6667 6.66669H8.33341C7.44929 6.66669 6.66675 7.33924 6.66675 8.16669V31.6667C6.66675 32.4941 7.44929 33.1667 8.33341 33.1667H31.6667C32.5508 33.1667 33.3334 32.4941 33.3334 31.6667V8.16669C33.3334 7.33924 32.5508 6.66669 31.6667 6.66669Z"
    stroke="#D35226"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
  />
`

const slides = ref([
  {
    id: 1,
    image: '/images/Slider1.png',
    svg: svgLocationIcon,
    title: 'Znajdź towarzystwo',
    description: 'Poznaj ludzi w pobliżu, którzy też mają ochotę na piwo',
  },
  {
    id: 2,
    image: '/images/Slider2.png',
    svg: svgFriendsIcon,
    title: 'Spotkaj się z przyjaciółmi',
    description: 'Sprawdź, kto jest dostępny na piwo wśród Twoich znajomych',
  },
  {
    id: 3,
    image: '/images/Slider3.png',
    svg: svgCalendarIcon,
    title: 'Zaplanuj spotkanie',
    description: 'Ustal datę i godzinę na spontaniczne wyjście na piwo',
  },
])
const totalSlides = slides.value.length

// --- Logika nawigacji ---
const nextSlide = () => {
  if (currentIndex.value < totalSlides - 1) {
    currentIndex.value++
  }
}
const prevSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}
const skip = () => router.push('/logowanie')
const finish = () => router.push('/rejestracja')

// --- Logika animacji (CSS Classes) ---
const getSlideClasses = (index) => {
  if (index === currentIndex.value) {
    // Aktywny slajd
    return 'opacity-100 transform-none'
  } else if (index === currentIndex.value - 1) {
    // Poprzedni slajd
    return 'opacity-0 -translate-x-full'
  } else {
    // Następny (lub dalszy) slajd
    return 'opacity-0 translate-x-full'
  }
}

// --- Logika przeciągania (Swipe) ---
const isDragging = ref(false)
const startX = ref(0)
const deltaX = ref(0)

const getClientX = (e) => (e.type.includes('touch') ? e.touches[0].clientX : e.clientX)

const startDrag = (e) => {
  isDragging.value = true
  startX.value = getClientX(e)
  deltaX.value = 0 // Resetuj przesunięcie
}

const onDrag = (e) => {
  if (!isDragging.value) return
  deltaX.value = getClientX(e) - startX.value
}

const endDrag = () => {
  if (!isDragging.value) return

  // Zmień slajd, jeśli przeciągnięcie było wystarczająco duże (np. > 50px)
  if (deltaX.value < -50) {
    nextSlide() // Przesuń w lewo
  } else if (deltaX.value > 50) {
    prevSlide() // Przesuń w prawo
  }

  isDragging.value = false
}
</script>
