import { io } from "socket.io-client";

// 🔐 Wklej tu token JWT użytkownika (np. po logowaniu)
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWQ\
xZmJlMjhhOTkyM2IyNTAxODUxNCIsImlhdCI6MTc2MDM3MTU2NCwiZXhwIjoxNzYwOT\
c2MzY0fQ.lvbgKYSIqLd0-wlMgnG4_GYJbYtm9BrKLnZgjK3mCO0";

// Adres serwera backendu
const socket = io("http://localhost:5000", {
  auth: { token }, // wysyłamy token przy handshake
  transports: ["websocket"]
});

socket.on("connect", () => {
  console.log("✅ Połączono z Socket.io, id:", socket.id);
});

socket.on("connect_error", (err) => {
  console.error("❌ Błąd połączenia:", err.message);
});

socket.on("disconnect", () => {
  console.log("🔴 Rozłączono z serwerem");
});
