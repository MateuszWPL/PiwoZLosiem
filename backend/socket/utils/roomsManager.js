export const joinRoomOnce = (socket, roomId) => {
  const rooms = socket.rooms;
  if (!rooms.has(roomId)) {
    socket.join(roomId);
  }
};

export const leaveRoom = (socket, roomId) => {
  if (socket.rooms.has(roomId)) {
    socket.leave(roomId);
  }
};
