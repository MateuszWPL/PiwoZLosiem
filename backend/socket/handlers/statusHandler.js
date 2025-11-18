import User from "../../models/User.js";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const handleStatus = (io, socket, onlineUsers) => {
    socket.on("disconnect", async (reason) => {
        const userId = String(socket.userId);
        
        console.log(`🔴 Użytkownik ${userId} rozłączony (socket: ${socket.id})`);

        if (onlineUsers[userId]) {
            delete onlineUsers[userId]; 
            io.emit("updateUserList", Object.values(onlineUsers));
        }

        const disconnectTime = new Date();

        await delay(5000);

        const isStillUserOnline = onlineUsers[userId];

        if(!isStillUserOnline) {
            // AKTUALIZACJA W BAZIE DANYCH
            try {
                if (userId) {
                    const user = await User.findById(userId);
                    if (!user) return;

                    const lastSeenDiff = user.lastSeen ? disconnectTime.getTime() - new Date(user.lastSeen).getTime() : 9999;

                    if (lastSeenDiff < 0) return;

                    const prevStatus = user.status || "available";
                    
                    await User.findByIdAndUpdate(userId, { isOnline: false, lastSeen: disconnectTime, status: "offline", prevStatus: prevStatus });
                    io.emit("user_offline", { userId: userId }); 
                }
            } catch (err) {
                console.error("Błąd aktualizacji statusu offline w DB:", err);
            }

        }
    });
};