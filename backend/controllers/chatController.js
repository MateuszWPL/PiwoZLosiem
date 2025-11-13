import Conversation from "../models/Conversation.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

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

        const conversationsWithUnread = await Promise.all(
            conversations.map(async (conv) => {
                const unreadCount = await Message.countDocuments({
                    conversation: conv._id,
                    sender: { $ne: userId },
                    createdAt: { 
                        $gt: conv.lastRead?.get(userId) || new Date(0)
                    }
                });

                const conversationObj = conv.toObject();
                conversationObj.unreadCount = unreadCount;
                conversationObj.hasUnread = unreadCount > 0;

                return conversationObj;
            })
        );

        res.json(conversationsWithUnread);
    } catch (error) {
        console.error(" Błąd przy pobieraniu rozmów:", error);
        res.status(500).json({ error: "Błąd serwera." });
    }
};

export const markAsRead = async (req, res) => {
    try {
        const userId = req.user.id;
        const { conversationId } = req.params;

        const conversation = await Conversation.findById(conversationId);
        if (!conversation) {
            return res.status(404).json({ error: "Konwersacja nie znaleziona" });
        }

        if (!conversation.participants.includes(userId)) {
            return res.status(403).json({ error: "Brak dostępu do konwersacji" });
        }

        conversation.lastRead.set(userId, new Date());
        await conversation.save();

        res.json({ success: true, message: "Oznaczono jako przeczytane" });
    } catch (error) {
        console.error(" Błąd przy oznaczaniu jako przeczytane:", error);
        res.status(500).json({ error: "Błąd serwera." });
    }
};

export const handleMessageSent = async (message) => {
    try {
        await Conversation.findByIdAndUpdate(
            message.conversation,
            { 
                $set: { 
                    [`lastRead.${message.sender}`]: new Date() 
                } 
            }
        );
    } catch (error) {
        console.error(" Błąd przy aktualizacji lastRead:", error);
    }
};

export const createConversation = async (req, res) => {
    try {
        const userId = req.user._id;
        const { partnerId } = req.body;

        if (userId.toString() === partnerId) {
            return res.status(400).json({ error: "Nie możesz rozmawiać sam ze sobą" });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [userId, partnerId], $size: 2 },
        }).populate("participants", "imie nazwisko _id photoUrl");

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [userId, partnerId],
                lastRead: new Map([[userId, new Date()], [partnerId, new Date(0)]])
            });

            await conversation.populate("participants", "imie nazwisko _id photoUrl");
            
            const conversationObj = conversation.toObject();
            conversationObj.unreadCount = 0;
            conversationObj.hasUnread = false;
            
            return res.status(201).json(conversationObj);
        }

        const conversationObj = conversation.toObject();
        
        const unreadCount = await Message.countDocuments({
            conversation: conversation._id,
            sender: { $ne: userId },
            createdAt: { 
                $gt: conversation.lastRead?.get(userId) || new Date(0)
            }
        });
        
        conversationObj.unreadCount = unreadCount;
        conversationObj.hasUnread = unreadCount > 0;

        res.status(200).json(conversationObj);
    } catch (error) {
        console.error(" Błąd przy tworzeniu rozmowy:", error);
        res.status(500).json({ error: "Błąd serwera." });
    }
};