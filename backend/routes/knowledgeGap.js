const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic'); // Same model the dashboard uses

// GET: /api/knowledge-gap/analyze
router.get('/analyze', async (req, res) => {
    try {
        const { role } = req.query;

        // 1. Role requirements (what skills each role needs)
        const roleDatabase = {
            "backend engineer": [
                { id: 1, name: 'Data Structures', category: 'Data Structures' },
                { id: 2, name: 'Algorithms', category: 'Algorithms' },
                { id: 3, name: 'Database Systems', category: 'Database Systems' }
            ],
            "systems engineer": [
                { id: 4, name: 'Operating Systems', category: 'Operating Systems' },
                { id: 5, name: 'Computer Networks', category: 'Computer Networks' },
                { id: 6, name: 'Data Structures', category: 'Data Structures' }
            ]
        };

        // 2. Normalize input
        const queryRole = role ? role.toLowerCase().trim() : "";

        // 3. Check role exists
        if (!roleDatabase[queryRole]) {
            return res.status(404).json({
                message: `No role found for '${role}'. Try 'backend engineer' or 'systems engineer'.`,
                missingSkills: []
            });
        }

        // 4. Fetch mastered topics from MongoDB (same DB the dashboard writes to)
        const masteredTopics = await Topic.find({ status: 'Mastered' });
        const masteredNames = masteredTopics.map(t => t.name.toLowerCase());

        // 5. Filter out skills the user has already mastered
        const requiredSkills = roleDatabase[queryRole];
        const missingSkills = requiredSkills.filter(
            skill => !masteredNames.includes(skill.name.toLowerCase())
        );

        // 6. Return result
        return res.status(200).json({
            targetRole: role,
            masteredCount: masteredNames.length,
            missingSkills,
            roleAchieved: missingSkills.length === 0
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = router;