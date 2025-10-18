import express from "express";
import { getRanking, getCurrentUserRanking } from "../controllers/rankingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// ranking globalny
router.get("/ranking/:period", getRanking);

// ranking aktualnego użytkownika
router.get("/ranking/:period/current-user", protect, getCurrentUserRanking);

export default router;
