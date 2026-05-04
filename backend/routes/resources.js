const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

router.get('/', async (req, res) => {
  try {
    let resources = await Resource.find();
    
    // If the database is completely empty, inject the seed data with real URLs
    if(resources.length === 0) {
       await Resource.insertMany([
        { title: 'Big-O Notation Cheatsheet', category: 'Theory', type: 'Article', url: 'https://www.bigocheatsheet.com/' },
        { title: 'Two Sum - LeetCode', category: 'Practice Problems', type: 'Interactive', url: 'https://leetcode.com/problems/two-sum/' },
        { title: 'Top 50 Systems Design Questions', category: 'Interview Prep', type: 'Guide', url: 'https://github.com/donnemartin/system-design-primer' },
        { title: 'Harvard CS50: Data Structures', category: 'Theory', type: 'Video', url: 'https://www.youtube.com/watch?v=2T-A_GFuoTo' }
      ]);
      resources = await Resource.find();
    }
    
    const { category } = req.query;
    if (category && category !== 'All') {
      resources = resources.filter(r => r.category === category);
    }
    res.json(resources);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/streak', async (req, res) => {
  res.json({ streak: 5 }); 
});

router.patch('/:id/access', async (req, res) => {
  res.json({ message: "Accessed" });
});

module.exports = router;