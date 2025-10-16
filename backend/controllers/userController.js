import User from "../models/User.js";

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

// export const getUserData = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id).select('imie status')
//     if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })
//     res.json({ 
//       name: user.imie, status: user.status
//     })
//   } catch (err) {
//     res.status(500).json({ error: 'Błąd serwera' })
//   }
// }

export const getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('imie nazwisko wiek miasto plec status bio photoUrl')
    if (!user) return res.status(404).json({ error: 'Użytkownik nie znaleziony' })

    res.json({
      name: `${user.imie} ${user.nazwisko}`,
      age: user.wiek,
      gender: user.plec,
      location: user.miasto,
      bio: user.bio,
      status: user.status,
      photo: user.photoUrl
    })
  } catch (err) {
    res.status(500).json({ error: 'Błąd serwera' })
  }
}
