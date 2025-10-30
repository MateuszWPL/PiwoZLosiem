import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/authRoutes.js";
import beerRoutes from "./routes/beerRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import achievementRoutes from "./routes/achievementRoutes.js";
import friendsRoutes from "./routes/friendsRoutes.js";
import { initSocket } from "./socket/index.js"; 
import Conversation from "./models/Conversation.js";

dotenv.config();

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ✅ Middleware
app.use(cors({
  origin: "http://localhost:5173", // port frontendu
  credentials: true,
}));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Połączono z bazą:", mongoose.connection.name))
  .catch((err) => console.error("❌ Błąd połączenia z MongoDB:", err));

// ✅ Trasy API
app.use("/api/auth", authRoutes);
app.use("/api/beers", beerRoutes);
app.use("/api", rankingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/achievements", achievementRoutes);
app.use("/api/friends", friendsRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/chat/messages", messageRoutes);

// ✅ Serwer HTTP + Socket.io
const server = http.createServer(app);
initSocket(server);

// ✅ Start
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Serwer działa na porcie ${PORT}`));
