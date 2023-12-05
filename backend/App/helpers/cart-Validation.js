const { check } = require('express-validator');

// Validation middleware for the 'userId' field
const cartUserIdSchema = check('userId')
    .notEmpty().withMessage('User ID is required');

// Validation middleware for the 'productId' field
const cartProductIdSchema = check('productId')
    .notEmpty().withMessage('Product ID is required');

// Validation middleware for the 'quantity' field with additional rules
const cartQuantitySchema = check('quantity')
    .isNumeric().withMessage('Quantity must be a number')
    .custom((value) => {
        if (value < 1) {
            throw new Error('Quantity must be at least 1');
        }
        return true;
    });

// Combine all validation middleware into a single array
const cartValidationSchema = {
    addToCart: [
        cartUserIdSchema,
        cartProductIdSchema,
        cartQuantitySchema,
        // Add other validation rules as needed
    ],
    modifyProductInCart: [
        cartUserIdSchema,
        cartProductIdSchema,
        cartQuantitySchema,
        // Add other validation rules as needed
    ]
};

module.exports = cartValidationSchema;