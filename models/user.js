const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');
if (passportLocalMongoose.default) {
    passportLocalMongoose = passportLocalMongoose.default;
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    fullName: {
        type: String,
        default: 'Airbnb Traveler'
    },
    avatar: {
        type: String,
        default: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    },
    bio: {
        type: String,
        default: 'Passionate traveler and explorer.'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Automatically adds username, hash, salt, and helper methods
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
