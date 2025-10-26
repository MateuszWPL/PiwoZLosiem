import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });

const FriendRequest = mongoose.models.FriendRequest || mongoose.model("FriendRequest", friendRequestSchema);
export default FriendRequest;
