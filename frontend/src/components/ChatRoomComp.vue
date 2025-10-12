<template>
  <div class="flex flex-col h-full w-full">
    <div class="flex items-center gap-3 p-4 border-b border-secondaryGreen">
      <button @click="$emit('back')" class="p-2 rounded-full hover:bg-primaryGreen/50 xl:hidden">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <img :src="chat.avatarUrl" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
      <div class="flex flex-col">
        <span class="font-semibold text-white">{{ chat.name }}</span>
        <span class="text-secondaryGold text-sm">{{ chat.status }}</span>
      </div>
    </div>

    <div ref="messagesContainer" class="flex-1 overflow-y-auto p-4 space-y-3">
      <div
        v-for="message in chat.messages"
        :key="message.id"
        class="flex items-start"
        :class="message.user === currentUser ? 'justify-end' : 'justify-start'"
      >
        <img
          v-if="message.user !== currentUser"
          :src="message.avatarUrl || chat.avatarUrl"
          alt="Avatar"
          class="w-12 h-12 rounded-full object-cover mr-2 mt-1"
        />

        <div class="flex flex-col max-w-[calc(100%-3rem)]">
          <div
            :class="[ 'px-4 py-2 rounded-2xl break-words',
              message.user === currentUser ? 'bg-primaryOrange text-white ml-auto' : 'bg-primaryGreen text-white'
            ]"
          >
            {{ message.text }}
          </div>
          <span
            :class="['text-secondaryGold text-xs mt-1', message.user === currentUser ? 'text-right' : 'text-left']"
          >
            {{ message.time }}
          </span>
        </div>

        <img
          v-if="message.user === currentUser"
          :src="yourAvatarUrl"
          alt="Twój Avatar"
          class="w-12 h-12 rounded-full object-cover ml-2 mt-1"
        />
      </div>
    </div>

    <div class="p-4 flex items-center gap-2 border-t border-secondaryGreen">
      <input
        v-model="newMessage"
        type="text"
        placeholder="Napisz wiadomość..."
        class="flex-1 px-4 py-2 rounded-full border-2 border-secondaryGreen bg-tertiaryGreen font-semibold text-secondaryGold placeholder-secondaryGold focus:outline-none focus:ring-1 focus:ring-secondaryGold"
        @keyup.enter="sendMessage"
      />
      <button
        class="w-[42.5px] h-[42.5px] bg-primaryOrange text-white rounded-xl flex items-center justify-center"
        @click="sendMessage"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M17.9902 6.01009L5.39821 10.5631L9.59321 12.9911L13.2922 9.29109C13.4799 9.10358 13.7343 8.99829 13.9996 8.99839C14.2648 8.99848 14.5192 9.10395 14.7067 9.29159C14.8942 9.47923 14.9995 9.73367 14.9994 9.99894C14.9993 10.2642 14.8939 10.5186 14.7062 10.7061L11.0062 14.4061L13.4362 18.6001L17.9902 6.01009ZM18.3132 3.76609C19.5082 3.33309 20.6662 4.49109 20.2332 5.68609L14.9512 20.2911C14.5172 21.4891 12.8812 21.6351 12.2422 20.5321L9.02521 14.9741L3.46721 11.7571C2.36421 11.1181 2.51021 9.48209 3.70821 9.04809L18.3132 3.76609Z" fill="white"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, computed } from 'vue'
import { useChatStore } from '../stores/chatStore'

const props = defineProps({
  chatData: Object,
})

const emit = defineEmits(['back'])

const chatStore = useChatStore()
const currentUser = 'Ty'
const yourAvatarUrl = 'https://placehold.co/50x50'
const newMessage = ref('')
const messagesContainer = ref(null)

const chat = computed(() =>
  chatStore.getChatById(props.chatData?.id)
)

function sendMessage() {
  if (!newMessage.value.trim() || !chat.value) return

  const now = new Date()
  const timeString = `${now.getHours().toString().padStart(2, '0')}:${now
    .getMinutes()
    .toString()
    .padStart(2, '0')}`

  const message = {
    id: Date.now(),
    user: currentUser,
    text: newMessage.value,
    time: timeString,
  }

  chatStore.addMessage(chat.value.id, message)
  chat.value.lastMessage = `Ty: ${newMessage.value}`
  chat.value.time = timeString

  newMessage.value = ''

  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}
</script>
