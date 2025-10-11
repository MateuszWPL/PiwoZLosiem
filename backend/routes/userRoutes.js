import express from "express";
import { stworzUsera } from "../controllers/userController.js";
const router = express.Router();
router.post("/", stworzUsera);
export default router;
