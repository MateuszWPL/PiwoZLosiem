import { Server } from "socket.io";
import { verifySocketAuth } from "./utils/socketAuth.js";
import { handleConnection } from "./handlers/connectionHandler.js";
import { handleMessages } from "./handlers/messageHandler.js";
import { handleStatus } from "./handlers/statusHandler.js";

let io;
// 1. Zmienna onlineUsers staje się prywatna wewnątrz modułu
const onlineUsers = {}; 

/**
 * Inicjalizuje Socket.io i rejestruje handler'y.
 * Zwraca instancję io.
 */
export const initSocket = (server) => {
  const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; 

  io = new Server(server, {
    cors: { 
        origin: FRONTEND_URL, 
        methods: ["GET", "POST"],
    },
  });

  // middleware auth
  io.use(async (socket, next) => {
    await verifySocketAuth(socket, next);
  });

  io.on("connection", (socket) => {
    // 2. Przekazujemy onlineUsers do handlerów
    handleConnection(io, socket, onlineUsers); 
    handleMessages(io, socket);
    handleStatus(io, socket, onlineUsers);
  });

  console.log("✅ Socket.io zainicjalizowany (moduły)");
  // 3. Zwracamy instancję io
  return io; 
};

// 4. Nowa funkcja do dostępu do listy onlineUsers
export const getOnlineUsers = () => {
    return onlineUsers;
};

export const getIo = () => {
  if (!io) throw new Error("Socket.io nie zainicjalizowany");
  return io;
};