import express from 'express'
import { Checkout,confirmBooking } from '../controllers/Booking.js'

const router = express.Router()
router.post('/checkout',Checkout)
router.post('/confirm', confirmBooking);

export default router;