const express = require('express');

const router = express.Router();

// Handle Model Data
router.post('/modeldata', async (req, res) => {
    console.log("Received Request");
    console.log(req.body);
    res.status(200).json({ message: 'Request received successfully' });
});

module.exports = router;
