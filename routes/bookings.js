const express = require('express');
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const bookingController = require('../controllers/bookings');
const { isLoggedIn, validateBooking } = require('../middleware');

// View user's trips/bookings
router.get('/', isLoggedIn, wrapAsync(bookingController.index));

// Book a listing
router.post('/listings/:id', isLoggedIn, validateBooking, wrapAsync(bookingController.createBooking));

// Cancel a booking
router.post('/:id/cancel', isLoggedIn, wrapAsync(bookingController.cancelBooking));

module.exports = router;
