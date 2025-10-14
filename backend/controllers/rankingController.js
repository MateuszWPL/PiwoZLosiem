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
    return new Date(0); // all time
  }
};

export const getRanking = async (req, res) => {
  const { period } = req.params; // 'week', 'month', 'all'
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
  
