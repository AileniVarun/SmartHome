const express = require('express');
const { UserDetails } = require('../models/userSchema');

const router = express.Router();

// Add Room
router.post('/newroom', async (req, res) => {
    const { email, room } = req.body;
    if (!email || !room) {
        return res.status(400).json({ message: "Email and room name are required" });
    }
    try {
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.rooms.push(room);
        await user.save();
        res.status(200).json({ message: "Room added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error setting up room" });
    }
});

module.exports = router;
