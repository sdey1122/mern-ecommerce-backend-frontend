// controllers/address-controller.js
const { validationResult } = require('express-validator');
const Address = require('../models/address-model');

const addressController = {};

// Register an address
addressController.registerAddress = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, street, city, state, postalCode } = req.body;
        const existingAddress = await Address.findOne({ userId, street, city, state, postalCode });
        if (existingAddress) {
            return res.status(400).json({ message: 'Address already registered' });
        }
        const address = new Address({ userId, street, city, state, postalCode });
        await address.save();
        res.json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Create an address
addressController.createAddress = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { userId, street, city, state, postalCode } = req.body;
        const address = new Address({ userId, street, city, state, postalCode });
        await address.save();
        res.json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get an address by ID
addressController.getAddressById = async (req, res) => {
    try {
        const addressId = req.params.id;
        const address = await Address.findById(addressId);
        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(address);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Get all addresses for a user
addressController.getAllAddressesByUserId = async (req, res) => {
    try {
        const userId = req.params.userId;
        const addresses = await Address.find({ userId });
        res.json(addresses);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Update an address by ID
addressController.updateAddressById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { street, city, state, postalCode } = req.body;
        const addressId = req.params.id;
        const updatedAddress = await Address.findByIdAndUpdate(
            addressId,
            { street, city, state, postalCode },
            { new: true, runValidators: true }
        );
        if (!updatedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json(updatedAddress);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

// Delete an address by ID
addressController.deleteAddressById = async (req, res) => {
    try {
        const addressId = req.params.id;
        const deletedAddress = await Address.findByIdAndDelete(addressId);
        if (!deletedAddress) {
            return res.status(404).json({ message: 'Address not found' });
        }
        res.json({ message: 'Address deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = addressController;