import express from 'express'
import { getStatus, setStatus, getUserData} from '../controllers/userController.js'
import { protect } from '../middleware/authMiddleware.js'

const router = express.Router()

router.get('/status', protect, getStatus)
router.post('/status', protect, setStatus)
router.get('/me', protect, getUserData)


export default router