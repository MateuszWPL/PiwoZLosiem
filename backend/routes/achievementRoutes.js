import express from "express";
import { getUserAchievements, updateUserAchievements } from "../controllers/achievementController.js";
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router();

router.get("/me", protect, getUserAchievements);
router.post("/check", protect, updateUserAchievements);

export default router;