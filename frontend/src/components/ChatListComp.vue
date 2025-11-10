<template>
  <div class="h-full w-full min-w-0 overflow-y-auto scrollbar-thin scrollbar-thumb-primaryOrange scrollbar-track-tertiaryGreen px-4" 
  style="scroll-behavior: smooth;">

    <div v-if="chats.length === 0" class="flex flex-col items-center justify-center h-full text-center p-4 gap-2">
      <div class="text-secondaryGold text-xl">🍻</div>
      <div class="text-lg font-semibold text-secondaryGold">
        Twoja skrzynka jest pusta jak kufel po piwie 🍺
      </div>
      <div class="text-secondaryGold/70 text-sm mt-2">
        Rozpocznij rozmowę wybierając użytkownika z mapy lub z listy znajomych!
      </div>
    </div>

    <div
      v-for="chat in chats"
      :key="chat.id"
      class="flex items-center p-3 mt-3 border-2 border-secondaryGreen rounded-2xl cursor-pointer transition-all duration-300 h-20 min-w-0"
      :class="[
        chat.unread ? 'bg-primaryOrange/30 animate-pulse shadow-md' : 'bg-tertiaryGreen hover:bg-primaryGreen'
      ]"
      @click="$emit('select', chat)"
    >

      <img :src="chat.photoUrl || '/images/defaultAvatar.png'" class="w-10 h-10 rounded-full object-cover flex-shrink-0" />

      <div class="flex flex-col ml-3 flex-1 min-w-0 overflow-hidden">
        <div class="font-semibold text-white truncate text-sm">{{ chat.name }}</div>
        <div class="text-secondaryGold text-xs truncate mt-1">{{ chat.lastMessage }}</div>
      </div>

      <div class="text-secondaryGold text-xs ml-2 flex-shrink-0 whitespace-nowrap"> {{ chat.time }} </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  chats: Array,
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #ff6b35;
  border-radius: 20px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;

}
</style>
