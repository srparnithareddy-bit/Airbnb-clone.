const User = require('../models/user');
const Listing = require('../models/listing');
const Booking = require('../models/booking');

module.exports.renderSignupForm = (req, res) => {
    res.render('users/signup.ejs');
};

module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, fullName, password } = req.body;
        const newUser = new User({ email, username, fullName: fullName || username });
        const registeredUser = await User.register(newUser, password);
        
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash('success', `Welcome to Airbnb, ${registeredUser.username}!`);
            res.redirect('/listings');
        });
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/signup');
    }
};

module.exports.renderLoginForm = (req, res) => {
    res.render('users/login.ejs');
};

module.exports.login = async (req, res) => {
    req.flash('success', `Welcome back, ${req.user.username}!`);
    const redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.flash('success', 'You have been logged out safely.');
        res.redirect('/listings');
    });
};

module.exports.profile = async (req, res) => {
    const myListings = await Listing.find({ owner: req.user._id });
    const myBookings = await Booking.find({ guest: req.user._id }).populate('listing');
    res.render('users/profile.ejs', { myListings, myBookings });
};
