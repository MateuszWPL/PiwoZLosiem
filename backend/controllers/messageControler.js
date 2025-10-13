import Message from "../models/Message.js";
import Conversation from "../models/Conversation.js";

// 📩 Pobieranie wiadomości z paginacją
export const getMessages = async (req, res) => {
  try {
    const userId = req.user.id;
    const { conversationId } = req.params;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20; // domyślnie 20 wiadomości

    // Sprawdź, czy użytkownik należy do rozmowy
    const conversation = await Conversation.findById(conversationId);
    if (!conversation) {
      return res.status(404).json({ error: "Rozmowa nie istnieje." });
    }

    const isParticipant = conversation.participants.some(
      (p) => p.toString() === userId
    );
    if (!isParticipant) {
      return res.status(403).json({ error: "Brak dostępu do tej rozmowy." });
    }

    // Pobierz wiadomości (najnowsze najpierw)
    const totalMessages = await Message.countDocuments({ conversation: conversationId });
    const messages = await Message.find({ conversation: conversationId })
      .populate("sender", "username _id")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    res.json({
      page,
      limit,
      totalMessages,
      totalPages: Math.ceil(totalMessages / limit),
      messages,
    });
  } catch (error) {
    console.error("❌ Błąd przy pobieraniu wiadomości:", error);
    res.status(500).json({ error: "Błąd serwera." });
  }
};
