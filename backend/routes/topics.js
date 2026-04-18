const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic'); // Connects to your blueprint above

// 1. GET: Fetch all topics for the dashboard
router.get('/', async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. PATCH: Update a topic's status
router.patch('/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json(updatedTopic);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. POST: Temporary seed route to load initial data
router.get('/seed', async (req, res) => {
  try {
    const initialTopics = [
      { name: 'Data Structures', status: 'Mastered' },
      { name: 'Algorithms', status: 'In-Progress' },
      { name: 'Operating Systems', status: 'Started' },
      { name: 'Database Systems', status: 'In-Progress' },
      { name: 'Computer Networks', status: 'Started' },
      { name: 'Discrete Mathematics', status: 'Mastered' },
    ];
    await Topic.insertMany(initialTopics);
    res.json({ message: 'Database seeded successfully!' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;