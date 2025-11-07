import express from 'express'
import { getStatus, setStatus, getUserData, updateUser, upload, uploadPhoto, uploadPhoto2 } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/status', protect, getStatus)
router.post('/status', protect, setStatus)
router.get('/me', protect, getUserData)
router.put('/me', protect, updateUser)

router.post('/me/photo', protect, upload.single('photo'), uploadPhoto2)

// Zapis lokalizacji
router.post('/location', authMiddleware, async (req, res) => {
  const { latitude, longitude, address, status } = req.body;
  const user = await User.findById(req.user.id);
  user.location = { latitude, longitude, address };
  user.status = status || '';
  await user.save();
  res.json({ success: true, location: user.location, status: user.status });
});

// Pobranie własnej lokalizacji/statusu
router.get('/location', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ location: user.location, status: user.status });
});


export default router