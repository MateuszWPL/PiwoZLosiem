import User from "../../models/User.js";

export const handleConnection = (io, socket, onlineUsers) => { 
    
    if (socket.userId) {
        const userId = String(socket.userId); 
        
        // AKTUALIZACJA W BAZIE DANYCH I EMITOWANIE STATUSU ONLINE
        (async () => {
            try {
                const user = await User.findById(userId);
                if (!user) return;

                let status = user.status;
                
                const now = new Date();
                const lastSeen = user.lastSeen ? new Date(user.lastSeen) : null;
                const secondsSinceLastSeen = lastSeen ? (now - lastSeen) / 1000 : null;

                if (user.status === "offline" && secondsSinceLastSeen > 5) {
                    status = user.prevStatus || "available";
                }

                // Ustawiamy isOnline: true przy każdym pomyślnym połączeniu
                await User.findByIdAndUpdate(userId, { isOnline: true, status: status, lastSeen: new Date() }); 

                socket.emit("user_status", { status: status });
                
                // Emitujemy globalny event user_online
                io.emit("user_online", { userId: userId, username: socket.user.username });
                
            } catch (err) {
                console.error("connectionHandler - błąd aktualizacji użytkownika w DB:", err);
            }
        })();

        // DODANIE DO MAPY ONLINEUSERS (BEZ LOKALIZACJI NA START)
        if (!onlineUsers[userId]) {
             onlineUsers[userId] = {
                socketId: socket.id,
                userId: userId,
                lat: null, 
                lng: null, 
            };
        } else {
             onlineUsers[userId].socketId = socket.id;
        }

        io.emit("updateUserList", Object.values(onlineUsers));

        console.log(`✅ Użytkownik ${userId} dołączył do listy online (socket: ${socket.id})`);
    } else {
       console.warn("connectionHandler: Otrzymano połączenie bez userId po middleware.");
    }
    
    //OBSŁUGA AKTUALIZACJI LOKALIZACJI (Przeniesione z głównego index.js)
    socket.on("updateLocation", (locationData) => {
        if (socket.userId && onlineUsers[socket.userId]) {
            const userId = String(socket.userId);
            onlineUsers[userId] = {
                ...onlineUsers[userId],
                ...locationData,
            };
            io.emit("updateUserList", Object.values(onlineUsers));
        }
    });

    socket.on("client_ping", () => {
        socket.emit("pong");
    });

    console.log(`🔌 handleConnection zainicjalizowany dla ${socket.userId}`);
};