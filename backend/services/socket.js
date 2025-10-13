import { Server } from "socket.io";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
// ...
dotenv.config();
let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*", // 🔒 Możesz tu wpisać URL frontendu np. "http://localhost:5173"
    },
  });

  // 🔐 Middleware autoryzujący użytkownika po tokenie JWT
// socket.js (Middleware autoryzacji JWT)

io.use((socket, next) => {
    // ... (pobieranie tokena)
    
    try {
        const token = socket.handshake.auth?.token;
        if (!token) {
            console.log("❌ Brak tokena przy połączeniu Socket.io");
            return next(new Error("Brak tokena"));
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        socket.user = decoded;
        next();
    } catch (err) {
        // 💡 Zmienione: Wypisujemy CAŁY błąd, aby zdiagnozować!
        console.error("❌ Błąd weryfikacji JWT w Socket.io:", err.message);
        
        // Zwracamy błąd autoryzacji do klienta, aby klient mógł go obsłużyć
        const authError = new Error("Autoryzacja nieudana. Sprawdź token.");
        authError.data = { code: 401 }; // Socket.io używa data/code do przekazania kontekstu
        next(authError);
    }
});

  // 🔌 Obsługa zdarzeń po połączeniu
  io.on("connection", (socket) => {
    console.log(`🟢 Użytkownik połączony: ${socket.user.id}`);

    socket.on("disconnect", () => {
      console.log(`🔴 Użytkownik rozłączony: ${socket.user.id}`);
    });
  });

  console.log("✅ Socket.io zainicjalizowany");
  return io;
};

export const getIo = () => {
  if (!io) throw new Error("❗ Socket.io nie został jeszcze zainicjalizowany!");
  return io;
};
