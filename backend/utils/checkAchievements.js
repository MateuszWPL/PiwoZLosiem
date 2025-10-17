import Beer from "../models/Beer.js";
import User from "../models/User.js";
import Achievement from "../models/Achievement.js";

export const checkAchievements = async (userId) => {
  const user = await User.findById(userId).populate("achievements");
  if (!user) throw new Error("Nie znaleziono użytkownika");

  const beers = await Beer.find({ user: userId });

  const stats = { today: 0, week: 0, month: 0, total: 0 };
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay());
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  beers.forEach((beer) => {
    stats.total += beer.amount;
    if (beer.createdAt >= startOfMonth) stats.month += beer.amount;
    if (beer.createdAt >= startOfWeek) stats.week += beer.amount;
    if (beer.createdAt >= startOfDay) stats.today += beer.amount;
  });

  const achievementsToAdd = [];
  const allAchievements = await Achievement.find({});

  for (const achievement of allAchievements) {
    const hasAchievement = user.achievements.some(a => a._id.equals(achievement._id));

    if (!hasAchievement) {
      switch (achievement.condition) {
        case "first_beer":
          if (stats.total >= 1) achievementsToAdd.push(achievement._id);
          break;
        case "five_beers":
          if (stats.total >= 5) achievementsToAdd.push(achievement._id);
          break;
        case "beer_warrior":
          if (stats.today >= 20) achievementsToAdd.push(achievement._id);
        case "squot":
          if (beers.some(beer => beer.place.toLowerCase() === "squot")) {
            achievementsToAdd.push(achievement._id);
          }
        case "wojanek":
          const wojanekCount = beers
            .filter(beer => beer.type.toLowerCase() === "wojanek")
            .reduce((sum, beer) => sum + beer.amount, 0);
          if (wojanekCount >= 50) {
            achievementsToAdd.push(achievement._id);
          }
        case "diligent_student":
          const studentCount = beers
            .filter(beer => beer.place.toLowerCase() === "politechnika")
            .reduce((sum, beer) => sum + beer.amount, 0);

          if (studentCount >= 25) {
            achievementsToAdd.push(achievement._id);
          }
        break;
      }
    }
  }

  if (achievementsToAdd.length > 0) {
    user.achievements.push(...achievementsToAdd);
    await user.save();
  }

  return user.achievements;
};