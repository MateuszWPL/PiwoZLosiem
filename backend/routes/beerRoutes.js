import express from "express";
import {
  addBeer,
  getMyBeers,
  getBeerStats,
} from "../controllers/beerController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, addBeer);
router.get("/", protect, getMyBeers);
router.get("/stats", protect, getBeerStats);

export default router;
