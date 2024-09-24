const express = require('express');
const router = express.Router();
const BloodInventory = require('../models/bloodInventory'); // Import the BloodInventory model
const BloodTransaction = require('../models/bloodTransaction'); // Import your BloodTransaction model

// Route to give blood
router.post('/give', async (req, res) => {
    const { bloodType, quantity } = req.body; // Expecting bloodType and quantity in the request body

    try {
        // Validate request body
        if (!bloodType || !quantity) {
            return res.status(400).send('Blood type and quantity are required.');
        }

        // Find the blood inventory for the specified blood type
        const inventory = await BloodInventory.findOne({ bloodType });

        if (!inventory) {
            return res.status(404).send('Blood type not found in inventory.');
        }

        // Check if there is enough blood available
        if (inventory.quantity < quantity) {
            return res.status(400).send('Not enough blood available for this type.');
        }

        // Subtract the specified quantity from the blood inventory
        inventory.quantity -= quantity;
        await inventory.save();

        res.status(200).send(`Successfully gave ${quantity}ml of blood type ${bloodType}.`);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).send('An error occurred while processing your request.');
    }
});

// Route to add blood to inventory (for donation)
router.post('/add', async (req, res) => {
    const { bloodType, quantity } = req.body;

    try {
        let inventory = await BloodInventory.findOne({ bloodType });

        if (!inventory) {
            // If the blood type doesn't exist, create a new entry
            inventory = new BloodInventory({ bloodType, quantity });
        } else {
            // If it exists, update the quantity
            inventory.quantity += quantity;
        }

        await inventory.save();
        res.status(200).send(`Successfully added ${quantity}ml of blood type ${bloodType} to inventory.`);
    } catch (error) {
        res.status(500).send('An error occurred while processing your request.');
    }
});

// Route to get available blood types and their quantities
router.get('/inventory', async (req, res) => {
    try {
        const inventory = await BloodInventory.find();
        res.json(inventory);
    } catch (error) {
        res.status(500).send('Error fetching blood inventory');
    }
});

// Route to get available quantity for a specific blood type
router.get('/inventory/:bloodType', async (req, res) => {
    const { bloodType } = req.params;
    try {
        const inventory = await BloodInventory.findOne({ bloodType });
        if (!inventory) {
            return res.status(404).send('Blood type not found in inventory.');
        }
        res.json({ quantity: inventory.quantity });
    } catch (error) {
        res.status(500).send('Error fetching blood inventory');
    }
});

module.exports = router;
