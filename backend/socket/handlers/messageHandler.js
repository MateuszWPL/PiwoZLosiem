// socket/handlers/messageHandler.js
import Conversation from "../../models/Conversation.js";
import Message from "../../models/Message.js";
import { joinRoomOnce } from "../utils/roomsManager.js";

/**
 * handleMessages(io, socket)
 * - join_conversation: dołącza do pokoju (jeśli jest uczestnikiem)
 * - send_message: sprawdza członkostwo, zapisuje Message i emituje tylko do pokoju
 */
export const handleMessages = (io, socket) => {
  socket.on("join_conversation", async ({ conversationId }) => {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) return socket.emit("error_message", { error: "Rozmowa nie istnieje." });

      const isParticipant = conversation.participants.some((p) => p.toString() === socket.userId);
      if (!isParticipant) return socket.emit("error_message", { error: "Brak dostępu do rozmowy." });

  socket.rooms.forEach(room => {
            if (room !== socket.id) { 
                leaveRoom(socket, room); 
                console.log(`📤 ${socket.userId} left room ${room}`);
            }
        });

        // Wreszcie dołączamy do nowego pokoju
        socket.join(conversationId); // Można użyć joinRoomOnce, ale to jest jaśniejsze
        socket.emit("joined_conversation", { conversationId });
        console.log(`📥 ${socket.userId} joined ${conversationId}`);

    } catch (err) {
        console.error("messageHandler.join_conversation:", err);
        socket.emit("error_message", { error: "Błąd przy dołączaniu do rozmowy." });
    }
});

  socket.on("send_message", async ({ conversationId, text }) => {
    try {
      const conversation = await Conversation.findById(conversationId);
      if (!conversation) return socket.emit("error_message", { error: "Rozmowa nie istnieje." });

      const isParticipant = conversation.participants.some((p) => p.toString() === socket.userId);
      if (!isParticipant) return socket.emit("error_message", { error: "Brak dostępu do rozmowy." });

      // create message
      const message = await Message.create({
        conversation: conversationId,
        sender: socket.userId,
        text,
      });

      conversation.lastMessage = message._id;
      await conversation.save();

      const populated = await message.populate("sender", "username _id");

      // Emit tylko do uczestników pokoju
      io.to(conversationId).emit("new_message", populated);

      console.log(`💬 [${conversationId}] ${socket.userId}: ${text}`);
    } catch (err) {
      console.error("messageHandler.send_message:", err);
      socket.emit("error_message", { error: "Błąd zapisu wiadomości." });
    }
  });
};
