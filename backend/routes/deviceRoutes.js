const express = require('express');
const { UserDetails } = require('../models/userSchema'); // Import the UserDetails model

const router = express.Router();

// Add New Device
router.post('/newdevice', async (req, res) => {
    const { email, devicedata } = req.body;
    if (!email || !devicedata) {
        return res.status(400).json({ message: "Email and device data are required" });
    }
    try {
        const user = await UserDetails.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.devices.push(devicedata);
        await user.save();
        res.status(200).json({ message: "Device added successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error adding device" });
    }
});

// Delete Device
router.post('/deletedevice', async (req, res) => {
    const { email, device } = req.body;
    try {
        const user = await UserDetails.findOne({ email });
        if (user) {
            user.devices.pull({ deviceid: device });
            await user.save();
            res.status(200).json({ message: "Device removed successfully" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error deleting device" });
    }
});

module.exports = router;
