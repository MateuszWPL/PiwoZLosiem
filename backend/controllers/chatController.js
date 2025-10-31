import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

// 📄 Pobieranie wszystkich rozmów zalogowanego użytkownika
export const getConversations = async (req, res) => {
  try {
    const userId = req.user.id;

    const conversations = await Conversation.find({
      participants: userId,
      $expr: { $gt: [{ $size: "$participants" }, 1] },
    })
      .populate("participants", "imie nazwisko _id photoUrl")
      .populate({
        path: "lastMessage",
        populate: { path: "sender", select: "imie nazwisko _id photoUrl" },
      })
      .sort({ updatedAt: -1 });

    res.json(conversations);
  } catch (error) {
    console.error("❌ Błąd przy pobieraniu rozmów:", error);
    res.status(500).json({ error: "Błąd serwera." });
  }
};

export const createConversation = async (req, res) => {
  try {
    const userId = req.user._id;
    const { partnerId } = req.body;

    if (userId.toString() === partnerId) {
      return res.status(400).json({ error: "Nie możesz rozmawiać sam ze sobą 😅" });
    }

    // 🔍 Sprawdź, czy taka rozmowa już istnieje
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, partnerId], $size: 2 },
    }).populate("participants", "imie nazwisko _id photoUrl");

    // 🆕 Jeśli nie ma — utwórz nową
    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, partnerId],
      });

      await conversation.populate("participants", "imie nazwisko _id photoUrl");
      return res.status(201).json(conversation);
    }

    // ✅ Jeśli istnieje — po prostu ją zwróć
    res.status(200).json(conversation);
  } catch (error) {
    console.error("❌ Błąd przy tworzeniu rozmowy:", error);
    res.status(500).json({ error: "Błąd serwera." });
  }
};
