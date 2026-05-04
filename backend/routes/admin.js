const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');
const Topic = require('../models/Topic');
const User = require('../models/User');

router.get('/stats', async (req, res) => {
  try {
    const userCount = await User.countDocuments();
    const masteredCount = await Topic.countDocuments({ status: 'Mastered' });
    res.json({ users: userCount, masteredTopics: masteredCount, uptime: "99.9%" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/resources', async (req, res) => {
  try {
    const newResource = new Resource({
      title: req.body.title,
      category: req.body.category,
      type: 'Guide',
      url: req.body.url
    });
    await newResource.save();
    res.status(201).json({ message: "Resource successfully pushed to live database." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;