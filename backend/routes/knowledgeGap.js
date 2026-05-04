const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic');

router.post('/analyze', async (req, res) => {
  try {
    const { role } = req.body;
    
    const masteredTopics = await Topic.find({ status: 'Mastered' });
    const masteredNames = masteredTopics.map(t => t.name);

    const requiredSkills = [
      { id: 1, name: 'Advanced Graph Algorithms', category: 'Data Structures' },
      { id: 2, name: 'System Design Principles', category: 'Architecture' },
      { id: 3, name: 'Docker & Containerization', category: 'DevOps' },
      { id: 4, name: 'RESTful API Construction', category: 'Web Development' }
    ];

    const missing = requiredSkills.filter(skill => !masteredNames.includes(skill.name));
    
    res.json({ mastered: masteredNames, missingSkills: missing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;