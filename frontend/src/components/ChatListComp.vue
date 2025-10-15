<template>
  <div class="flex-1 overflow-y-auto">
    <div
      v-for="chat in chats"
      :key="chat.id"
      class="flex items-center justify-between p-4 mt-4 bg-tertiaryGreen border-2 border-secondaryGreen hover:bg-primaryGreen rounded-2xl mx-5 cursor-pointer"
      @click="$emit('select', chat)"
    >
      <div class="flex items-center gap-3">
        <img :src="chat.avatarUrl" alt="Avatar" class="w-12 h-12 rounded-full object-cover border border-primaryOrange" />
        <div>
          <div class="font-semibold text-white">{{ chat.name }}</div>
          <div class="text-secondaryGold text-sm truncate">{{ chat.lastMessage }}</div>
        </div>
      </div>
      <div class="text-secondaryGold text-xs">{{ chat.time }}</div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  chats: Array
});
</script>
