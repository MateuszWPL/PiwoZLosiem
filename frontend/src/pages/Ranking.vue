<template>
  <div class="min-h-screen px-5 bg-gradient-to-b from-green-900/20 to-green-900/80 text-white py-10">
    <div class="max-w-screen-xl mx-auto flex flex-col items-center">

      <!-- trofeum na górze -->
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" class="w-12 h-12 flex-shrink-0"
        fill="var(--PrimaryGold, #C8A654)">
        <path
          d="M10.6667 48V42.6667H21.3333V34.4C19.1556 33.9111 17.2116 32.9893 15.5013 31.6347C13.7911 30.28 12.5351 28.5796 11.7333 26.5333C8.4 26.1333 5.61156 24.6782 3.368 22.168C1.12444 19.6578 0.00177778 16.7129 0 13.3333V10.6667C0 9.2 0.522667 7.94489 1.568 6.90133C2.61333 5.85778 3.86844 5.33511 5.33333 5.33333H10.6667V0H37.3333V5.33333H42.6667C44.1333 5.33333 45.3893 5.856 46.4347 6.90133C47.48 7.94667 48.0018 9.20178 48 10.6667V13.3333C48 16.7111 46.8773 19.656 44.632 22.168C42.3867 24.68 39.5982 26.1351 36.2667 26.5333C35.4667 28.5778 34.2116 30.2782 32.5013 31.6347C30.7911 32.9911 28.8462 33.9129 26.6667 34.4V42.6667H37.3333V48H10.6667ZM10.6667 20.8V10.6667H5.33333V13.3333C5.33333 15.0222 5.82222 16.5449 6.8 17.9013C7.77778 19.2578 9.06667 20.224 10.6667 20.8ZM24 29.3333C26.2222 29.3333 28.1111 28.5556 29.6667 27C31.2222 25.4444 32 23.5556 32 21.3333V5.33333H16V21.3333C16 23.5556 16.7778 25.4444 18.3333 27C19.8889 28.5556 21.7778 29.3333 24 29.3333ZM37.3333 20.8C38.9333 20.2222 40.2222 19.2551 41.2 17.8987C42.1778 16.5422 42.6667 15.0204 42.6667 13.3333V10.6667H37.3333V20.8Z" />
      </svg>
      <h1 class="flex items-center mb text-[32px] font-semibold text-white leading-normal">
        Ranking
      </h1>
      <p class="text-xs font-semibold text-secondaryGold leading-normal">Sprawdź swoją pozycję</p>

      <!-- Tabsy -->
      <div class="flex gap-1 mt-5 mb-5">
        <button v-for="(tab, index) in tabs" :key="index" @click="selectedTab = index" :class="[
          'px-4 py-2 rounded-[10px] border font-semibold transition-colors text-xs backdrop-blur-sm',
          selectedTab === index
            ? 'bg-primaryOrange/70 text-white border-primaryOrange shadow-[0_0_10px_#F57C00]'
            : 'bg-white/10 text-white border-green-500/70 hover:bg-green-700/20 active:bg-primaryOrange/40'
        ]">
          {{ tab }}
        </button>
      </div>


      <!-- Ranking -->
      <div class="flex flex-col w-full gap-3 mt-4 mb-3">
        <RankingPoints v-for="(user, index) in rankings[selectedTab]" :key="index" :name="user.name" :city="user.city"
          :points="user.points" />
      </div>

      <div
        class="h-[60px] w-full flex items-center gap-4 rounded-[15px] border border-primaryOrange bg-[rgba(211,82,38,0.3)] px-4">

        <!-- pozycja rankingowa -->
        <span class="text-xl font-semibold text-secondaryGold leading-4 font-inter">
          #125
        </span>


        <!-- Drugie SVG z nakładką -->
        <div class="relative w-10 h-10 flex-shrink-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40"
            class="w-10 h-10 fill-[#A89E8A]">
            <path
              d="M40 20C40 31.0457 31.0457 40 20 40C8.95431 40 0 31.0457 0 20C0 8.95431 8.95431 0 20 0C31.0457 0 40 8.95431 40 20Z" />
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
            class="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
            <g clip-path="url(#clip0_103_256)">
              <path d="..." fill="#F2A74E" />
              <path d="..." fill="#F9CB3A" />
              <path d="..." fill="#F2A74E" />
              <path d="..." fill="#F7EAD7" />
            </g>
            <defs>
              <clipPath id="clip0_103_256">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
          <!-- nakladka svg 32x32 -->
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"
            class="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2">
            <g clip-path="url(#clip0_103_256)">
              <path
                d="M26.813 27.1274H23.0906C21.1215 27.1274 19.5195 25.5254 19.5195 23.5563V14.4544C19.5195 12.4853 21.1215 10.8833 23.0906 10.8833H26.813C28.7821 10.8833 30.3841 12.4852 30.3841 14.4544V23.5563C30.384 25.5254 28.7821 27.1274 26.813 27.1274ZM23.0906 13.5254C22.5784 13.5254 22.1617 13.9421 22.1617 14.4543V23.5563C22.1617 24.0685 22.5784 24.4852 23.0906 24.4852H26.813C27.3252 24.4852 27.742 24.0685 27.742 23.5563V14.4544C27.742 13.9421 27.3252 13.5254 26.813 13.5254H23.0906V13.5254Z"
                fill="#F2A74E" />
              <path
                d="M24.4675 9.15462L23.7481 27.1407L23.6865 30.4077C23.6865 31.2988 19.8845 32.0213 15.1946 32.0213C10.5047 32.0213 6.70273 31.2988 6.70273 30.4077L6.64067 27.0569H6.64567L5.9296 9.15462C5.8776 7.85519 6.91698 6.77344 8.21748 6.77344H22.1797C23.4802 6.77344 24.5195 7.85519 24.4675 9.15462Z"
                fill="#F9CB3A" />
              <path
                d="M10.5347 28.9378C10.039 28.9378 9.62722 28.5465 9.60653 28.0467L8.96566 12.562C8.94441 12.049 9.34309 11.6159 9.85603 11.5947C10.3702 11.5735 10.8021 11.9721 10.8233 12.485L11.4642 27.9697C11.4855 28.4827 11.0868 28.9158 10.5738 28.937C10.5607 28.9376 10.5477 28.9378 10.5347 28.9378ZM20.7935 28.0467L21.4343 12.562C21.4556 12.049 21.057 11.6159 20.544 11.5947C20.0301 11.573 19.5979 11.9721 19.5767 12.485L18.9358 27.9697C18.9145 28.4827 19.3132 28.9158 19.8262 28.937C19.8393 28.9376 19.8523 28.9378 19.8653 28.9378C20.361 28.9378 20.7728 28.5465 20.7935 28.0467ZM16.2479 28.0082V12.2045C16.2479 11.6911 15.8317 11.2749 15.3183 11.2749C14.8048 11.2749 14.3887 11.6911 14.3887 12.2045V28.0082C14.3887 28.5217 14.8048 28.9378 15.3183 28.9378C15.8317 28.9378 16.2479 28.5217 16.2479 28.0082Z"
                fill="#F2A74E" />
              <path
                d="M26.6999 8.1285C26.6999 9.573 25.5289 10.744 24.0844 10.744C23.1389 10.744 22.3106 10.2421 21.8512 9.49031C21.2266 9.88418 20.503 10.0928 19.7646 10.0919C18.8006 10.0919 17.9184 9.74363 17.2355 9.16681C17.1724 9.19156 17.1088 9.21488 17.0446 9.23675C17.0496 9.31756 17.0529 9.39881 17.0529 9.48094C17.0529 11.6475 15.2966 13.4039 13.13 13.4039C11.2545 13.4039 9.68731 12.0873 9.29988 10.3282C8.84158 10.5093 8.35321 10.6022 7.86044 10.602C5.69388 10.602 3.9375 8.84562 3.9375 6.67906C3.9375 4.5125 5.69388 2.75612 7.86044 2.75612C7.86044 1.31163 9.03144 0.140625 10.4759 0.140625C11.4215 0.140625 12.2498 0.6425 12.7092 1.39431C13.4916 0.759438 14.4883 0.378438 15.5744 0.378438C17.0982 0.378438 18.4461 1.12806 19.2721 2.27781C19.4355 2.2569 19.6 2.24625 19.7647 2.24594C21.7212 2.24594 23.3428 3.67838 23.6389 5.55156C23.7861 5.52603 23.9352 5.51311 24.0846 5.51294C25.5289 5.513 26.6999 6.684 26.6999 8.1285Z"
                fill="#F7EAD7" />
            </g>
            <defs>
              <clipPath id="clip0_103_256">
                <rect width="32" height="32" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <!-- personalny ranking (statycznie) -->
        <div class="flex flex-col">
          <span class="text-white font-semibold text-xl leading-normal">Jan Kowalski</span>
          <span class="text-secondaryGold font-semibold text-xs leading-4">Warszawa</span>
        </div>

        <!-- pkt rankingowe personalne (statycznie) -->
        <div class="ml-auto flex flex-col items-end gap-1.5">
          <span class="text-primaryOrange font-semibold text-xl leading-4 text-right">9</span>
          <span class="text-secondaryGold font-semibold text-xs leading-4 w-[21px] h-[18px] text-right">piw</span>
        </div>
      </div>


      <!-- dolny modul" -->
      <div
        class="w-full h-[180px] shrink-0 rounded-[15px] border border-primaryOrange flex flex-col justify-start items-center p-6 text-center pt-4 pb-8 mt-6">
        <h2 class="text-xl font-semibold text-white leading-normal">Wspinaj się wyżej!</h2>
        <p class="text-xs font-semibold leading-normal text-white/80 mt-2">
          Pij więcej piwa i zdobywaj kolejne miejsca w rankingu
        </p>
        <button
          class="mt-8 inline-flex h-[50px] px-8 py-4 justify-center items-center rounded-[15px] bg-primaryGold text-black text-sm font-semibold leading-normal hover:bg-yellow-400">
          Znajdź towarzystwo
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import RankingPoints from '@/components/RankingPoints.vue'

// Taby (3 różne rankingi)
const tabs = ['Tydzień', 'Miesiąc', 'Cały czas']
const selectedTab = ref(0)

// Przykładowe dane dla 3 rankingów
const rankings = [
  [
    { name: 'Jan Kowalski', city: 'Warszawa', points: 140 },
    { name: 'Anna Nowak', city: 'Kraków', points: 130 },
    { name: 'Iwan Szmit', city: 'Inowrocław', points: 78 },
    { name: 'Adam Kuwejt', city: 'Olsztyn', points: 67 },
  ],
  [
    { name: 'Piotr Wiśniewski', city: 'Gdańsk', points: 120 },
    { name: 'Katarzyna Zielińska', city: 'Wrocław', points: 110 },
    { name: 'Patryk Sigmalski', city: 'Białystok', points: 100 },
    { name: 'Jan Dąbrowski', city: 'Kraków', points: 31 },
  ],
  [
    { name: 'Marek Nowak', city: 'Poznań', points: 100 },
    { name: 'Ewa Kowalska', city: 'Łódź', points: 90 },
    { name: 'Milosz Sidor', city: 'Poznań', points: 73 },
    { name: 'Ewa Major', city: 'Warszawa', points: 43 },
  ],
]
</script>
