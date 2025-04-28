const express = require('express');
const router = express.Router();
const { ussdHandler } = require('../controllers/ussdController');
const ussdRoutes = require('./routes/ussdRoutes');

router.post('/ussd', ussdHandler);

module.exports = router;
