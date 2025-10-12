<template>
  <div class="flex h-screen w-full bg-gradient-to-b from-primaryGreen/0 to-primaryGreen/50 xl:flex-row">

    <Navbar />

    <div class="flex-1 xl:hidden p-4 flex flex-col gap-2 pt-20">
      <h1 class="font-semibold text-2xl text-white pt-10">Wiadomości</h1>

      <div class="flex items-center gap-4 pt-4 px-5">
        <div class="relative flex-1">
          <svg 
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none text-secondaryGold"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="#A89E8A"/>
          </svg>

          <input
            v-model="search"
            type="text"
            placeholder="Szukaj..."
            class="pl-10 pr-4 py-2 border-2 border-secondaryGreen bg-tertiaryGreen text-secondaryGold placeholder-secondaryGold font-semibold rounded-2xl focus:outline-none focus:ring-1 focus:ring-secondaryGold w-full"
          />
        </div>

        <button @click="addNewChat" class="w-[42.5px] h-[42.5px] bg-primaryOrange text-white font-semibold rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="white"/>
          </svg>
        </button>
      </div>

      <ChatListComp :chats="filteredChats" @select="goToChatRoom" />
    </div>

    <div class="hidden xl:flex flex-1 flex-col">
      <div class="p-4 flex items-center gap-4 border-b border-secondaryGreen">
        <div class="relative flex-1">
          <svg 
            class="absolute left-3 top-1/2 transform -translate-y-1/2 w-6 h-6 pointer-events-none text-secondaryGold"
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M19.6 21L13.3 14.7C12.8 15.1 12.225 15.4167 11.575 15.65C10.925 15.8833 10.2333 16 9.5 16C7.68333 16 6.146 15.3707 4.888 14.112C3.63 12.8533 3.00067 11.316 3 9.5C2.99933 7.684 3.62867 6.14667 4.888 4.888C6.14733 3.62933 7.68467 3 9.5 3C11.3153 3 12.853 3.62933 14.113 4.888C15.373 6.14667 16.002 7.684 16 9.5C16 10.2333 15.8833 10.925 15.65 11.575C15.4167 12.225 15.1 12.8 14.7 13.3L21 19.6L19.6 21ZM9.5 14C10.75 14 11.8127 13.5627 12.688 12.688C13.5633 11.8133 14.0007 10.7507 14 9.5C13.9993 8.24933 13.562 7.187 12.688 6.313C11.814 5.439 10.7513 5.00133 9.5 5C8.24867 4.99867 7.18633 5.43633 6.313 6.313C5.43967 7.18967 5.002 8.252 5 9.5C4.998 10.748 5.43567 11.8107 6.313 12.688C7.19033 13.5653 8.25267 14.0027 9.5 14Z" fill="#A89E8A"/>
          </svg>

          <input
            v-model="search"
            type="text"
            placeholder="Szukaj..."
            class="pl-10 pr-4 py-2 border-2 border-secondaryGreen bg-tertiaryGreen text-secondaryGold placeholder-secondaryGold font-semibold rounded-2xl focus:outline-none focus:ring-1 focus:ring-secondaryGold w-full"
          />
        </div>

        <button @click="addNewChat" class="w-[42.5px] h-[42.5px] bg-primaryOrange text-white font-semibold rounded-xl flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99805H13V10.998H19V12.998Z" fill="white"/>
          </svg>
        </button>
      </div>

      <div class="flex flex-1">
        <div class="w-1/3 border-r border-secondaryGreen">
          <ChatListComp :chats="filteredChats" @select="selectedChat = $event" />
        </div>

        <div class="flex-1">
          <ChatRoomComp
            v-if="selectedChat"
            :chatData="chats.find(c => c.id === selectedChat.id)"
            @back="selectedChat = null"
            />
          <div v-else class="flex items-center justify-center h-full text-secondaryGold">
            Wybierz czat
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import Navbar from '../components/Navbar.vue';
import ChatListComp from '../components/ChatListComp.vue';
import ChatRoomComp from '../components/ChatRoomComp.vue';
import { useChatStore } from '../stores/chatStore';

const router = useRouter();
const search = ref('');
const chatStore = useChatStore();
const chats = ref(chatStore.chats);
   
const selectedChat = ref(null);

const filteredChats = computed(() => {
  if (!search.value.trim()) return chats.value;
  return chats.value.filter(chat =>
    chat.name.toLowerCase().includes(search.value.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(search.value.toLowerCase())
  );
});

// mobilka
function goToChatRoom(chat) {
    selectedChat.value = chat;
    router.push({ name: 'ChatRoom', params: { id: chat.id } });
}

function addNewChat() {
  const newChat = chatStore.addNewChat();
  selectedChat.value = newChat;
}

</script>
