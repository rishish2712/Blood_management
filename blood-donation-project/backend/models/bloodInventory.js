const mongoose = require('mongoose');

const bloodInventorySchema = new mongoose.Schema({
    bloodType: { type: String, required: true, unique: true },
    quantity: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('BloodInventory', bloodInventorySchema);
