<template>
  <div class="h-screen w-full">
    <ChatRoomComp v-if="chat" :chatData="chat" @back="goBack" />
    <div v-else class="flex items-center justify-center h-full text-white">
      Wczytywanie czatu...
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ChatRoomComp from '../components/ChatRoomComp.vue';

const route = useRoute();
const router = useRouter();

// Pobierz czat z chatStore na podstawie ID z parametru
import { useChatStore } from '../stores/chatStore';
import { computed } from 'vue';

const chatStore = useChatStore();
const chat = computed(() => chatStore.getChatById(Number(route.params.id)));

onMounted(() => {
  if (!chat.value) router.push({ name: 'Chat' });
});

function goBack() {
  router.push({ name: 'Chat' });
}
</script>
