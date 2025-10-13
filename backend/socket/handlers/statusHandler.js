// socket/handlers/statusHandler.js
import User from "../../models/User.js";

/**
 * handleStatus(io, socket)
 * - reaguje na disconnect i ustawia isOnline=false oraz lastSeen
 * - emituje user_offline do pozostałych
 */
export const handleStatus = (io, socket) => {
  socket.on("disconnect", async (reason) => {
    try {
      await User.findByIdAndUpdate(socket.userId, { isOnline: false, lastSeen: new Date() });
      io.emit("user_offline", { userId: socket.userId });
      console.log(`🔴 ${socket.userId} rozłączony (${reason})`);
    } catch (err) {
      console.error("statusHandler - błąd przy disconnect:", err);
    }
  });
};
