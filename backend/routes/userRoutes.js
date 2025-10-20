import express from 'express'
import { getStatus, setStatus, getUserData, updateUser, upload, uploadPhoto } from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/status', protect, getStatus)
router.post('/status', protect, setStatus)
router.get('/me', protect, getUserData)
router.put('/me', protect, updateUser)

router.post('/me/photo', protect, upload.single('photo'), uploadPhoto)

export default router