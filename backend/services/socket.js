import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";


let io;

export const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // lub konkretny frontend np. "http://localhost:5173"
      methods: ["GET", "POST"]
    }
  });

  // 🔐 Middleware autoryzujący użytkownika po tokenie JWT
  io.use((socket, next) => {
    try {
      const token = socket.handshake?.auth?.token;
      if (!token) {
        console.log("❌ Brak tokena przy połączeniu Socket.io");
        return next(new Error("Brak tokena"));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.user = decoded; // np. { id, username }
      socket.userId = decoded.id;
      next();
    } catch (err) {
      console.error("❌ Błąd weryfikacji JWT:", err.message);
      const authError = new Error("Autoryzacja nieudana. Sprawdź token.");
      authError.data = { code: 401 };
      next(authError);
    }
  });

  // 🔌 Obsługa zdarzeń po połączeniu
  io.on("connection", (socket) => {
    console.log("🟢 Użytkownik połączony:", socket.userId);

    // 📨 Obsługa wysyłania wiadomości
    socket.on("send_message", async ({ conversationId, text }) => {
      try {
        console.log("🔍 conversationId otrzymany od klienta:", `"${conversationId}"`);

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            console.log("ryp");
          return socket.emit("error_message", { error: "Nie znaleziono rozmowy." });
        }

        const message = await Message.create({
          conversation: conversationId,
          sender: socket.userId,
          text,
        });

        conversation.lastMessage = message._id;
        await conversation.save();

        const populatedMessage = await message.populate("sender", "username _id");

        // Na razie emitujemy globalnie — później tylko do uczestników
        io.emit("new_message", populatedMessage);
        console.log("✅ Emituję wiadomość do nadawcy:", populatedMessage);

      } catch (error) {
        console.error("❌ Błąd przy zapisie wiadomości:", error);
        socket.emit("error_message", { error: "Błąd przy zapisie wiadomości." });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Użytkownik rozłączony:", socket.userId);
    });
  });

  console.log("✅ Socket.io zainicjalizowany");
  return io;
};

export const getIo = () => {
  if (!io) throw new Error("❗ Socket.io nie został jeszcze zainicjalizowany!");
  return io;
};
