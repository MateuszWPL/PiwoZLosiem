import User from "../../models/User.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
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

        await delay(5000);

        const isStillUserOnline = onlineUsers[userId];

        if(!isStillUserOnline) {
            // 1. 💾 AKTUALIZACJA W BAZIE DANYCH
            try {
                if (userId) {
                    const user = await User.findById(userId);

                    const prevStatus = user.status || "available";
                    
                    await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: new Date(), status: "offline", prevStatus: prevStatus });
                    io.emit("user_offline", { userId: userId }); 
                }
            } catch (err) {
                console.error("Błąd aktualizacji statusu offline w DB:", err);
            }

        }
    });
};