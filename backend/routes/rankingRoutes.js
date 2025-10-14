import express from "express";
import { getRanking } from "../controllers/rankingController.js";

const router = express.Router();

// ranking globalny
router.get("/ranking/:period", getRanking);

export default router;
