import { ref } from 'vue';
import { io } from "socket.io-client";

const socket = ref(null);
const onlineUsers = ref([]); 

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const initializeSocket = (token) => {
    if (socket.value && socket.value.connected) {
        console.log("🔌 (Global) Socket już połączony.");
        return;
    }

    if (token) {
        console.log("🔌 (Global) Tworzę nowe połączenie socket...");
        const newSocket = io(VITE_SOCKET_URL, {
            auth: { token }
        });

        newSocket.on("connect", () => {
            console.log("🔌 (Global) Połączono z Socket.IO:", newSocket.id);
            socket.value = newSocket; 
        });

        newSocket.on("disconnect", () => {
            console.log("👋 (Global) Rozłączono z Socket.IO");
            socket.value = null; 
            onlineUsers.value = []; 
        });

        newSocket.on('updateUserList', (users) => {
            console.log("📡 (Global) Odebrano listę użytkowników:", users);
            onlineUsers.value = users;
        });

    } else {
        console.error("❌ Brak tokena, nie można zainicjować socketa.");
    }
};

const disconnectSocket = () => {
    if (socket.value) {
        console.log("👋 (Global) Wymuszam rozłączenie socketa.");
        socket.value.disconnect();
        socket.value = null;
        onlineUsers.value = [];
    }
};

const updateLocation = (locationData) => {
    if (socket.value && socket.value.connected) {
        socket.value.emit('updateLocation', locationData);
    } else {
        console.warn("Socket nie połączony. Nie można wysłać lokalizacji.");
    }
};

export function useSocket() {
    return {
        socket,
        onlineUsers,
        initializeSocket,
        disconnectSocket,
        updateLocation
    };
}