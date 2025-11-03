import { io } from "socket.io-client";

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWQ\
xZmJlMjhhOTkyM2IyNTAxODUxNCIsImlhdCI6MTc2MDM3MTU2NCwiZXhwIjoxNzYwOT\
c2MzY0fQ.lvbgKYSIqLd0-wlMgnG4_GYJbYtm9BrKLnZgjK3mCO0";


const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", {
  auth: { token }, 
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
