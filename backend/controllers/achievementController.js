import { checkAchievements } from "../utils/checkAchievements.js";
import User from "../models/User.js";

export const getUserAchievements = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate("achievements");
    res.json(user.achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd przy pobieraniu odznak" });
  }
};

export const updateUserAchievements = async (req, res) => {
  try {
    const achievements = await checkAchievements(req.user._id);
    res.json(achievements);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd przy aktualizacji odznak" });
  }
};