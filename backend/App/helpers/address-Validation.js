const { check } = require('express-validator');

// Validation middleware for the 'userId' field
const addressUserIdSchema = check('userId')
    .notEmpty().withMessage('UserID is required');

// Validation middleware for the 'street' field
const addressStreetSchema = check('street')
    .notEmpty().withMessage('Street is required');

// Validation middleware for the 'city' field
const addressCitySchema = check('city')
    .notEmpty().withMessage('City is required');

// Validation middleware for the 'state' field
const addressStateSchema = check('state')
    .notEmpty().withMessage('State is required');

// Validation middleware for the 'postalCode' field
const addressPostalCodeSchema = check('postalCode')
    .notEmpty().withMessage('Postal Code is required');

// Combine all validation middleware into a single object
const addressValidationSchema = {
    registerAddress: [
        addressUserIdSchema,
        addressStreetSchema,
        addressCitySchema,
        addressStateSchema,
        addressPostalCodeSchema,
    ],
    createAddress: [
        addressStreetSchema,
        addressCitySchema,
        addressStateSchema,
        addressPostalCodeSchema,
    ],
    updateAddress: [
        addressStreetSchema.optional(),
        addressCitySchema.optional(),
        addressStateSchema.optional(),
        addressPostalCodeSchema.optional(),
    ],
};

module.exports = addressValidationSchema;