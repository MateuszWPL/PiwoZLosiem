// socket/utils/roomsManager.js
/**
 * helpery do zarzadzania roomami:
 * - joinRoomOnce(socket, roomId) -> dołącza tylko jeśli nie jest już w pokoju
 */

export const joinRoomOnce = (socket, roomId) => {
  const rooms = socket.rooms; // Set z roomami (zawiera też socket.id)
  if (!rooms.has(roomId)) {
    socket.join(roomId);
  }
};

export const leaveRoom = (socket, roomId) => {
  if (socket.rooms.has(roomId)) {
    socket.leave(roomId);
  }
};
