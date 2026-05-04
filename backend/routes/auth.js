const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/signup', async (req, res) => {
  try {
    const { Name, Email, Password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    const newUser = new User({ Name, Email, Password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User signed up successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { Email, Password } = req.body;
    const user = await User.findOne({ Email });
    if (!user) return res.status(400).json({ error: "Invalid email or password." });
    
    const validPassword = await bcrypt.compare(Password, user.Password);
    if (!validPassword) return res.status(400).json({ error: "Invalid email or password." });
    
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    res.json({ message: "Login successful!", token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;