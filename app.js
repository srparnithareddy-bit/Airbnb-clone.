if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const User = require('./models/user');
const Listing = require('./models/listing');
const ExpressError = require('./utils/ExpressError');

// Routers
const listingsRouter = require('./routes/listings');
const reviewsRouter = require('./routes/reviews');
const usersRouter = require('./routes/users');
const bookingsRouter = require('./routes/bookings');

// View Engine & Static Files Setup
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Database Connection with In-Memory Auto-Fallback
async function initDatabase() {
    const mongoUri = process.env.MONGODB_URI;

    if (mongoUri) {
        try {
            await mongoose.connect(mongoUri);
            console.log('Connected to MongoDB via URI');
            await checkAndSeed();
            return;
        } catch (err) {
            console.error('Failed to connect to MONGODB_URI:', err.message);
        }
    }

    // Try local MongoDB
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/airbnb_clone', {
            serverSelectionTimeoutMS: 2000
        });
        console.log('Connected to local MongoDB');
        await checkAndSeed();
    } catch (localErr) {
        console.log('Local MongoDB not running. Initializing MongoMemoryServer...');
        const { MongoMemoryServer } = require('mongodb-memory-server');
        const mongod = await MongoMemoryServer.create();
        const memUri = mongod.getUri();
        await mongoose.connect(memUri);
        console.log('Connected to MongoMemoryServer:', memUri);
        await checkAndSeed();
    }
}

async function checkAndSeed() {
    const count = await Listing.countDocuments();
    if (count === 0) {
        console.log('No listings found. Seeding initial database with sample destinations...');
        const initData = require('./init/data.js');
        const Review = require('./models/review.js');

        // Create Demo Host User if not exists
        let demoUser = await User.findOne({ username: 'demo_user' });
        if (!demoUser) {
            const user = new User({
                email: 'demo@airbnb.com',
                username: 'demo_user',
                fullName: 'Sophia Martinez',
                avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
                bio: 'Superhost for 6 years. Passionate about world architecture and hospitality.'
            });
            demoUser = await User.register(user, 'password123');
        }

        // Create Traveler User
        let travelerUser = await User.findOne({ username: 'alex_traveler' });
        if (!travelerUser) {
            const traveler = new User({
                email: 'alex@example.com',
                username: 'alex_traveler',
                fullName: 'Alex Chen',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                bio: 'Digital nomad exploring remote places.'
            });
            travelerUser = await User.register(traveler, 'password123');
        }

        const sampleComments = [
            "An unbelievable experience! The views were even more breathtaking in person.",
            "Spotlessly clean, gorgeous interior design, and the host was super communicative.",
            "Couldn't have asked for a better stay. Highly recommended for couples or solo travelers!",
            "Everything was top notch — from the kitchen setup to the peaceful morning scenery."
        ];

        for (let item of initData.data) {
            const listing = new Listing({
                ...item,
                owner: demoUser._id
            });

            const rev1 = new Review({
                comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                rating: 5,
                author: travelerUser._id
            });
            await rev1.save();

            const rev2 = new Review({
                comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                rating: 4,
                author: travelerUser._id
            });
            await rev2.save();

            listing.reviews.push(rev1._id, rev2._id);
            await listing.save();
        }
        console.log('Initial listings & reviews successfully seeded!');
    }
}

initDatabase().catch(console.error);

// Session Configuration
const sessionConfig = {
    secret: process.env.SECRET || 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
};

app.use(session(sessionConfig));
app.use(flash());

// Passport Configuration
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Global Flash & User Locals Middleware
app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currUser = req.user;
    next();
});

// Root Route Redirect
app.get('/', (req, res) => {
    res.redirect('/listings');
});

// App Routes
app.use('/', usersRouter);
app.use('/listings', listingsRouter);
app.use('/listings/:id/reviews', reviewsRouter);
app.use('/bookings', bookingsRouter);

// 404 Catch-All (Express 5 compatible)
app.use((req, res, next) => {
    next(new ExpressError(404, 'Page Not Found! The destination you are looking for does not exist.'));
});

// Global Error Handler
app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong!' } = err;
    res.status(statusCode).render('error.ejs', { statusCode, message });
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
    console.log(`Server is running smoothly on port ${PORT}`);
    console.log(`Open in browser: http://localhost:${PORT}`);
});

module.exports = { app, server };
