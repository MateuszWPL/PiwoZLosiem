import User from "../../models/User.js";

export const handleConnection = (io, socket, onlineUsers) => { 
    
    if (socket.userId) {
        const userId = String(socket.userId); 
        
        (async () => {
            try {
                const user = await User.findById(userId);

                const prevStatus = user.prevStatus || "available";

                await User.findByIdAndUpdate(userId, { isOnline: true, status: prevStatus }); 

                socket.emit("user_status", { status: prevStatus });
                
                io.emit("user_online", { userId: userId, username: socket.user.username });
                
            } catch (err) {
                console.error("connectionHandler - błąd aktualizacji użytkownika w DB:", err);
            }
        })();

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

        console.log(`Użytkownik ${userId} dołączył do listy online (socket: ${socket.id})`);
    } else {
       console.warn("connectionHandler: Otrzymano połączenie bez userId po middleware.");
    }
    
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

    console.log(` handleConnection zainicjalizowany dla ${socket.userId}`);
};