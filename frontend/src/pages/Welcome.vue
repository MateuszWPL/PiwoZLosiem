<template>
  <div class="bg-gradient-to-b from-green-900/20 to-green-900/80 min-h-screen flex flex-col">
    <section class="splide w-full flex-grow relative" aria-label="Splide Basic HTML Example">
      <div class="splide__track max-h-[800px] max-w-[1600px] mx-auto relative">
        <ul class="splide__list w-full h-full">
          <li class="splide__slide w-full h-full">
            <div class="relative w-full h-full">
              <img src="/images/Slider1.png" alt="Slide 01" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black z-10"></div>
              <div class="absolute inset-0 flex items-center z-40">
                <div
                  class="max-w-screen-xl mx-auto w-full flex flex-col items-start px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 lg:mt-20"
                >
                  <div
                    class="flex justify-center items-center rounded-lg bg-[rgba(211,82,38,0.3)] shadow-[0_0_14.6px_0_#D44E25] p-2 sm:p-3 mb-3 sm:mb-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      class="sm:w-10 sm:h-10"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
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
                    </svg>
                  </div>
                  <h2
                    class="text-xl sm:text-2xl md:text-4xl text-white drop-shadow-lg mb-2 sm:mb-3"
                  >
                    Znajdź towarzystwo
                  </h2>
                  <p
                    class="text-sm sm:text-base md:text-[15px] text-white drop-shadow-lg max-w-xl text-white/60"
                  >
                    Poznaj ludzi w pobliżu, którzy też mają ochotę na piwo
                  </p>
                </div>
              </div>
            </div>
          </li>
          <li class="splide__slide w-full h-full">
            <div class="relative w-full h-full">
              <img src="/images/Slider2.png" alt="Slide 02" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/40 to-black z-10"></div>
              <div class="absolute inset-0 flex items-center z-40">
                <div
                  class="max-w-screen-xl mx-auto w-full flex flex-col items-start px-4 sm:px-6 lg:px-8 mt-10 sm:mt-16 lg:mt-20"
                >
                  <div
                    class="flex justify-center items-center rounded-lg bg-[rgba(211,82,38,0.3)] shadow-[0_0_14.6px_0_#D44E25] p-2 sm:p-3 mb-3 sm:mb-4"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="32"
                      height="32"
                      class="sm:w-10 sm:h-10"
                      viewBox="0 0 40 40"
                      fill="none"
                    >
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
                    </svg>
                  </div>
                  <h2
                    class="text-xl sm:text-2xl md:text-4xl text-white drop-shadow-lg mb-2 sm:mb-3"
                  >
                    Drugi slajd
                  </h2>
                  <p
                    class="text-sm sm:text-base md:text-[15px] text-white drop-shadow-lg max-w-xl text-white/60"
                  >
                    Treść drugiego slajdu
                  </p>
                </div>
              </div>
            </div>
          </li>
        </ul>

        <!-- Paginacja i przyciski WEWNĄTRZ track - NIŻEJ -->
        <div
          class="absolute bottom-4 sm:bottom-6 lg:bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-[300px] z-30 px-4"
        >
          <!-- Paginacja -->
          <div class="custom-pagination flex justify-center gap-2 mb-2 sm:mb-3"></div>

          <!-- Przyciski -->
          <div class="splide__arrows flex flex-col gap-2 sm:gap-3">
            <button
              class="splide__arrow splide__arrow--prev w-full px-4 sm:px-6 py-2 sm:py-3 rounded-[10px] sm:rounded-[12px] border border-[#22392E] bg-gradient-to-br from-[#E07352] to-[#D44E25] shadow-[0_0_20px_0_rgba(212,78,37,0.5)] text-white font-bold text-sm sm:text-base hover:from-[#D44E25] hover:to-[#E07352] transition-all duration-300"
            >
              Wstecz
            </button>

            <button
              class="splide__arrow splide__arrow--next w-full px-4 sm:px-6 py-2 sm:py-3 rounded-[10px] sm:rounded-[12px] border border-[#22392E] bg-gradient-to-br from-[#E07352] to-[#D44E25] shadow-[0_0_20px_0_rgba(212,78,37,0.5)] text-white font-bold text-sm sm:text-base hover:from-[#D44E25] hover:to-[#E07352] transition-all duration-300"
            >
              Dalej
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import Splide from '@splidejs/splide'

onMounted(() => {
  const splide = new Splide('.splide', {
    type: 'loop',
    perPage: 1,
    focus: 'center',
    gap: '1rem',
    autoplay: true,
    interval: 3000,
    fixedWidth: '100%',
    arrows: true,
    pagination: false,
  })

  splide.mount()

  // Ręczna paginacja
  const paginationContainer = document.querySelector('.custom-pagination')
  const slides = splide.Components.Elements.slides

  slides.forEach((_, index) => {
    const page = document.createElement('button')
    page.className = `pagination-dot w-2 h-2 sm:w-3 sm:h-3 rounded-full border-2 border-white/60 transition-all duration-300 ${index === 0 ? 'bg-[#D44E25] border-[#D44E25] scale-125' : 'bg-white/40'}`
    page.addEventListener('click', () => {
      splide.go(index)
    })
    paginationContainer.appendChild(page)
  })

  // Aktualizacja paginacji przy zmianie slajdu
  splide.on('moved', (newIndex) => {
    const dots = paginationContainer.querySelectorAll('.pagination-dot')
    dots.forEach((dot, index) => {
      if (index === newIndex) {
        dot.classList.add('bg-[#D44E25]', 'border-[#D44E25]', 'scale-125')
        dot.classList.remove('bg-white/40')
      } else {
        dot.classList.remove('bg-[#D44E25]', 'border-[#D44E25]', 'scale-125')
        dot.classList.add('bg-white/40')
      }
    })
  })
})
</script>

<style scoped>
.splide {
  height: 100% !important;
}

.splide__track {
  height: 100% !important;
}

.splide__slide {
  height: 100% !important;
}

.splide__arrows {
  display: flex !important;
}

/* Reset domyślnych stylów Splide */
.splide__arrow {
  position: static !important;
  transform: none !important;
  opacity: 1 !important;
  background: none !important;
  border: none !important;
}

.splide__arrow--prev,
.splide__arrow--next {
  position: static !important;
}

.splide__arrow:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Ukryj domyślną paginację Splide */
.splide__pagination {
  display: none !important;
}

/* Responsywność dla mniejszych ekranów */
@media (max-width: 640px) {
  .splide__track {
    max-height: 500px !important;
  }
}
</style>
