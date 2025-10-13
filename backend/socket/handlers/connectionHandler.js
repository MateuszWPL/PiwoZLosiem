// socket/handlers/connectionHandler.js
import User from "../../models/User.js";

/**
 * handleConnection(io, socket)
 * - ustawia user as online
 * - emituje eventy globalne user_online
 * - wykona cleanup przy rozłączeniu (ale statusHandler zajmuje się lastSeen)
 */
export const handleConnection = (io, socket) => {
  // oznacz jako online
  (async () => {
    try {
      await User.findByIdAndUpdate(socket.userId, { isOnline: true, lastSeen: new Date() });
      io.emit("user_online", { userId: socket.userId, username: socket.user.username });
    } catch (err) {
      console.error("connectionHandler - błąd aktualizacji użytkownika:", err);
    }
  })();

  socket.on("client_ping", () => {
    socket.emit("pong");
  });

  // log
  console.log(`🔌 handleConnection zainicjalizowany dla ${socket.userId}`);
};
