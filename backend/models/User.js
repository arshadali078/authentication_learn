const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs'); // Use bcryptjs for simpler setup
const jwt = require('jsonwebtoken');

// Ensure JWT_SECRET is defined
const keysecret = process.env.JWT_SECRET || "default_secret";

// Define user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Not a valid email');
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
});

// Hash the password before saving the user document
userSchema.pre('save', async function (next) {
    const user = this;

    // Only hash the password if it has been modified
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 12);
    }

    next();
});

// Generate auth token and save to the user document
userSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.tokens = user.tokens.concat({ token });
    await user.save();
    return token;
};


// Create the model for the 'users' collection
const User = mongoose.model('User', userSchema);

module.exports = User;
