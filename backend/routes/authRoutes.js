import express from "express";
import {
  registerUser,
  loginUser,
  completeProfile,
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/complete-profile", protect, completeProfile);

export default router;
