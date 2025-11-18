import express from "express";
import {
  getFriends,
  getFriendRequests,
  getAllUsers,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  removeFriend,
  getFriendsCount,
  getFriendRequestsCount
} from "../controllers/friendsController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getFriends);
router.get("/requests", getFriendRequests);
router.get("/all", getAllUsers);
router.get("/count", getFriendsCount);
router.get("/requests/count", getFriendRequestsCount);

router.post("/:id", sendFriendRequest);
router.post("/requests/:id/accept", acceptFriendRequest);
router.post("/requests/:id/reject", rejectFriendRequest);
router.delete("/:id", removeFriend);

export default router;
