import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import beerRoutes from "./routes/beerRoutes.js";
import { initializeSocket } from "./services/socket.js"; 
import { createServer } from 'http';
import Conversation from "./models/Conversation.js";

// Load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
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
