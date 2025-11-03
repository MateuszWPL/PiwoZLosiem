// src/plugins/socket.js
import { io } from "socket.io-client";

let socket = null;

/**
 * Funkcja inicjalizująca połączenie Socket.IO z serwerem
 * Używa tokenu JWT z localStorage
 */
export function initSocket() {
  const token = localStorage.getItem("token");

  socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5000", {
    auth: { token },
    transports: ["websocket"], // zapewnia stabilne połączenie
  });

  // Obsługa zdarzeń po stronie klienta
  socket.on("connect", () => {
    console.log("🟢 Połączono z Socket.IO:", socket.id);
  });

  socket.on("disconnect", (reason) => {
    console.log("🔴 Rozłączono:", reason);
  });

  socket.on("connect_error", (err) => {
    console.error("❌ Błąd połączenia Socket.IO:", err.message);
  });

  return socket;
}

/**
 * Zwraca instancję socketu (po inicjalizacji)
 */
export function getSocket() {
  if (!socket) {
    console.warn("⚠️ Socket nie został jeszcze zainicjalizowany — wywołaj initSocket()!");
  }
  return socket;
}
