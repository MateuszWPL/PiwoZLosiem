// socket/utils/socketAuth.js
import jwt from "jsonwebtoken";
import User from "../../models/User.js";

/**
 * verifySocketAuth(socket, next)
 * - czyta token z socket.handshake.auth.token
 * - weryfikuje JWT
 * - ładuje użytkownika z bazy i ustawia socket.userId oraz socket.user
 */
export const verifySocketAuth = async (socket, next) => {
  try {
    const token = socket.handshake.auth?.token;
    if (!token) {
      return next(new Error("Brak tokena"));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("_id username");
    if (!user) return next(new Error("Nie znaleziono użytkownika"));

    socket.userId = user._id.toString();
    socket.user = { id: user._id.toString(), username: user.username };
    return next();
  } catch (err) {
    return next(new Error("Niepoprawny token"));
  }
};
