import User from "../../models/User.js";

/**
 * handleStatus(io, socket, onlineUsers)
 * - reaguje na disconnect i ustawia isOnline=false oraz lastSeen
 * - usuwa z mapy onlineUsers i emituje updateUserList
 * - emituje eventy globalne user_offline
 */
export const handleStatus = (io, socket, onlineUsers) => {
    socket.on("disconnect", async (reason) => {
        const userId = String(socket.userId);
        
        console.log(`🔴 Użytkownik ${userId} rozłączony (socket: ${socket.id})`);
        
        // 1. 💾 AKTUALIZACJA W BAZIE DANYCH
        try {
            if (userId) {
                await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date() });
                io.emit("user_offline", { userId: userId }); 
            }
        } catch (err) {
            console.error("Błąd aktualizacji statusu offline w DB:", err);
        }

        // 2. 🗺️ USUWANIE Z MAPY ONLINEUSERS
        // Sprawdzamy, czy socket.userId jest tym samym, który jest w onlineUsers.
        // Jeśli użytkownik używałby wielu połączeń, ta logika wymagałaby
        // bardziej zaawansowanego zarządzania socketami (np. Set of socket IDs).
        // Dla prostoty, na razie po prostu usuwamy go z mapy online:
        if (onlineUsers[userId]) {
            delete onlineUsers[userId]; 
            // Wypchnięcie aktualnej listy po usunięciu (logika kolegi)
            io.emit("updateUserList", Object.values(onlineUsers));
        }
    });
};