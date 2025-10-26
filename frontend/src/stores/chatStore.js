import { defineStore } from 'pinia';
import { ref, computed } from 'vue';

export const useChatStore = defineStore('chat', () => {
  const chats = ref([
    {
      id: 1,
      name: "Miłosz S",
      avatarUrl: "https://placehold.co/50x50",
      status: "Online",
      lastMessage: "Miłosz: Hej",
      time: "10:05",
      messages: [
        { id: 1, user: 'Ty', text: 'Cześć', time: '10:00' },
        { id: 2, user: 'Miłosz', text: 'Hej', time: '10:05' }
      ]
    },
    {
      id: 2,
      name: "Adam R",
      avatarUrl: "https://placehold.co/50x50",
      status: "Offline",
      lastMessage: "Adam: Hej",
      time: "09:42",
      messages: [
        { id: 1, user: 'Ty', text: 'Siema', time: '09:40' },
        { id: 2, user: 'Adam', text: 'Hej', time: '09:42' }
      ]
    },
    {
      id: 3,
      name: "Marta S",
      avatarUrl: "https://placehold.co/50x50",
      status: "Online",
      lastMessage: "Marta: Siema",
      time: "08:05",
      messages: [
        { id: 1, user: 'Ty', text: 'Hej', time: '08:00' },
        { id: 2, user: 'Marta', text: 'Siema', time: '08:05' }
      ]
    },
  ]);

  const getChatById = (id) => chats.value.find(c => c.id === id);

  const addMessage = (chatId, message) => {
    const chat = getChatById(chatId);
    if (!chat) return;
    chat.messages.push(message);
  };

  const addNewChat = (name) => {
    const newId = Date.now();
    const newChat = {
      id: newId,
      name: name || `Nazwa ${newId}`,
      avatarUrl: 'https://placehold.co/50x50',
      lastMessage: '',
      time: '',
      status: 'Online',
      messages: []
    };
    chats.value.unshift(newChat);
    return newChat;
  };
/*
   const chatsWithMeta = computed(() => {
    return chats.value.map(chat => {
      const last = chat.messages[chat.messages.length - 1];
      return {
        ...chat,
        lastMessage: last ? `${last.user}: ${last.text}` : '',
        time: last ? last.time : ''
      };
    });
  }); */

  return { chats, /* chatsWithMeta, */ getChatById, addMessage, addNewChat };
});
