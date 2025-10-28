import User from "../models/User.js";
import multer from 'multer'
import path from 'path'
import fs from 'fs'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

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
  const { status } = req.body
  if (!status || typeof status !== 'string') {
    return res.status(400).json({ error: 'Nieprawidłowy status' })
  }

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { status: status.trim() },
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
    const user = await User.findById(req.user._id).select('imie nazwisko wiek miasto plec status bio photoUrl favoriteBeers')
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })

    res.json({
      _id: user._id,
      firstName: user.imie,
      lastName: user.nazwisko,
      age: user.wiek,
      gender: user.plec,
      location: user.miasto,
      bio: user.bio,
      status: user.status,
      photo: user.photoUrl,
      favoriteBeers: user.favoriteBeers || [],
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

const storage = multer.memoryStorage()
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

export const uploadPhoto2 = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'Brak pliku' })
    }

    const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: 'users'
    })

    const user = await User.findByIdAndUpdate(
      req.user._id,
      { photoUrl: result.secure_url },
      { new: true }
    )

    res.json({ 
      photo: user.photoUrl
    })

  } catch (err) {
    console.error('Błąd uploadu:', err)
    res.status(500).json({ error: 'Błąd przy uploadzie zdjęcia' })
  }
}

