<template>
  <div class="xl:flex bg-gradient-to-b pt-20 xl:pt-0 from-primaryGreen/0 to-primaryGreen/50 h-dvh">
    <Navbar />
    <div class="px-5 xl:w-full">
      <div class="max-w-screen-xl mx-auto">
        <div>
          <h3 class="text-white text-[30px] tracking-[-0.75px] mt-10">
            Cześć, <span class="text-primaryOrange">Michał</span
            ><span class="text-primaryOrange">!</span>
          </h3>
          <p class="text-secondaryGold text-sm leading-5 mt-1 mb-6">Gotowy na piwo ?</p>
        </div>
        <div class="xl:grid xl:grid-cols-2 xl:gap-10">
          <div class="flex flex-col gap-6">
            <div class="flex flex-col items-center gap-4 bg-tertiaryGreen/50 rounded-[10px] p-6">
              <p>Twój status</p>
              <div class="flex items-center gap-2">
                <div class="py-2 px-4 bg-primaryOrange rounded-full w-fit">
                  <p class="text-white">🍺 wolny na piwo</p>
                </div>
                <button class="text-white bg-primaryGreen py-2 px-3 rounded-full">Zmień</button>
              </div>
            </div>
            <div class="grid template-columns-1 gap-6 md:grid-cols-3">
              <div
                class="flex flex-col gap-2 items-center mx-auto w-full rounded-[10px] bg-tertiaryGreen/50 p-4 md:max-w-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="32"
                  viewBox="0 0 36 32"
                  fill="none"
                >
                  <path
                    d="M25.5 14.6665H27C28.1935 14.6665 29.3381 15.0879 30.182 15.8381C31.0259 16.5882 31.5 17.6056 31.5 18.6665C31.5 19.7274 31.0259 20.7448 30.182 21.4949C29.3381 22.2451 28.1935 22.6665 27 22.6665H25.5"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.5 16V24"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M19.5 16V24"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21 10.0003C19.5 10.0003 18.84 10.667 16.5 10.667C14.16 10.667 13.5 10.0003 12 10.0003C10.5 10.0003 9.42 10.667 8.25 10.667C7.25544 10.667 6.30161 10.3158 5.59835 9.69068C4.89509 9.06556 4.5 8.21771 4.5 7.33366C4.5 6.4496 4.89509 5.60176 5.59835 4.97664C6.30161 4.35152 7.25544 4.00033 8.25 4.00033C9.42 4.00033 10.605 4.66699 12 4.66699C13.395 4.66699 14.16 2.66699 16.5 2.66699C18.84 2.66699 19.5 4.66699 21 4.66699C22.5 4.66699 23.58 4.00033 24.75 4.00033C25.7446 4.00033 26.6984 4.35152 27.4017 4.97664C28.1049 5.60176 28.5 6.4496 28.5 7.33366C28.5 8.21771 28.1049 9.06556 27.4017 9.69068C26.6984 10.3158 25.7446 10.667 24.75 10.667C23.58 10.667 22.5 10.0003 21 10.0003Z"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M7.5 10.6665V26.6665C7.5 27.3737 7.81607 28.052 8.37868 28.5521C8.94129 29.0522 9.70435 29.3332 10.5 29.3332H22.5C23.2956 29.3332 24.0587 29.0522 24.6213 28.5521C25.1839 28.052 25.5 27.3737 25.5 26.6665V10.6665"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-white text-2xl">47</p>
                <p>Piwa</p>
              </div>
              <div
                class="flex flex-col gap-2 items-center mx-auto w-full rounded-[10px] bg-tertiaryGreen/50 p-4 md:max-w-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="32"
                  viewBox="0 0 36 32"
                  fill="none"
                >
                  <path
                    d="M24 28V25.3333C24 23.9188 23.3679 22.5623 22.2426 21.5621C21.1174 20.5619 19.5913 20 18 20H9C7.4087 20 5.88258 20.5619 4.75736 21.5621C3.63214 22.5623 3 23.9188 3 25.3333V28"
                    stroke="#C8A654"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.5 14.6667C16.8137 14.6667 19.5 12.2789 19.5 9.33333C19.5 6.38781 16.8137 4 13.5 4C10.1863 4 7.5 6.38781 7.5 9.33333C7.5 12.2789 10.1863 14.6667 13.5 14.6667Z"
                    stroke="#C8A654"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M33 28V25.3333C32.999 24.1516 32.5565 23.0037 31.742 22.0698C30.9276 21.1358 29.7872 20.4688 28.5 20.1733"
                    stroke="#C8A654"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24 4.17334C25.2906 4.46707 26.4346 5.13427 27.2515 6.06975C28.0684 7.00523 28.5118 8.15578 28.5118 9.34001C28.5118 10.5242 28.0684 11.6748 27.2515 12.6103C26.4346 13.5457 25.2906 14.2129 24 14.5067"
                    stroke="#C8A654"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-white text-2xl">23</p>
                <p>Znajomi</p>
              </div>
              <div
                class="flex flex-col gap-2 items-center mx-auto w-full rounded-[10px] bg-tertiaryGreen/50 p-4 md:max-w-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="32"
                  viewBox="0 0 36 32"
                  fill="none"
                >
                  <path
                    d="M33 9.3335L20.25 20.6668L12.75 14.0002L3 22.6668"
                    stroke="#C8A654"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M24 9.3335H33V17.3335"
                    stroke="#C8A654"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-white text-2xl">#12</p>
                <p>Ranking</p>
              </div>
            </div>
          </div>
          <div>
            <h4
              class="text-white text-[24px] tracking-[-0.6px] font-semibold mt-10 xl:mt-0 xl:w-full"
            >
              Szybkie akcje
            </h4>
            <div class="flex flex-col gap-6 mt-8">
              <button
                class="bg-primaryOrange text-white flex items-center gap-3 rounded-[10px] p-4 w-full shadow-md shadow-primaryOrange/50 hover:shadow-primaryOrange/70 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M20 10C20 14.993 14.461 20.193 12.601 21.799C12.4277 21.9293 12.2168 21.9998 12 21.9998C11.7832 21.9998 11.5723 21.9293 11.399 21.799C9.539 20.193 4 14.993 4 10C4 7.87827 4.84285 5.84344 6.34315 4.34315C7.84344 2.84285 9.87827 2 12 2C14.1217 2 16.1566 2.84285 17.6569 4.34315C19.1571 5.84344 20 7.87827 20 10Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-white font-semibold">Zaproś ludzi w pobliżu</p>
              </button>
              <button
                class="bg-primaryGold text-white flex items-center gap-3 rounded-[10px] p-4 w-full shadow-md shadow-primaryGold hover:shadow-primaryGold/70 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  fill="none"
                >
                  <path
                    d="M29.3337 9.3335L18.0003 20.6668L11.3337 14.0002L2.66699 22.6668"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M21.333 9.3335H29.333V17.3335"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-black font-semibold">Sprawdź rankingi i odznaki</p>
              </button>
              <button
                class="bg-primaryGreen text-white flex items-center gap-3 rounded-[10px] p-4 w-full shadow-md shadow-primaryGreen hover:shadow-primaryGreen/70 transition duration-300"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H6C4.93913 15 3.92172 15.4214 3.17157 16.1716C2.42143 16.9217 2 17.9391 2 19V21"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M22 20.9999V18.9999C21.9993 18.1136 21.7044 17.2527 21.1614 16.5522C20.6184 15.8517 19.8581 15.3515 19 15.1299"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M16 3.12988C16.8604 3.35018 17.623 3.85058 18.1676 4.55219C18.7122 5.2538 19.0078 6.11671 19.0078 7.00488C19.0078 7.89305 18.7122 8.75596 18.1676 9.45757C17.623 10.1592 16.8604 10.6596 16 10.8799"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p class="text-white font-semibold">Zobacz aktywność znajomych</p>
              </button>
            </div>
          </div>
        </div>
        <div class="bg-tertiaryGreen/50 rounded-[10px] p-5 w-full shadow-md shadow-black/20 mt-10">
          <h4 class="text-white text-[24px] tracking-[-0.6px] font-semibold">Ostatnia aktywność</h4>
          <div class="mt-6 flex flex-col gap-6">
            <div class="flex items-center gap-4 border-b border-b-secondaryGold/20 pb-4">
              <div class="bg-primaryOrange/50 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M17 11.4629H18C18.7956 11.4629 19.5587 11.779 20.1213 12.3416C20.6839 12.9042 21 13.6672 21 14.4629C21 15.2585 20.6839 16.0216 20.1213 16.5842C19.5587 17.1468 18.7956 17.4629 18 17.4629H17"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 12.4629V18.4629"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 12.4629V18.4629"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 7.96289C13 7.96289 12.56 8.46289 11 8.46289C9.44 8.46289 9 7.96289 8 7.96289C7 7.96289 6.28 8.46289 5.5 8.46289C4.83696 8.46289 4.20107 8.1995 3.73223 7.73066C3.26339 7.26182 3 6.62593 3 5.96289C3 5.29985 3.26339 4.66396 3.73223 4.19512C4.20107 3.72628 4.83696 3.46289 5.5 3.46289C6.28 3.46289 7.07 3.96289 8 3.96289C8.93 3.96289 9.44 2.46289 11 2.46289C12.56 2.46289 13 3.96289 14 3.96289C15 3.96289 15.72 3.46289 16.5 3.46289C17.163 3.46289 17.7989 3.72628 18.2678 4.19512C18.7366 4.66396 19 5.29985 19 5.96289C19 6.62593 18.7366 7.26182 18.2678 7.73066C17.7989 8.1995 17.163 8.46289 16.5 8.46289C15.72 8.46289 15 7.96289 14 7.96289Z"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 8.46289V20.4629C5 20.9933 5.21071 21.502 5.58579 21.8771C5.96086 22.2522 6.46957 22.4629 7 22.4629H15C15.5304 22.4629 16.0391 22.2522 16.4142 21.8771C16.7893 21.502 17 20.9933 17 20.4629V8.46289"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="flex flex-col">
                <p class="text-white font-semibold">Michał wypił piwo z Janem</p>
                <p class="text-secondaryGold text-sm mt-1">2 godziny temu</p>
              </div>
            </div>
            <div class="flex items-center gap-4 border-b border-b-secondaryGold/20 pb-4">
              <div class="bg-primaryOrange/50 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M17 11.4629H18C18.7956 11.4629 19.5587 11.779 20.1213 12.3416C20.6839 12.9042 21 13.6672 21 14.4629C21 15.2585 20.6839 16.0216 20.1213 16.5842C19.5587 17.1468 18.7956 17.4629 18 17.4629H17"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 12.4629V18.4629"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 12.4629V18.4629"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 7.96289C13 7.96289 12.56 8.46289 11 8.46289C9.44 8.46289 9 7.96289 8 7.96289C7 7.96289 6.28 8.46289 5.5 8.46289C4.83696 8.46289 4.20107 8.1995 3.73223 7.73066C3.26339 7.26182 3 6.62593 3 5.96289C3 5.29985 3.26339 4.66396 3.73223 4.19512C4.20107 3.72628 4.83696 3.46289 5.5 3.46289C6.28 3.46289 7.07 3.96289 8 3.96289C8.93 3.96289 9.44 2.46289 11 2.46289C12.56 2.46289 13 3.96289 14 3.96289C15 3.96289 15.72 3.46289 16.5 3.46289C17.163 3.46289 17.7989 3.72628 18.2678 4.19512C18.7366 4.66396 19 5.29985 19 5.96289C19 6.62593 18.7366 7.26182 18.2678 7.73066C17.7989 8.1995 17.163 8.46289 16.5 8.46289C15.72 8.46289 15 7.96289 14 7.96289Z"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 8.46289V20.4629C5 20.9933 5.21071 21.502 5.58579 21.8771C5.96086 22.2522 6.46957 22.4629 7 22.4629H15C15.5304 22.4629 16.0391 22.2522 16.4142 21.8771C16.7893 21.502 17 20.9933 17 20.4629V8.46289"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="flex flex-col">
                <p class="text-white font-semibold">Michał wypił piwo z Janem</p>
                <p class="text-secondaryGold text-sm mt-1">2 godziny temu</p>
              </div>
            </div>
            <div class="flex items-center gap-4 border-b border-b-secondaryGold/20 pb-4">
              <div class="bg-primaryOrange/50 p-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  fill="none"
                >
                  <path
                    d="M17 11.4629H18C18.7956 11.4629 19.5587 11.779 20.1213 12.3416C20.6839 12.9042 21 13.6672 21 14.4629C21 15.2585 20.6839 16.0216 20.1213 16.5842C19.5587 17.1468 18.7956 17.4629 18 17.4629H17"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 12.4629V18.4629"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13 12.4629V18.4629"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14 7.96289C13 7.96289 12.56 8.46289 11 8.46289C9.44 8.46289 9 7.96289 8 7.96289C7 7.96289 6.28 8.46289 5.5 8.46289C4.83696 8.46289 4.20107 8.1995 3.73223 7.73066C3.26339 7.26182 3 6.62593 3 5.96289C3 5.29985 3.26339 4.66396 3.73223 4.19512C4.20107 3.72628 4.83696 3.46289 5.5 3.46289C6.28 3.46289 7.07 3.96289 8 3.96289C8.93 3.96289 9.44 2.46289 11 2.46289C12.56 2.46289 13 3.96289 14 3.96289C15 3.96289 15.72 3.46289 16.5 3.46289C17.163 3.46289 17.7989 3.72628 18.2678 4.19512C18.7366 4.66396 19 5.29985 19 5.96289C19 6.62593 18.7366 7.26182 18.2678 7.73066C17.7989 8.1995 17.163 8.46289 16.5 8.46289C15.72 8.46289 15 7.96289 14 7.96289Z"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M5 8.46289V20.4629C5 20.9933 5.21071 21.502 5.58579 21.8771C5.96086 22.2522 6.46957 22.4629 7 22.4629H15C15.5304 22.4629 16.0391 22.2522 16.4142 21.8771C16.7893 21.502 17 20.9933 17 20.4629V8.46289"
                    stroke="#D35226"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <div class="flex flex-col">
                <p class="text-white font-semibold">Michał wypił piwo z Janem</p>
                <p class="text-secondaryGold text-sm mt-1">2 godziny temu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>
