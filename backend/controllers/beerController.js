import Beer from "../models/Beer.js";
import { checkAchievements } from "../utils/checkAchievements.js";

// Dodanie piwa (tylko zalogowany użytkownik)
export const addBeer = async (req, res) => {
  try {
    const { amount, type, place } = req.body;

    if (!amount || !type || !place) {
      return res.status(400).json({ message: "Wszystkie pola są wymagane" });
    }

    const beer = await Beer.create({
      user: req.user._id,
      amount,
      type,
      place,
    });

    await checkAchievements(req.user._id);

    res.status(201).json(beer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pobranie wszystkich piw danego użytkownika
export const getMyBeers = async (req, res) => {
  try {
    const beers = await Beer.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(beers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// Pobranie statystyk piw (dzisiaj, tydzień, miesiąc, łącznie)
export const getBeerStats = async (req, res) => {
  try {
    const beers = await Beer.find({ user: req.user.id });

    const stats = {
      today: 0,
      week: 0,
      month: 0,
      total: 0,
    };

    const now = new Date();
    const startOfDay = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    beers.forEach((beer) => {
      const createdAt = new Date(beer.createdAt);
      stats.total += beer.amount;
      if (createdAt >= startOfMonth) stats.month += beer.amount;
      if (createdAt >= startOfWeek) stats.week += beer.amount;
      if (createdAt >= startOfDay) stats.today += beer.amount;
    });

    res.json(stats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd serwera" });
  }
};
