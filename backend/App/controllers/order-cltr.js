const { validationResult } = require('express-validator');
const Order = require('../models/order-model');

const orderController = {};

// Create an order
orderController.createOrder = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Extract relevant data from the request body
        const { userId, address, paymentMode } = req.body;
        // Create a new order
        const order = new Order({ userId, address, paymentMode });
        // Save the order to the database
        await order.save();
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update an order by ID
orderController.updateOrderById = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Extract relevant data from the request body
        const { address, paymentMode } = req.body;
        const orderId = req.params.id;
        // Find and update the order in the database
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { address, paymentMode },
            { new: true, runValidators: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(updatedOrder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get an order by ID
orderController.getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        // Find the order in the database
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Get all orders
orderController.getAllOrders = async (req, res) => {
    try {
        // Find all orders in the database
        const orders = await Order.find();
        res.json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Delete an order by ID
orderController.deleteOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        // Find and delete the order in the database
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = orderController;