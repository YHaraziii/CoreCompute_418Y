const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

router.get('/', async (req, res) => {
  try {
    let topics = await Topic.find();
    if (topics.length === 0) {
      // Seed default data if database is empty
      await Topic.insertMany([
        { name: 'Data Structures', status: 'Started' },
        { name: 'Algorithms', status: 'Not Started' },
        { name: 'Web Development', status: 'In-Progress' }
      ]);
      topics = await Topic.find();
    }
    res.json(topics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const updated = await Topic.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;