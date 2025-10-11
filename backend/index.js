import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";

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

app.use("/api/users", userRoutes);

app.listen(5000, () => console.log("Serwer działa na porcie 5000"));
