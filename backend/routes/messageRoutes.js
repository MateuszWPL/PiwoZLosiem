import express from "express";
import { getMessages } from "../controllers/messageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/:conversationId", protect, getMessages);

export default router;

//GET http://localhost:5000/api/chat/messages/652faa7b87a56b13c1a2b091?page=1&limit=5
//Authorization: Bearer TWÓJ_JWT_TOKEN
