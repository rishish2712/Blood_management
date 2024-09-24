const express = require('express');
const Donor = require('../models/donor');
const BloodInventory = require('../models/bloodInventory'); // Import the BloodInventory model
const router = express.Router();

// Donate blood
router.post('/donate', async (req, res) => {
    const { name, bloodType, age, contact, aadharNumber } = req.body;

    try {
        const donor = await Donor.findById(aadharNumber);

        // Check if the donor can donate
        if (donor && (new Date() - donor.lastDonationDate) < 90 * 24 * 60 * 60 * 1000) {
            return res.status(400).send('You can only donate every 90 days.');
        }

        // Create or update donor record
        const newDonor = donor ? donor : new Donor({ 
            _id: aadharNumber,
            name, 
            bloodType, 
            age, 
            contact,
        });

        newDonor.lastDonationDate = new Date();
        await newDonor.save();

        // Update blood inventory
        let inventory = await BloodInventory.findOne({ bloodType });
        if (inventory) {
            // If the blood type exists, add 470ml to the existing quantity
            inventory.quantity += 470;
            await inventory.save();
        } else {
            // If the blood type doesn't exist, create a new entry with 470ml
            inventory = new BloodInventory({ bloodType, quantity: 470 });
            await inventory.save();
        }

        res.status(201).send('Donation successful! 470ml added to inventory.');
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('An error occurred while processing your request.');
    }
});

module.exports = router;
