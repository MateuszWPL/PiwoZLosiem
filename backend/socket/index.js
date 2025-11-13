import { Server } from "socket.io";
import { verifySocketAuth } from "./utils/socketAuth.js";
import { handleConnection } from "./handlers/connectionHandler.js";
import { handleMessages } from "./handlers/messageHandler.js";
import { handleStatus } from "./handlers/statusHandler.js";

let io;
const onlineUsers = {}; 

export const initSocket = (server) => {
    const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173"; 

    io = new Server(server, {
        cors: { 
            origin: FRONTEND_URL, 
            methods: ["GET", "POST"],
        },
    });

    io.use(async (socket, next) => {
        await verifySocketAuth(socket, next);
    });

    io.on("connection", (socket) => {
        handleConnection(io, socket, onlineUsers); 
        handleMessages(io, socket);
        handleStatus(io, socket, onlineUsers);
    });

    console.log(" Socket.io zainicjalizowany (moduły)");
    return io; 
};

export const getOnlineUsers = () => {
    return onlineUsers;
};

export const getIo = () => {
    if (!io) throw new Error("Socket.io nie zainicjalizowany");
    return io;
};