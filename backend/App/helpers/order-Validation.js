const { check } = require('express-validator');

// Validation middleware for the 'userId' field
const orderUserIdSchema = check('userId')
    .notEmpty().withMessage('User ID is required');

// Validation middleware for the 'address' field
const orderAddressSchema = check('address')
    .notEmpty().withMessage('Address is required');

// Validation middleware for the 'paymentMode' field
const orderPaymentModeSchema = check('paymentMode')
    .notEmpty().withMessage('Payment mode is required');

// Combine all validation middleware into a single array
const orderValidationSchema = {
    createOrder: [
        orderUserIdSchema,
        orderAddressSchema,
        orderPaymentModeSchema,
        // Add other validation rules as needed
    ],
    updateOrder: [
        orderAddressSchema.optional(),
        orderPaymentModeSchema.optional(),
        // Add other validation rules as needed
    ],
};

module.exports = orderValidationSchema;