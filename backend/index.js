import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Połączono z bazą:", mongoose.connection.name))
  .catch((err) => console.error("❌ Błąd połączenia:", err));

app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Serwer działa na porcie 5000"));
