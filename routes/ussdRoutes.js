const express = require('express');
const router = express.Router();
const { ussdHandler } = require('../controllers/ussdController'); // This is correct!

// Define your routes
router.post('/ussd', ussdHandler);

// Export the router
module.exports = router;
