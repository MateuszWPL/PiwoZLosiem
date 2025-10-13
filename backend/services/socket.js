import jwt from "jsonwebtoken";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

export const initializeSocket = (io) => {
  io.on("connection", async (socket) => {
    console.log("🟢 Użytkownik połączony:", socket.id);

    // --- Autoryzacja JWT ---
    const token = socket.handshake.auth?.token;
    if (!token) {
      console.log("❌ Brak tokenu, rozłączam...");
      return socket.disconnect();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      console.log("✅ Socket uwierzytelniony jako:", socket.userId);

      // ✅ Oznacz użytkownika jako ONLINE
      await User.findByIdAndUpdate(socket.userId, {
        isOnline: true,
        lastSeen: new Date(),
      });

      // 🔊 Emituj globalny event
      io.emit("user_online", { userId: socket.userId });
    } catch (err) {
      console.log("❌ Błędny token JWT:", err.message);
      return socket.disconnect();
    }

    // --- Dołączanie do rozmowy ---
    socket.on("join_conversation", ({ conversationId }) => {
      socket.join(conversationId);
      console.log(`📥 ${socket.userId} dołączył do rozmowy ${conversationId}`);
    });

    // --- Wysyłanie wiadomości ---
    socket.on("send_message", async ({ conversationId, text }) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
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

        io.to(conversationId).emit("new_message", populatedMessage);
        console.log(`💬 [${conversationId}] ${socket.userId}: ${text}`);
      } catch (error) {
        console.error("❌ Błąd przy zapisie wiadomości:", error);
        socket.emit("error_message", { error: "Błąd przy zapisie wiadomości." });
      }
    });

    // --- Rozłączenie użytkownika ---
    socket.on("disconnect", async () => {
      console.log("🔴 Użytkownik rozłączony:", socket.id);
      if (socket.userId) {
        await User.findByIdAndUpdate(socket.userId, {
          isOnline: false,
          lastSeen: new Date(),
        });

        // 🔊 Emituj event globalny
        io.emit("user_offline", { userId: socket.userId });
      }
    });
  });
};
