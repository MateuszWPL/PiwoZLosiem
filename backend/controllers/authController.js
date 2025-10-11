import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Użytkownik już istnieje" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ email, password: hashedPassword });

    const token = generateToken(user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      isProfileComplete: user.isProfileComplete,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Nieprawidłowe dane logowania" });
    }
    const token = generateToken(user._id);
    res.json({
      _id: user._id,
      email: user.email,
      isProfileComplete: user.isProfileComplete,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const completeProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "Użytkownik nie znaleziony" });
    }

    const { imie, nazwisko, wiek, miasto, plec } = req.body;

    user.imie = imie || user.imie;
    user.nazwisko = nazwisko || user.nazwisko;
    user.wiek = wiek || user.wiek;
    user.miasto = miasto || user.miasto;
    user.plec = plec || user.plec;
    user.isProfileComplete = true;
    await user.save();

    res.json({
      message: "Profil uzupełniony pomyślnie",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
