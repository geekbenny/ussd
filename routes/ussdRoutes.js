const express = require('express');
const router = express.Router();
const { ussdHandler } = require('../controllers/ussdController');

router.post('/ussd', ussdHandler);

module.exports = router;
