// socket/handlers/statusHandler.js
import User from "../../models/User.js";

/**
 * handleStatus(io, socket)
 * - reaguje na disconnect i ustawia isOnline=false oraz lastSeen
 * - emituje user_offline do pozostałych
 */
export const handleStatus = (io, socket, onlineUsers) => {
socket.on("disconnect", async (reason) => {
            console.log("🔴 Użytkownik rozłączony:", socket.id);
            try {
                await User.findByIdAndUpdate(socket.userId, { isOnline: false, lastSeen: new Date() });
                io.emit("user_offline", { userId: socket.userId }); 
            } catch (err) {
                console.error("Błąd aktualizacji statusu offline w DB:", err);
            }
            delete onlineUsers[socket.id];
            io.emit("updateUserList", Object.values(onlineUsers));
        });
};
