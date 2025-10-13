import express from "express";
import { getConversations, createConversation } from "../controllers/chatController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/conversations", protect, getConversations);
router.post("/conversations", protect, createConversation);

export default router;
