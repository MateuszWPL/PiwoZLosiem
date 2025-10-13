// socket/index.js
import { Server } from "socket.io";
import { verifySocketAuth } from "./utils/socketAuth.js";
import { handleConnection } from "./handlers/connectionHandler.js";
import { handleMessages } from "./handlers/messageHandler.js";
import { handleStatus } from "./handlers/statusHandler.js";

let io;

/**
 * Inicjalizuje Socket.io i rejestruje handler'y.
 * Zwraca instancję io.
 */
export const initSocket = (server) => {
  io = new Server(server, {
    cors: { origin: "*" },
  });

  // middleware auth
  io.use(async (socket, next) => {
    await verifySocketAuth(socket, next);
  });

  io.on("connection", (socket) => {
    // Każdy handler rejestruje swoje eventy
    handleConnection(io, socket);
    handleMessages(io, socket);
    handleStatus(io, socket);
  });

  console.log("✅ Socket.io zainicjalizowany (moduły)");
  return io;
};

export const getIo = () => {
  if (!io) throw new Error("Socket.io nie zainicjalizowany");
  return io;
};
