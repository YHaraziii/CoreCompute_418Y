const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { languages, interests, goal } = req.body;
    const focus = interests || 'Fundamentals';
    
    //  Sending sequential steps instead of a text block
    const nodes = [
      'Start',
      `Step 1: ${languages ? languages.join(', ') : 'Language'} Basics`,
      `Step 2: Advanced ${focus} Concepts`,
      `Step 3: Practical ${goal || 'Tech'} Project`,
      'Career Ready!'
    ];

    res.json({ nodes });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;