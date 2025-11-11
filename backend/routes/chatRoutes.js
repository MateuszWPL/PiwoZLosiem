import express from "express";
import { getConversations, createConversation, markAsRead } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/conversations", protect, getConversations);
router.post("/conversations", protect, createConversation);
router.post('/conversations/:conversationId/read', protect, markAsRead); 

export default router;
