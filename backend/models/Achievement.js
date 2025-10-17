import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String },
  condition: { type: String },
});

const Achievement = mongoose.models.Achievement || mongoose.model("Achievement", achievementSchema);
export default Achievement;
