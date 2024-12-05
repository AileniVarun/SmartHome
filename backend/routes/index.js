const express = require('express');
const authRoutes = require('./authRoutes');
const deviceRoutes = require('./deviceRoutes');
const roomRoutes = require('./roomRoutes');
const modelRoutes = require('./modelRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/device', deviceRoutes);
router.use('/room', roomRoutes);
router.use('/model', modelRoutes);

module.exports = router;
