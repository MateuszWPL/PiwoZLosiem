import { ref } from 'vue';
import { io } from "socket.io-client";
import { user } from './fetchUserData';

const socket = ref(null);
const onlineUsers = ref([]); 
const userStatus = ref(null);

const VITE_SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:5000";

const initializeSocket = (token) => {
    if (socket.value && socket.value.connected) {
        return;
    }

    if (token) {
        const newSocket = io(VITE_SOCKET_URL, {
            auth: { token }
        });

        newSocket.on("connect", () => {
            socket.value = newSocket; 
        });

        newSocket.on("disconnect", () => {
            socket.value = null; 
            onlineUsers.value = []; 
        });

        newSocket.on('updateUserList', (users) => {
            onlineUsers.value = users;
        });
        newSocket.on("user_status", (data) => {
            userStatus.value = data.status;
        });

    } else {
        console.error("❌ Brak tokena, nie można zainicjować socketa.");
    }
};

const disconnectSocket = () => {
    if (socket.value) {
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
        updateLocation,
        userStatus,
    };
}