const mongoose = require('mongoose');

const donorSchema = new mongoose.Schema({
    _id: { type: String, required: true }, // Set Aadhar number as the _id field
    name: { type: String, required: true },
    bloodType: { type: String, required: true },
    lastDonationDate: { type: Date },
    age: { type: Number, required: true },
    contact: { type: String, required: true },
}, { _id: false }); // Disable automatic _id generation

module.exports = mongoose.model('Donor', donorSchema);
