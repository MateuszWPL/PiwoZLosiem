import { io } from "socket.io-client";
import readline from "readline";

// 🔐 Token JWT użytkownika
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZWQxZmJlMjhhOTkyM2IyNTAxODUxNCIsImlhdCI6MTc2MDM3MTU2NCwiZXhwIjoxNzYwOTc2MzY0fQ.lvbgKYSIqLd0-wlMgnG4_GYJbYtm9BrKLnZgjK3mCO0";

// 🆔 ID rozmowy (na razie wpisane na sztywno)
const conversationId = "68ed3dbd855188c0d67c94b9";

// 🔌 Połączenie z Socket.io
const socket = io("http://localhost:5000", {
  auth: { token },
  transports: ["websocket"]
});

// 🎛️ Interfejs do wpisywania wiadomości w konsoli
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "💬 Wpisz wiadomość: "
});

socket.on("connect", () => {
  console.log("✅ Połączono z Socket.io, id:", socket.id);
  rl.prompt();
});

socket.on("new_message", (msg) => {
  console.log(`📨 ${msg.sender.username}: ${msg.text}`);
  rl.prompt();
});

socket.on("connect_error", (err) => {
  console.error("❌ Błąd połączenia:", err.message);
});

// 📤 Wysyłanie wiadomości po wpisaniu w konsoli
rl.on("line", (line) => {
  const text = line.trim();
  if (text.length > 0) {
    socket.emit("send_message", { conversationId, text });
  }
  rl.prompt();
});
