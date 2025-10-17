import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendResetEmail } from "../utils/mailer.js";
import { v4 as uuidv4 } from "uuid";

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

export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Podany email nie jest zarejestrowany" });
    }

    const token = uuidv4();

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1h
    await user.save();

    await sendResetEmail(email, token);

    res.json({ message: "Link do resetu został wysłany!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd przy wysyłaniu maila" });
  }
};

export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token nieprawidłowy lub wygasł" });
    }

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(newPassword, salt);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Hasło zostało zaktualizowane!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Błąd podczas resetu hasła" });
  }
};