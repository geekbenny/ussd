const mongoose = require('mongoose');

const QueueSchema = new mongoose.Schema({
    phoneNumber: String,
    service: String,
    position: Number,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Queue', QueueSchema);