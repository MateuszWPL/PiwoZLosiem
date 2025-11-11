import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    isGroup: {
      type: Boolean,
      default: false,
    },
    groupName: {
      type: String,
      default: null,
    },
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },
    lastRead: {
    type: Map,
    of: Date,
    default: {}
  },
  unreadCounts: {
    type: Map,
    of: Number,
    default: {}
  }
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
