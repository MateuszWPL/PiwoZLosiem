import User from "../../models/User.js";

export const handleConnection = async (io, socket, onlineUsers) => {
    
    if (socket.userId) {
        const userId = String(socket.userId);
        
        try {
            const user = await User.findById(userId);
            if (!user) {
                console.error(`Użytkownik ${userId} nie znaleziony w bazie`);
                return;
            }

            onlineUsers[userId] = {
                socketId: socket.id,
                userId: userId,
                lat: null, 
                lng: null,
                firstName: user.firstName,
                lastName: user.lastName,
                age: user.age,
                status: user.status,
                name: user.firstName?.charAt(0).toUpperCase() || 'U'
            };

            await User.findByIdAndUpdate(userId, { isOnline: true }); 
            io.emit("user_online", { 
                userId: userId, 
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName 
            });

            io.emit("updateUserList", Object.values(onlineUsers));
            
            console.log(`Użytkownik ${user.firstName} ${user.lastName} dołączył do listy online`);

        } catch (err) {
            console.error("connectionHandler - błąd:", err);
        }
    }

    socket.on("updateLocation", (locationData) => {
        if (socket.userId && onlineUsers[socket.userId]) {
            const userId = String(socket.userId);
            
            onlineUsers[userId].lat = locationData.lat;
            onlineUsers[userId].lng = locationData.lng;
            
            console.log(`Lokalizacja ${onlineUsers[userId].firstName}: ${locationData.lat}, ${locationData.lng}`);
            io.emit("updateUserList", Object.values(onlineUsers));
        }
    });

    socket.on("client_ping", () => {
        socket.emit("pong");
    });
};