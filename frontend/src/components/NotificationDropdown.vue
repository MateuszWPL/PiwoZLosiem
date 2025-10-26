<template>
  <div class="relative">
    <button
      @click="toggleDropdown"
      class="border border-secondaryGold rounded-xl p-3 relative hover:bg-secondaryGold/20 transition-all duration-300"
    >
      <div
        v-if="unreadCount > 0"
        class="absolute bg-red-900 -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[12px]"
      >
        {{ unreadCount }}
      </div>

      <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16">
        <path
          d="M4 5.3335C4 4.27263 4.42143 3.25521 5.17157 2.50507C5.92172 1.75492 6.93913 1.3335 8 1.3335C9.06087 1.3335 10.0783 1.75492 10.8284 2.50507C11.5786 3.25521 12 4.27263 12 5.3335C12 10.0002 14 11.3335 14 11.3335H2C2 11.3335 4 10.0002 4 5.3335Z"
          stroke="#A89E8A"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M6.86719 14C6.97878 14.203 7.14282 14.3722 7.34218 14.4901C7.54154 14.608 7.76891 14.6702 8.00052 14.6702C8.23213 14.6702 8.4595 14.608 8.65886 14.4901C8.85822 14.3722 9.02227 14.203 9.13385 14"
          stroke="#A89E8A"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <div
      v-if="open"
      class="absolute left-0 mt-2 w-64 bg-gradient-to-b from-secondaryGreen to-primaryGreen rounded-xl shadow-lg z-50"
    >
      <div class="p-3 border-b border-secondaryGold/20 flex justify-between items-center">
        <p class="text-sm font-semibold text-secondaryGold">Powiadomienia</p>
        <button @click="markAllAndClose" class="text-xs text-gray-400 hover:text-gray-300">
          Oznacz jako przeczytane
        </button>
      </div>

      <div v-if="latestNotifications.length > 0">
        <div
          v-for="n in latestNotifications"
          :key="n.id"
          class="p-3 text-sm text-white hover:bg-secondaryGold/10 transition-all duration-200"
        >
          <p>{{ n.message }}</p>
          <p class="text-[10px] text-gray-400">{{ formatDate(n.createdAt) }}</p>
        </div>
      </div>
      <div v-else class="p-3 text-center text-gray-400 text-sm">Brak nowych powiadomień</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useNotifications } from '@/composables/useNotifications'

const { unreadCount, latestNotifications, markAllAsRead } = useNotifications()
const open = ref(false)

const toggleDropdown = () => {
  open.value = !open.value
}

const markAllAndClose = () => {
  markAllAsRead()
  toggleDropdown()
}

const formatDate = (date) => {
  return new Date(date).toLocaleString('pl-PL', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>
