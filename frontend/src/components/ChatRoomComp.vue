<template>
  <div class="flex flex-col h-full w-full min-w-0"
  :class="isMobile ? 'bg-gradient-to-b from-primaryGreen/0 to-primaryGreen/50' : ''"  v-if="chat">
    <div class="flex items-center gap-3 p-4 border-b border-secondaryGreen flex-shrink-0 min-w-0">
      <button @click="$emit('back')" class="p-2 rounded-full hover:bg-primaryGreen/50 xl:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <img :src="chat.photoUrl || defaultAvatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover flex-shrink-0" />
      <div class="flex flex-col min-w-0 flex-1">
        <span class="font-semibold text-white truncate">{{ chat.name || 'Nieznajomy' }}</span>
        <span class="text-secondaryGold text-sm truncate">{{ chat.status || '' }}</span>
      </div>
    </div>

    <div
      ref="messagesContainer"
      class="flex-1 overflow-y-auto p-4 space-y-3 min-w-0 scrollbar-thin scrollbar-thumb-primaryOrange scrollbar-track-tertiaryGreen"
      style="scroll-behavior: smooth; max-height: calc(100vh - 240px);"
    >

     <div v-if="!chat.messages || chat.messages.length === 0" class="flex flex-col items-center justify-center h-full text-center py-8">
        <div class="text-secondaryGold text-xl mb-2">🍻</div>
        <div class="text-secondaryGold text-lg font-semibold">
            Nie ma lepszego początku rozmowy niż "Idziemy na piwo?" 🍺
        </div>
        <div class="text-secondaryGold/70 text-sm mt-2">
           Albo zapytaj "Ile dzisiaj pijemy?"
        </div>
      </div>

      <div
        v-for="message in chat.messages"
        :key="message.id"
        class="flex items-start min-w-0"
        :class="message.userId === currentUserId ? 'justify-end' : 'justify-start'"
      >
        <img
          v-if="message.userId !== currentUserId"
          :src="message.avatarUrl || chat.photoUrl || defaultAvatar"
          alt="Avatar"
          class="w-10 h-10 rounded-full object-cover mr-2 mt-1 flex-shrink-0"
        />

        <div class="flex flex-col max-w-[60%] min-w-0">
          <div
            :class="[ 'px-4 py-2 rounded-2xl break-words min-w-0 max-w-full',
              message.userId === currentUserId ? 'bg-primaryOrange text-white ml-auto' : 'bg-primaryGreen text-white'
            ]"
            style="word-wrap: break-word; overflow-wrap: break-word;"
          >
            <div class="whitespace-pre-wrap break-words">{{ message.text }}</div>
          </div>
          <span
            :class="['text-secondaryGold text-xs mt-1', message.userId === currentUserId ? 'text-right' : 'text-left']"
          >
            {{ message.time }}
          </span>
        </div>

        <img v-if="message.userId === currentUserId"
          :src="yourAvatarUrl || defaultAvatar"
          alt="Twój avatar"
          class="w-10 h-10 rounded-full object-cover ml-2 mt-1 flex-shrink-0"
        />
      </div>
    </div>

    <div class="p-4 flex items-center gap-2 border-t border-secondaryGreen flex-shrink-0 min-w-0">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Napisz wiadomość..."
        class="flex-1 px-4 py-2 rounded-full border-2 border-secondaryGreen bg-tertiaryGreen font-semibold text-secondaryGold placeholder-secondaryGold focus:outline-none focus:ring-1 focus:ring-secondaryGold min-w-0"
        @keyup.enter="sendMessage"
      />
      <button
        class="w-[42.5px] h-[42.5px] bg-primaryOrange text-white rounded-xl flex items-center justify-center flex-shrink-0"
        @click="sendMessage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9902 6.01009L5.39821 10.5631L9.59321 12.9911L13.2922 9.29109C13.4799 9.10358 13.7343 8.99829 13.9996 8.99839C14.2648 8.99848 14.5192 9.10395 14.7067 9.29159C14.8942 9.47923 14.9995 9.73367 14.9994 9.99894C14.9993 10.2642 14.8939 10.5186 14.7062 10.7061L11.0062 14.4061L13.4362 18.6001L17.9902 6.01009ZM18.3132 3.76609C19.5082 3.33309 20.6662 4.49109 20.2332 5.68609L14.9512 20.2911C14.5172 21.4891 12.8812 21.6351 12.2422 20.5321L9.02521 14.9741L3.46721 11.7571C2.36421 11.1181 2.51021 9.48209 3.70821 9.04809L18.3132 3.76609Z" fill="white"/>
        </svg>
      </button>
    </div>
  </div>

  <!-- fallback gdy chat nie istnieje -->
  <div v-else class="flex items-center justify-center h-full text-secondaryGold">
    Wybierz rozmowę
  </div>
</template>

<script setup>
import { ref, nextTick, computed, onMounted, onUnmounted, watch } from 'vue'
import { useChatStore } from '../stores/chatStore'
import { getSocket } from '../plugins/socket'

const defaultAvatar = '/images/defaultAvatar.png'
const yourAvatarUrl = computed(() => chatStore.myAvatar || '/images/defaultAvatar.png')
const isMobile = ref(false)

const checkIsMobile = () => {
  isMobile.value = window.innerWidth < 1280 
}

const socket = getSocket && typeof getSocket === 'function' ? getSocket() : null

const props = defineProps({
  chatData: Object,
})
const emit = defineEmits(['back'])

const chatStore = useChatStore()

const currentUserId = chatStore.getCurrentUserId()

const newMessage = ref('')
const messagesContainer = ref(null)

const chat = computed(() => {
  if (!props.chatData?.id) return null
  return chatStore.getChatById(props.chatData.id)
})

const tryJoinConversation = () => {
  if (!socket) {
    console.warn('Socket nie zainicjalizowany — nie można join_conversation')
    return
  }
  const convId = chat.value?.id
  if (convId) {
    socket.emit('join_conversation', { conversationId: convId })
  }
}

const onNewMessage = (message) => {
  const convId = message?.conversationId || message?.conversation || chat.value?.id
  if (!convId) {
    console.warn('Otrzymano new_message bez conversationId:', message)
    return
  }
  const senderId = String(
      message.sender._id ||
      'unknown' 
  );

  if (senderId === currentUserId) {
    return
  }
  const msg = {
    id: message._id || Date.now(),
    userId: senderId,
    text: message.text || '',
    time: message.time || new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
    avatarUrl: chat.value?.photoUrl || defaultAvatar,
  }

  chatStore.addMessage(convId, msg)
}

const onJoinedConversation = (data) => {
  console.log('joined_conversation:', data)
}

const onErrorMessage = (err) => {
  console.warn('server error_message:', err)
}

onMounted(() => {
  checkIsMobile()
  window.addEventListener('resize', checkIsMobile)

  if (props.chatData?.id) {
  chatStore.fetchMessages(props.chatData.id)
  }
  tryJoinConversation()

  if (socket) {
    socket.on('new_message', onNewMessage)
    socket.on('joined_conversation', onJoinedConversation)
    socket.on('eUrlrror_message', onErrorMessage)
  } else {
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', checkIsMobile)
  if (!socket) return
  socket.off('new_message', onNewMessage)
  socket.off('joined_conversation', onJoinedConversation)
  socket.off('error_message', onErrorMessage)

  const convId = chat.value?.id
  if (convId) {
    socket.emit('leave_conversation', { conversationId: convId })
  }
})

watch(
  () => chat.value && chat.value?.messages && chat.value?.messages?.length,
  async () => {
    await nextTick()
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }
)
watch(
  () => props.chatData?.id,
  (newId, oldId) => {
    if (newId && newId !== oldId) {
      chatStore.fetchMessages(newId)
      tryJoinConversation() 
    }
  },
  { immediate: true } 
)

function sendMessage() {
  if (!newMessage.value.trim() || !chat.value) return

  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

  const convId = chat.value.id

  const localMsg = {
    id: Date.now(),
    userId: currentUserId,
    text: newMessage.value,
    time: timeString,
    avatarUrl: yourAvatarUrl,
  }
  chatStore.addMessage(convId, localMsg)

  const payload = {
    conversationId: convId,
    text: newMessage.value,
  }

  if (socket) {
    socket.emit('send_message', payload)
  } else {
    console.warn('Socket nie dostępny, wiadomość nie została wysłana na serwer')
  }
  
  newMessage.value = ''
    nextTick(() => {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  })

}
</script>
<style scoped>

</style>