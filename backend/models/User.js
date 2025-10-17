import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  imie: { type: String },
  nazwisko: { type: String },
  wiek: { type: Number },
  miasto: { type: String },
  plec: { type: String },
  isProfileComplete: { type: Boolean, default: false },
  status: { type: String, default: "🍺 wolny na piwo" },
  bio: { type: String, default: '' },
  photoUrl: { type: String, default: null },
  favoriteBeers: { type: [String], default: [] },
  achievements: [ { type: mongoose.Schema.Types.ObjectId, ref: "Achievement", }, ],
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;

