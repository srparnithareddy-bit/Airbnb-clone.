const Booking = require('../models/booking');
const Listing = require('../models/listing');

module.exports.createBooking = async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
        req.flash('error', 'Listing not found!');
        return res.redirect('/listings');
    }

    const { checkIn, checkOut, guestsCount, specialRequests } = req.body.booking;
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    const diffTime = Math.abs(end - start);
    const totalNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (totalNights <= 0) {
        req.flash('error', 'Check-out date must be after check-in date!');
        return res.redirect(`/listings/${id}`);
    }

    // Price calculation: price per night + 18% GST/taxes + $40 service fee
    const basePrice = listing.price * totalNights;
    const taxes = Math.round(basePrice * 0.18);
    const serviceFee = 40;
    const totalPrice = basePrice + taxes + serviceFee;

    const newBooking = new Booking({
        listing: listing._id,
        guest: req.user._id,
        checkIn: start,
        checkOut: end,
        guestsCount: Number(guestsCount) || 1,
        totalNights,
        totalPrice,
        specialRequests
    });

    await newBooking.save();
    req.flash('success', `Congratulations! Your reservation for "${listing.title}" is confirmed!`);
    res.redirect('/bookings');
};

module.exports.index = async (req, res) => {
    const bookings = await Booking.find({ guest: req.user._id })
        .populate('listing')
        .sort({ createdAt: -1 });

    res.render('bookings/index.ejs', { bookings });
};

module.exports.cancelBooking = async (req, res) => {
    const { id } = req.params;
    const booking = await Booking.findById(id);

    if (!booking) {
        req.flash('error', 'Booking reservation not found.');
        return res.redirect('/bookings');
    }

    if (!booking.guest.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to cancel this reservation.');
        return res.redirect('/bookings');
    }

    booking.status = 'Cancelled';
    await booking.save();

    req.flash('success', 'Reservation has been cancelled.');
    res.redirect('/bookings');
};
