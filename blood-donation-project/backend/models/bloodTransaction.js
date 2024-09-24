const mongoose = require('mongoose');

const bloodTransactionSchema = new mongoose.Schema({
    bloodType: { type: String, required: true },
    recipientName: { type: String, required: true },
    quantity: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('BloodTransaction', bloodTransactionSchema);
