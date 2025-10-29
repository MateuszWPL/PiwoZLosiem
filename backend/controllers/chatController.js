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

// 📄 Tworzenie rozmowy (jeśli jeszcze nie istnieje)
export const createConversation = async (req, res) => {
  try {
    const userId = req.user.id;
    const { partnerId } = req.body;

    if (userId === partnerId) {
      return res.status(400).json({ error: "Nie możesz rozmawiać sam ze sobą 😅" });
    }

    // Sprawdź, czy taka rozmowa już istnieje
    let conversation = await Conversation.findOne({
      participants: { $all: [userId, partnerId], $size: 2 },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [userId, partnerId],
      });
    }

    await conversation.populate("participants", "imie nazwisko _id photoUrl");

    res.status(201).json(conversation);
  } catch (error) {
    console.error("❌ Błąd przy tworzeniu rozmowy:", error);
    res.status(500).json({ error: "Błąd serwera." });
  }
};
