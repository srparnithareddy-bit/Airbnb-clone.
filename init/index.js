const mongoose = require('mongoose');
const initData = require('./data.js');
const Listing = require('../models/listing.js');
const User = require('../models/user.js');
const Review = require('../models/review.js');
require('dotenv').config();

const MONGO_URL = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/airbnb_clone';

async function seedDB() {
    try {
        await mongoose.connect(MONGO_URL);
        console.log('Connected to DB for initialization');

        // Clean existing test data
        await Listing.deleteMany({});
        await Review.deleteMany({});
        await User.deleteMany({ username: 'demo_user' });

        // Create Demo Host User
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
            console.log('Demo user created: username="demo_user", password="password123"');
        }

        // Create a traveler user for sample reviews
        let travelerUser = await User.findOne({ username: 'alex_traveler' });
        if (!travelerUser) {
            const traveler = new User({
                email: 'alex@example.com',
                username: 'alex_traveler',
                fullName: 'Alex Chen',
                avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
                bio: 'Digital nomad visiting 50+ countries.'
            });
            travelerUser = await User.register(traveler, 'password123');
        }

        // Sample review comments
        const sampleComments = [
            "An unbelievable experience! The views were even more breathtaking in person.",
            "Spotlessly clean, gorgeous interior design, and the host was super communicative.",
            "Couldn't have asked for a better stay. Highly recommended for couples or solo travelers!",
            "Everything was top notch — from the kitchen setup to the peaceful morning scenery."
        ];

        // Seed listings with owner and reviews
        for (let item of initData.data) {
            const listing = new Listing({
                ...item,
                owner: demoUser._id
            });

            // Add 1-2 sample reviews
            const review1 = new Review({
                comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                rating: 5,
                author: travelerUser._id,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 86400000)
            });
            await review1.save();

            const review2 = new Review({
                comment: sampleComments[Math.floor(Math.random() * sampleComments.length)],
                rating: 5,
                author: travelerUser._id,
                createdAt: new Date(Date.now() - Math.floor(Math.random() * 15) * 86400000)
            });
            await review2.save();

            listing.reviews.push(review1._id, review2._id);
            await listing.save();
        }

        console.log('Database successfully seeded with realistic Airbnb listings and reviews!');
        await mongoose.connection.close();
    } catch (err) {
        console.error('Error during seeding:', err);
    }
}

if (require.main === module) {
    seedDB();
}

module.exports = seedDB;
