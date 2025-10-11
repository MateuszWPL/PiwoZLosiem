<template>
    <div
        class="min-h-screen bg-gradient-to-b from-green-900/20 to-green-900/80 text-white flex flex-col items-center py-10">
        <h1 class="flex items-center gap-2 mb-[10px] text-[32px] font-semibold text-white" style="line-height: normal;">
            Ranking
        </h1>
        <p class="text-[12px] font-semibold text-secondaryGold" style="font-style: normal; line-height: normal;">
            Sprawdź swoją pozycję
        </p>

        <div class="flex gap-[10px] mt-[8px] mb-[40px]">
            <div class="w-[13.333px] h-[35px] rounded-[10px] bg-white shrink-0"></div>
            <div class="w-[13.333px] h-[35px] rounded-[10px] bg-white shrink-0"></div>
            <div class="w-[13.333px] h-[35px] rounded-[10px] bg-white shrink-0"></div>
        </div>

        <!-- lista rankignowa - komponenty -->
        <div class="flex flex-col w-[1100px] gap-[12px] mt-4">
            <RankingPoints v-for="(user, index) in rankings" :key="index" :name="user.name" :city="user.city"
                :points="user.points" />
        </div>

        <!-- dolny modul" -->
        <div
            class="w-[1100px] h-[180px] shrink-0 rounded-[15px] border border-primaryOrange flex flex-col justify-start items-center p-6 text-center pt-4 pb-8 mt-6">
            <h2 class="text-[20px] font-semibold text-white leading-normal">
                Wspinaj się wyżej!
            </h2>
            <p class="text-[12px] font-semibold text-white/80 leading-normal mt-[8px]">
                Pij więcej piwa i zdobywaj kolejne miejsca w rankingu
            </p>
            <button
                class="mt-[32px] inline-flex h-[50px] px-[31px] pt-[17px] pb-[16px] justify-center items-center rounded-[15px] bg-primaryGold text-black text-[14px] font-semibold leading-normal">
                Znajdź towarzystwo
            </button>
        </div>
    </div>
</template>

<script setup>
import RankingPoints from '@/components/RankingPoints.vue'

// tablica - dane rankingowe
const rankings = [
    { name: 'Jan Kowalski', city: 'Warszawa', points: 140 },
    { name: 'Anna Nowak', city: 'Kraków', points: 130 },
    { name: 'Piotr Wiśniewski', city: 'Gdańsk', points: 120 },
    { name: 'Katarzyna Zielińska', city: 'Wrocław', points: 110 },
]
</script>