import User from "../../models/User.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handleStatus = (io, socket, onlineUsers) => {
    socket.on("disconnect", async (reason) => {
        const userId = String(socket.userId);
        
        console.log(`Użytkownik ${userId} rozłączony (socket: ${socket.id})`);

        if (onlineUsers[userId]) {
            delete onlineUsers[userId]; 
            io.emit("updateUserList", Object.values(onlineUsers));
        }

        await delay(5000);

        const isStillUserOnline = onlineUsers[userId];

        if(!isStillUserOnline) {
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