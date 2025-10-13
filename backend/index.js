import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import path from 'path';
import { fileURLToPath } from 'url';

import authRoutes from "./routes/authRoutes.js";
import beerRoutes from "./routes/beerRoutes.js";
import { initializeSocket } from "./services/socket.js"; 
import { createServer } from 'http';
import rankingRoutes from "./routes/rankingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import friendsRoutes from "./routes/friendsRoutes.js";
import Conversation from "./models/Conversation.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Pamiętaj, aby ustawić poprawny adres URL frontendu
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("✅ Połączono z bazą:", mongoose.connection.name);

    // 🔍 Wypisz rozmowy
    const conversations = await Conversation.find({});
    console.log("📦 Wszystkie rozmowy w bazie:");
    conversations.forEach((conv) => {
      console.log(`- ID: ${conv._id}, uczestnicy: ${conv.participants.join(", ")}`);
    });

    // 🆕 Utwórz nową rozmowę testową
    const newConversation = await Conversation.create({
      participants: ["68ed1fbe28a9923b25018514"],
    });
    console.log("🆕 Nowa rozmowa:", newConversation._id);

    // 🔌 Inicjalizacja Socket.io
    const server = createServer(app);
    initializeSocket(server);
    server.listen(5000, () => console.log("🚀 Serwer działa na porcie 5000"));
  })
  .catch((err) => console.error("❌ Błąd połączenia:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/beers", beerRoutes);
app.use("/api", rankingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/achievements", achievementRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/friends', friendsRoutes);

let onlineUsers = {};

io.on("connection", (socket) => {
  console.log(`🔌 Użytkownik połączony przez Socket.IO: ${socket.id}`);

  socket.on("updateLocation", (locationData) => {
    onlineUsers[socket.id] = {
      id: socket.id,
      ...locationData,
    };
    io.emit("updateUserList", Object.values(onlineUsers));
  });

  socket.on("disconnect", () => {
    console.log(`👋 Użytkownik rozłączony: ${socket.id}`);
    delete onlineUsers[socket.id];
    io.emit("updateUserList", Object.values(onlineUsers));
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Serwer z Socket.IO działa na porcie ${PORT}`));

