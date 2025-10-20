import Beer from "../models/beer.js";
import User from "../models/user.js";

// helper do obliczania dat
const getStartDate = (period) => {
  const now = new Date();
  if (period === "week") {
    const start = new Date();
    start.setDate(now.getDate() - 7);
    return start;
  } else if (period === "month") {
    const start = new Date();
    start.setMonth(now.getMonth() - 1);
    return start;
  } else {
    return new Date(0);
  }
};

export const getRanking = async (req, res) => {
  const { period } = req.params;
  const startDate = getStartDate(period);

  try {
    const ranking = await Beer.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: "$user", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" },
      {
        $project: {
          _id: 0,
          imie: "$user.imie",
          nazwisko: "$user.nazwisko",
          miasto: "$user.miasto",
          points: "$totalAmount",
        },
      },
    ]);

    res.json(ranking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd przy pobieraniu rankingu" });
  }
};

export const getCurrentUserRanking = async (req, res) => {
  const { period } = req.params;
  const startDate = getStartDate(period);
  const userId = req.user._id; // zakładamy, że masz middleware uwierzytelniający i req.user

  try {
    // pobranie sumy piwa wszystkich uzytkownikow w danym okresie \
    const rankingAll = await Beer.aggregate([
      { $match: { createdAt: { $gte: startDate } } },
      { $group: { _id: "$user", totalAmount: { $sum: "$amount" } } },
      { $sort: { totalAmount: -1 } },
    ]);

    // znalezienie miejsca aktualnego uzytkownika
    const rankIndex = rankingAll.findIndex(r => r._id.toString() === userId.toString());
    const rank = rankIndex !== -1 ? rankIndex + 1 : null;
    const points = rankIndex !== -1 ? rankingAll[rankIndex].totalAmount : 0;

    // pobranie danych
    const user = await User.findById(userId);

    res.json({
      rank,
      imie: user.imie,
      nazwisko: user.nazwisko,
      miasto: user.miasto,
      points,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd przy pobieraniu rankingu użytkownika" });
  }
};
