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
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { initializeSocket } from "./socket/index.js"; 
import { createServer } from 'http';
import Conversation from "./models/Conversation.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";

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

    // 🔌 Inicjalizacja Socket.io
    const server = createServer(app);
    initializeSocket(server);
    server.listen(5000, () => console.log("🚀 Serwer działa na porcie 5000"));
  })
  .catch((err) => console.error("❌ Błąd połączenia:", err));

app.use("/api/auth", authRoutes);
app.use("/api/beers", beerRoutes);
app.use("/api", rankingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/achievements", achievementRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use("/api/chat", chatRoutes);
app.use("/api/chat/messages", messageRoutes);


// Start the server on port 5000
server.listen(process.env.PORT ||5000, () => console.log("Serwer działa na porcie 5000"));
