<template>
  <div class="xl:flex bg-gradient-to-b from-primaryGreen/0 to-primaryGreen/50 min-h-screen">
    
    <Navbar />

    <div class="px-5 xl:w-full pt-10 xl:pt-10 pb-16">
      <div class="max-w-screen-xl mx-auto">
        
        <div class="header-controls space-y-4 mb-8">
          <h2 class="text-white text-[32px] font-bold tracking-[-0.75px]">Odkrywaj Piwoszy</h2>
          <div class="search-bar flex items-center bg-tertiaryGreen/50 rounded-[10px] p-3 shadow-md shadow-black/20">
            <svg class="w-6 h-6 text-secondaryGold/80 flex-shrink-0 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <input 
              type="text" 
              placeholder="Szukaj użytkownika lub statusu..."
              class="w-full bg-transparent text-white placeholder-secondaryGold/50 focus:outline-none"
            />
          </div>
        </div>

        <DiscoverMap />
        
      </div>
    </div>
  </div>
</template>

<script setup>
import DiscoverMap from '@/components/DiscoverMap.vue';
import Navbar from '@/components/Navbar.vue';
</script>

