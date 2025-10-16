import User from "../models/User.js";
import multer from 'multer'
import path from 'path'
import fs from 'fs'

export const getStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })
    res.json({ status: user.status })
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera' })
  }
}

export const setStatus = async (req, res) => {
  const { newStatus } = req.body
  if (!newStatus || typeof newStatus !== 'string') {
    return res.status(400).json({ error: 'Nieprawidłowy status' })
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { status: newStatus.trim() },
      { new: true }
    )
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })
    res.json({ status: user.status })
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera' })
  }
}

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('imie nazwisko wiek miasto plec status bio photoUrl')
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })

    res.json({
      firstName: user.imie,
      lastName: user.nazwisko,
      age: user.wiek,
      gender: user.plec,
      location: user.miasto,
      bio: user.bio,
      status: user.status,
      photo: user.photoUrl,
    })
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera' })
  }
}

export const updateUser = async (req, res) => {
  try {
    const payload = req.body

    const allowedFields = ['firstName','lastName','age','gender','location','bio','status','photo','favoriteBeers']
    const update = {}

    if (payload.firstName !== undefined) update.imie = payload.firstName
    if (payload.lastName !== undefined) update.nazwisko = payload.lastName
    if (payload.age !== undefined) update.wiek = payload.age
    if (payload.gender !== undefined) update.plec = payload.gender
    if (payload.location !== undefined) update.miasto = payload.location
    if (payload.bio !== undefined) update.bio = payload.bio
    if (payload.status !== undefined) update.status = payload.status
    if (payload.favoriteBeers !== undefined) update.favoriteBeers = Array.isArray(payload.favoriteBeers) ? payload.favoriteBeers : []
    if (payload.photo !== undefined) {
            update.photoUrl = payload.photo
    }

    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true }).select(
      'imie nazwisko wiek miasto plec status bio photoUrl favoriteBeers'
    )
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })

    res.json({
      name: `${user.imie || ''} ${user.nazwisko || ''}`.trim(),
      firstName: user.imie || '',
      lastName: user.nazwisko || '',
      age: user.wiek || '',
      gender: user.plec || '',
      location: user.miasto || '',
      bio: user.bio || '',
      status: user.status || '',
      photo: user.photoUrl || null,
      favoriteBeers: user.favoriteBeers || []
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Błąd serwera' })
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads'
    if (!fs.existsSync(dir)) fs.mkdirSync(dir)
    cb(null, dir)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const random = Math.random().toString(36).substring(2, 8)
    const uniqueName = `${req.user._id}_${Date.now()}_${random}${ext}`
    cb(null, uniqueName)
  }
})

export const upload = multer({ storage })

export const uploadPhoto = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'Brak pliku' })

    const imageUrl = `/uploads/${req.file.filename}`
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { photoUrl: imageUrl },
      { new: true }
    )

    res.json({ photo: user.photoUrl })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: 'Błąd przy uploadzie' })
  }
}
