// socket/handlers/connectionHandler.js

import User from "../../models/User.js";

/**
 * handleConnection(io, socket, onlineUsers)
 * - ustawia user as online
 * - dodaje do mapy onlineUsers i emituje updateUserList (logika kolegi)
 * - emituje eventy globalne user_online
 */
export const handleConnection = (io, socket, onlineUsers) => { // 💡 DODANO onlineUsers
    
    // Używamy IF, ponieważ cały ten kod zależy od pomyślnej autoryzacji (socket.userId)
    if (socket.userId) {
        // 1. 💾 AKTUALIZACJA W BAZIE DANYCH (Twoja logika)
        (async () => {
            try {
                // Warto też tutaj ustawić isOnline: true!
                await User.findByIdAndUpdate(socket.userId, { isOnline: true, lastSeen: new Date() });
                io.emit("user_online", { userId: socket.userId, username: socket.user.username });
            } catch (err) {
                console.error("connectionHandler - błąd aktualizacji użytkownika:", err);
            }
        })();

        onlineUsers[socket.id] = {
            id: socket.id,
            userId: socket.userId,
        };
        
        io.emit("updateUserList", Object.values(onlineUsers));

        console.log(`✅ ${socket.userId} dołączył do listy online`);
    } else {
         console.warn("connectionHandler: Otrzymano połączenie bez userId po middleware.");
    }


    socket.on("client_ping", () => {
        socket.emit("pong");
    });

    console.log(`🔌 handleConnection zainicjalizowany dla ${socket.userId}`);
};