const express = require('express');
const router = express.Router();
const User = require('../models/User'); 

// --- SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
    try {
        const userName = req.body.Name;
        const userEmail = req.body.Email;
        const monkeyPassword = req.body.Password;

        const newJackfruitUser = new User({
            Name: userName,
            Email: userEmail,
            Password: monkeyPassword
        });

        await newJackfruitUser.save();
        res.send("User signed up successfully!");
    } catch (error) {
        res.send("Error signing up: " + error.message);
    }
});

// --- LOGIN ROUTE ---
router.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.Email;
        const monkeyPassword = req.body.Password;

        const foundUser = await User.findOne({ Email: userEmail });

        if (foundUser != null && foundUser.Password === monkeyPassword) {
            res.send("Login successful!");
        } else {
            res.send("Invalid email or password.");
        }
    } catch (error) {
        res.send("Error logging in: " + error.message);
    }
});

module.exports = router;