import jwt from "jsonwebtoken";
import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";

export const initializeSocket = (io) => {
 
    io.on("connection", async (socket) => {
    console.log("🟢 Użytkownik połączony:", socket.id);

    // Autoryzacja JWT
    const token = socket.handshake.auth?.token;
    if (!token) {
      console.log("❌ Brak tokenu, rozłączam...");
      return socket.disconnect();
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      socket.userId = decoded.id;
      console.log("✅ Socket uwierzytelniony jako:", socket.userId);
    } catch (err) {
      console.log("❌ Błędny token JWT:", err.message);
      return socket.disconnect();
    }

    // 🔹 Dołączanie do pokoju konwersacji
    socket.on("join_conversation", ({ conversationId }) => {
      socket.join(conversationId);
      console.log(`📥 ${socket.userId} dołączył do rozmowy ${conversationId}`);
    });

    // 🔹 Wysyłanie wiadomości
    socket.on("send_message", async ({ conversationId, text }) => {
      try {
        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
          return socket.emit("error_message", { error: "Nie znaleziono rozmowy." });
        }

        // Zapisz wiadomość
        const message = await Message.create({
          conversation: conversationId,
          sender: socket.userId,
          text,
        });

        // Zaktualizuj ostatnią wiadomość w rozmowie
        conversation.lastMessage = message._id;
        await conversation.save();

        // Załaduj dane użytkownika
        const populatedMessage = await message.populate("sender", "username _id");

        // 📤 Wyślij tylko do uczestników rozmowy (pokoju)
        io.to(conversationId).emit("new_message", populatedMessage);

        console.log(`💬 [${conversationId}] ${socket.userId}: ${text}`);
      } catch (error) {
        console.error("❌ Błąd przy zapisie wiadomości:", error);
        socket.emit("error_message", { error: "Błąd przy zapisie wiadomości." });
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Użytkownik rozłączony:", socket.id);
    });
  });
};


// import { Server } from "socket.io";
// import jwt from "jsonwebtoken";
// import Conversation from "../models/Conversation.js";
// import Message from "../models/Message.js";


// let io;

// export const initializeSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "*", // lub konkretny frontend np. "http://localhost:5173"
//       methods: ["GET", "POST"]
//     }
//   });

//   // 🔐 Middleware autoryzujący użytkownika po tokenie JWT
//   io.use((socket, next) => {
//     try {
//       const token = socket.handshake?.auth?.token;
//       if (!token) {
//         console.log("❌ Brak tokena przy połączeniu Socket.io");
//         return next(new Error("Brak tokena"));
//       }

//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       socket.user = decoded; // np. { id, username }
//       socket.userId = decoded.id;
//       next();
//     } catch (err) {
//       console.error("❌ Błąd weryfikacji JWT:", err.message);
//       const authError = new Error("Autoryzacja nieudana. Sprawdź token.");
//       authError.data = { code: 401 };
//       next(authError);
//     }
//   });

//   // 🔌 Obsługa zdarzeń po połączeniu
//   io.on("connection", (socket) => {
//     console.log("🟢 Użytkownik połączony:", socket.userId);

//     // 📨 Obsługa wysyłania wiadomości
//     socket.on("send_message", async ({ conversationId, text }) => {
//       try {
//         console.log("🔍 conversationId otrzymany od klienta:", `"${conversationId}"`);

//         const conversation = await Conversation.findById(conversationId);
//         if (!conversation) {
//             console.log("ryp");
//           return socket.emit("error_message", { error: "Nie znaleziono rozmowy." });
//         }

//         const message = await Message.create({
//           conversation: conversationId,
//           sender: socket.userId,
//           text,
//         });

//         conversation.lastMessage = message._id;
//         await conversation.save();

//         const populatedMessage = await message.populate("sender", "username _id");

//         // Na razie emitujemy globalnie — później tylko do uczestników
//         io.emit("new_message", populatedMessage);
//         console.log("✅ Emituję wiadomość do nadawcy:", populatedMessage);

//       } catch (error) {
//         console.error("❌ Błąd przy zapisie wiadomości:", error);
//         socket.emit("error_message", { error: "Błąd przy zapisie wiadomości." });
//       }
//     });

//     socket.on("disconnect", () => {
//       console.log("🔴 Użytkownik rozłączony:", socket.userId);
//     });
//   });

//   console.log("✅ Socket.io zainicjalizowany");
//   return io;
// };

// export const getIo = () => {
//   if (!io) throw new Error("❗ Socket.io nie został jeszcze zainicjalizowany!");
//   return io;
// };
