import express from "express";
import {
  registerUser,
  loginUser,
  completeProfile,
  requestPasswordReset,
  resetPassword
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
import { sendResetEmail } from "../utils/mailer.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/complete-profile", protect, completeProfile);
router.post("/request-password-reset", requestPasswordReset);
router.post("/reset-password", resetPassword);

export default router;
