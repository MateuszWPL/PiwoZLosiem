import User from "../models/User.js";

export const stworzUsera = async (req, res) => {
  try {
    const { imie, nazwisko, email } = req.body;
    const nowyUser = new User({ imie, nazwisko, email });
    await nowyUser.save();
    res.status(201).json(nowyUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
