// frontend/src/stores/chatStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useChatStore = defineStore('chat', () => {
  const chats = ref([]);
  const loading = ref(false);
  const error = ref(null);

  // 🔍 Odczyt userId z tokena JWT
  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.id || payload._id || null;
    } catch {
      return null;
    }
  };

  const getCurrentUserId = () => {
    return getUserIdFromToken(localStorage.getItem('token'));
  };

  // 📥 Pobierz rozmowy użytkownika z backendu
  const fetchChats = async () => {
    loading.value = true;
    error.value = null;

    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/chat/conversations', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const meId = getUserIdFromToken(token);

      chats.value = Array.isArray(res.data)
        ? res.data.map((conv) => {
            const participants = conv.participants || [];

            // Znajdź drugą osobę w rozmowie
            const other = participants.find((p) => {
              if (!p) return false;
              return String(p._id || p) !== String(meId);
            });

            const lastMsg = conv.lastMessage || null;
            const lastSender =
              typeof lastMsg?.sender === 'object'
                ? `${lastMsg.sender.imie || ''} ${lastMsg.sender.nazwisko || ''}`.trim()
                : 'Ktoś';

            return {
              id: conv._id || conv.id || String(Date.now()),
              name:
                typeof other === 'object'
                  ? `${other.imie || ''} ${other.nazwisko || ''}`.trim() || 'Nieznajomy'
                  : 'Nieznajomy',
              avatarUrl: (typeof other === 'object' && other.avatarUrl) || 'https://placehold.co/50x50',
              lastMessage: lastMsg
                ? `${lastSender}: ${lastMsg.text ?? ''}`
                : 'Brak wiadomości',
              time: conv.updatedAt
                ? new Date(conv.updatedAt).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' })
                : '',
              participants,
              messages: [],
            };
          })
        : [];
    } catch (err) {
      console.error('❌ Błąd pobierania czatów:', err);
      error.value = err?.response?.data?.error || err?.message || 'Nie udało się pobrać rozmów';
    } finally {
      loading.value = false;
    }
  };

  // 🆕 Tworzenie nowej rozmowy
  const createConversation = async (partnerId) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        'http://localhost:5000/api/chat/conversations',
        { partnerId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const conv = res.data;
      const meId = getUserIdFromToken(token);
      const other = (conv.participants || []).find((p) => String(p._id || p) !== String(meId));

      const newChat = {
        id: conv._id,
        name:
          typeof other === 'object'
            ? `${other.imie || ''} ${other.nazwisko || ''}`.trim() || 'Nowa rozmowa'
            : 'Nowa rozmowa',
        avatarUrl: (other && other.avatarUrl) || 'https://placehold.co/50x50',
        lastMessage: '',
        time: '',
        participants: conv.participants || [],
        messages: [],
      };

      chats.value.unshift(newChat);
      return conv;
    } catch (err) {
      console.error('❌ Błąd tworzenia rozmowy:', err);
      throw err;
    }
  };

  // 🔎 Znajdź czat po ID
  const getChatById = (id) => {
    if (!id) return null;
    return chats.value.find((c) => String(c.id) === String(id) || String(c._id) === String(id)) || null;
  };

  // 💬 Dodanie wiadomości lokalnie
  const addMessage = (chatId, message) => {
    const chat = getChatById(chatId);
    if (!chat) return;

    if (!Array.isArray(chat.messages)) chat.messages = [];

    const senderName =
      typeof message.user === 'object'
        ? `${message.user.imie || ''} ${message.user.nazwisko || ''}`.trim() || 'Ktoś'
        : message.user || 'Ktoś';

    chat.messages.push(message);
    chat.lastMessage = `${senderName}: ${message.text || ''}`;
    chat.time = message.time || new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  };

// Pobierz wiadomości konkretnej rozmowy
const fetchMessages = async (conversationId) => {
  if (!conversationId) return [];

  try {
    const token = localStorage.getItem('token');
    const res = await axios.get(
      `http://localhost:5000/api/chat/messages/${conversationId}?page=1&limit=50`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const messages = (res.data?.messages || []).reverse(); // od najstarszej do najnowszej

    const chat = getChatById(conversationId);
    if (chat) {
      chat.messages = messages.map((m) => ({
        id: m._id,
        text: m.text,
        user: `${m.sender.imie} ${m.sender.nazwisko}`,
        userId: m.sender._id,
        time: new Date(m.createdAt).toLocaleTimeString('pl-PL', {
          hour: '2-digit',
          minute: '2-digit',
        }),
      }));
    }

    return messages;
  } catch (err) {
    console.error('❌ Błąd pobierania wiadomości:', err);
    return [];
  }
};


  const setChats = (arr) => {
    chats.value = Array.isArray(arr) ? arr : [];
  };

  return {
    chats,
    loading,
    error,
    fetchChats,
    fetchMessages,
    createConversation,
    getChatById,
    addMessage,
    setChats,
    getCurrentUserId,
  };
});
