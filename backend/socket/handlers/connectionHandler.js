import User from "../../models/User.js";

/**
 * handleConnection(io, socket, onlineUsers)
 * - Ustawia użytkownika jako online w DB i emituje user_online.
 * - Dodaje użytkownika do mapy onlineUsers (klucz: socket.userId).
 * - Obsługuje event updateLocation.
 */
export const handleConnection = (io, socket, onlineUsers) => { // 💡 onlineUsers jako mapa: klucz=userId
    
    // Używamy klucza userId, ponieważ to identyfikuje użytkownika.
    if (socket.userId) {
        const userId = String(socket.userId); // Zapewniamy, że to jest string
        
        // 1. 💾 AKTUALIZACJA W BAZIE DANYCH I EMITOWANIE STATUSU ONLINE
        // Wykonujemy raz przy połączeniu
        (async () => {
            try {
                const user = await User.findById(userId);

                const prevStatus = user.prevStatus || "available";

                // Ustawiamy isOnline: true przy każdym pomyślnym połączeniu
                await User.findByIdAndUpdate(userId, { isOnline: true, status: prevStatus }); 

                socket.emit("user_status", { status: prevStatus });
                
                // Emitujemy globalny event user_online
                io.emit("user_online", { userId: userId, username: socket.user.username });
                
            } catch (err) {
                console.error("connectionHandler - błąd aktualizacji użytkownika w DB:", err);
            }
        })();

        // 2. 🗺️ DODANIE DO MAPY ONLINEUSERS (BEZ LOKALIZACJI NA START)
        // Jeśli użytkownik już jest w mapie, nie nadpisujemy jego lokalizacji!
        if (!onlineUsers[userId]) {
             onlineUsers[userId] = {
                socketId: socket.id,
                userId: userId,
                // Możesz dodać domyślną lokalizację lub null
                lat: null, 
                lng: null, 
            };
        } else {
             // Jeśli użytkownik był już połączony, tylko aktualizujemy socketId
             onlineUsers[userId].socketId = socket.id;
        }

        // Emitujemy pełną listę online (wystarczy raz przy połączeniu)
        io.emit("updateUserList", Object.values(onlineUsers));

        console.log(`✅ Użytkownik ${userId} dołączył do listy online (socket: ${socket.id})`);
    } else {
       console.warn("connectionHandler: Otrzymano połączenie bez userId po middleware.");
    }
    
    // 3. 📍 OBSŁUGA AKTUALIZACJI LOKALIZACJI (Przeniesione z głównego index.js)
    socket.on("updateLocation", (locationData) => {
        if (socket.userId && onlineUsers[socket.userId]) {
            const userId = String(socket.userId);
            // Aktualizujemy dane lokalizacyjne
            onlineUsers[userId] = {
                ...onlineUsers[userId], // Zachowujemy stare dane (socketId, userId)
                ...locationData, // Nadpisujemy nowe dane (lat, lon)
            };
            // Wypchnięcie aktualnej listy do wszystkich klientów (logika kolegi)
            io.emit("updateUserList", Object.values(onlineUsers));
        }
    });

    // 4. Inne handlery, które nie mają wpływu na mapę
    socket.on("client_ping", () => {
        socket.emit("pong");
    });

    console.log(`🔌 handleConnection zainicjalizowany dla ${socket.userId}`);
};