import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import beerRoutes from "./routes/beerRoutes.js";
import { initSocket } from "./services/socket.js"; 
import { createServer } from 'http';

// Load environment variables
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Połączono z bazą:", mongoose.connection.name))
  .catch((err) => console.error("❌ Błąd połączenia:", err));

const server = createServer(app);
server.listen(5000);

// Inicjalizacja Socket.io
initSocket(server);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/beers", beerRoutes);

// Start the server on port 5000
app.listen(5000, () => console.log("Serwer działa na porcie 5000"));
