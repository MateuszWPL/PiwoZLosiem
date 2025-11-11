import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { getSocket, initSocket } from '../plugins/socket';
import axios from '@/api/api.js'

export const useChatStore = defineStore('chat', () => {
    const chats = ref([]);
    const loading = ref(false);
    const error = ref(null);
    const myAvatar = ref(localStorage.getItem('photoUrl') || '/images/defaultAvatar.png');

    const setMyAvatar = (url) => {
        myAvatar.value = url || '/images/defaultAvatar.png';
        localStorage.setItem('photoUrl', myAvatar.value);
    };

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
    
    // Funkcja do pobierania lokalnego imienia (do wyświetlania "Ty")
    const getCurrentUserImie = () => localStorage.getItem('imie') || 'Ty';

    // 🧠 Połączenie z Socket.IO i nasłuchiwanie na nowe wiadomości
    const setupSocketListeners = () => {
        const socket = getSocket() || initSocket();

        socket.on('newMessage', (message) => {
            console.log('📩 Nowa wiadomość:', message);

            const chat = chats.value.find(c => String(c.id) === String(message.chatId || message.conversationId));
            
            if (chat) {
                const msg = {
                    id: message._id || Date.now(),
                    userId: String(message.sender?._id || message.senderId),
                    text: message.text || '',
                    time: new Date(message.createdAt || Date.now()).toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' }),
                    avatarUrl: message.sender?.photoUrl || undefined, 
                };
                
                addMessage(chat.id, msg);
            } else {
                console.warn('⚠️ Otrzymano wiadomość do nieznanego czatu:', message.chatId);
            }
        });
    };

    const defaultAvatar = '/images/defaultAvatar.png';

    const fetchChats = async () => {
        loading.value = true;
        error.value = null;

        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(`/chat/conversations`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            const meId = getUserIdFromToken(token);

            chats.value = Array.isArray(res.data)
                ? res.data.map((conv) => {
                    const participants = conv.participants || [];
                    const lastMsg = conv.lastMessage || null;

                    let name = '';
                    let photoUrl = defaultAvatar;

                    if (conv.isGroup) {
                        name = conv.groupName || 'Grupa';
                        photoUrl = 'https://placehold.co/50x50?text=GR';
                    } else {
                        const other = participants.find((p) => String(p._id) !== String(meId));
                        name =
                            other && (other.imie || other.nazwisko)
                                ? `${other.imie || ''} ${other.nazwisko || ''}`.trim()
                                : 'Nieznajomy';
                        // budowanie pełnego URL do avatara
                        if (other?.photoUrl) {
                            photoUrl = other.photoUrl;
                        } else {
                            photoUrl = defaultAvatar;
                        }
                    }

                    const lastSender =
                        typeof lastMsg?.sender === 'object'
                            ? `${lastMsg.sender.imie || ''} ${lastMsg.sender.nazwisko || ''}`.trim()
                            : 'Ktoś';

                    return {
                        id: conv._id || conv.id || String(Date.now()),
                        name,
                        photoUrl,
                        lastMessage: lastMsg
                            ? `${lastSender}: ${lastMsg.text ?? ''}`
                            : 'Brak wiadomości',
                        time: conv.updatedAt
                            ? new Date(conv.updatedAt).toLocaleTimeString('pl-PL', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : '',
                        participants,
                        messages: [],
                        isGroup: conv.isGroup || false,
                        groupName: conv.groupName || null,
                        unread: conv.hasUnread || conv.unreadCount > 0,
                        unreadCount: conv.unreadCount || 0,
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
                '/chat/conversations',
                { partnerId },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const conv = res.data;
            const meId = getUserIdFromToken(token);
            const other = (conv.participants || []).find((p) => String(p._id || p) !== String(meId));

            const newChat = {
                id: conv._id,
                name: typeof other === 'object'
                    ? `${other.imie || ''} ${other.nazwisko || ''}`.trim() || 'Nowa rozmowa'
                    : 'Nowa rozmowa',
                photoUrl: (other && other.photoUrl) || defaultAvatar,
                lastMessage: '',
                time: '',
                participants: conv.participants || [],
                messages: [],
                isGroup: conv.isGroup || false,
                groupName: conv.groupName || null,
                unread: false,
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

        const myId = getCurrentUserId();
        
        let senderName = 'Ktoś';

        // Określenie nazwy nadawcy dla lastMessage
        if (String(message.userId) === String(myId)) {
            senderName = getCurrentUserImie(); 
        } else {
            const participant = chat.participants.find(p => String(p._id) === String(message.userId));
            if (participant) {
                senderName = `${participant.imie || ''} ${participant.nazwisko || ''}`.trim() || 'Ktoś';
            }
        }
        
        // Dodanie wiadomości do listy
        chat.messages.push(message);
        
        // Aktualizacja lastMessage
        const prefix = (String(message.userId) === String(myId)) ? 'Ty' : senderName;
        chat.lastMessage = `${prefix}: ${message.text || ''}`;

        chat.time = message.time || new Date().toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
        
        // Jeśli wiadomość nie jest od nas oznacz konwersację jako nieprzeczytaną
        if (String(message.userId) !== String(myId)) {
            chat.unread = true;
            chat.unreadCount = (chat.unreadCount || 0) + 1;
        }
        
        // Przenieś na górę
        chats.value = [chat, ...chats.value.filter(c => c.id !== chat.id)];
    };

    const fetchMessages = async (conversationId) => {
        if (!conversationId) return [];

        try {
            const token = localStorage.getItem('token');
            const res = await axios.get(
                `/chat/messages/${conversationId}?page=1&limit=50`,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const messages = (res.data?.messages || []).reverse(); // od najstarszej do najnowszej

            const chat = getChatById(conversationId);
            const myId = getCurrentUserId();
            if (chat) {
                const chatPhotoUrl = chat.photoUrl;
                chat.messages = messages.map((m) => {
                    const senderId = String(m.sender._id);
                    let messageAvatarUrl = undefined;
                    if (senderId !== myId) {
                        messageAvatarUrl = chatPhotoUrl;
                        
                        if (chat.isGroup) {
                            const senderParticipant = chat.participants.find(p => String(p._id) === senderId);
                            messageAvatarUrl = senderParticipant?.photoUrl || chatPhotoUrl;
                        }
                    }
                    return{
                        id: m._id,
                        text: m.text,
                        userId: String(m.sender._id),
                        avatarUrl: messageAvatarUrl, 
                        time: new Date(m.createdAt).toLocaleTimeString('pl-PL', {
                            hour: '2-digit',
                            minute: '2-digit',
                        }),
                    }
                });
            }

            return messages;
        } catch (err) {
            console.error('❌ Błąd pobierania wiadomości:', err);
            return [];
        }
    };
E
    const markConversationAsRead = async (conversationId) => {
  try {
      const token = localStorage.getItem('token');
      
      const response = await axios.post(`/chat/conversations/${conversationId}/read`, {}, {
          headers: { Authorization: `Bearer ${token}` },
      });


      const chat = chats.value.find(c => String(c.id) === String(conversationId));
      if (chat) {
          chat.unread = false;
          chat.unreadCount = 0;
      } else {
          console.log('❌ Nie znaleziono czatu o ID:', conversationId);
      }
  } catch (err) {
      console.error('❌ Błąd oznaczania jako przeczytane:', err);
      const chat = chats.value.find(c => String(c.id) === String(conversationId));
      if (chat) {
          chat.unread = false;
          chat.unreadCount = 0;
      }
  }
};


    const setChats = (arr) => {
        chats.value = Array.isArray(arr) ? arr : [];
    };

    const unreadConversationsCount = computed(() => {
        return chats.value.filter(chat => chat.unread).length;
    });

    const totalUnreadMessagesCount = computed(() => {
        return chats.value.reduce((total, chat) => {
            return total + (chat.unreadCount || (chat.unread ? 1 : 0));
        }, 0);
    });

    const updateUnreadStatus = (conversationId, hasUnread) => {
        const chat = chats.value.find(c => String(c.id) === String(conversationId));
        if (chat) {
            chat.unread = hasUnread;
            if (hasUnread) {
                chat.unreadCount = (chat.unreadCount || 0) + 1;
            }
        }
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
        setupSocketListeners,
        getCurrentUserImie, 
        myAvatar,
        setMyAvatar,
        unreadConversationsCount,
        totalUnreadMessagesCount, 
        markConversationAsRead,
        updateUnreadStatus,
    };
});