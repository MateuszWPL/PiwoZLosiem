<template>
  <div class="flex-1 overflow-y-auto custom-scrollbar">
    <div
      v-for="chat in chats"
      :key="chat.id"
      class="flex items-center justify-between p-4 mt-4 border-2 border-secondaryGreen rounded-2xl mx-5 cursor-pointer transition-all duration-300"
      :class="[
        chat.unread
          ? 'bg-primaryOrange/30 animate-pulse shadow-md'
          : 'bg-tertiaryGreen hover:bg-primaryGreen'
      ]"
      @click="$emit('select', chat)"
    >
      <div class="flex items-center gap-3">
        <img :src="chat.photoUrl ? `${chat.photoUrl}` : '/images/defaultAvatar.png'" class="w-12 h-12 rounded-full object-cover"/>
        <div>
          <div class="font-semibold text-white">{{ chat.name }}</div>
          <div class="text-secondaryGold text-sm truncate">
            {{ chat.lastMessage }}
          </div>
        </div>
      </div>
      <div class="text-secondaryGold text-xs">{{ chat.time }}</div>
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
  width: 8px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #d4af37;
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
</style>
