const { check } = require('express-validator');
const User = require('../models/user-model');

// Validation middleware for the 'username' field
const usernameSchema = check('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3, max: 20 }).withMessage('Username should be between 3 and 20 characters')
    .matches(/^[a-zA-Z0-9_.-]+$/).withMessage('Username should only contain letters, numbers, underscores, dots, and hyphens');

// Validation middleware for the 'password' field
const passwordSchema = check('password')
    .notEmpty().withMessage('Password is required')
    .isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage('Password should be strong and meet the specified criteria.');

// Validation middleware for the 'email' field during registration
const emailRegisterSchema = check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format')
    .custom(async (value) => {
        const user = await User.findUserByEmail({ email: value });
        if (user) {
            throw new Error('Email already registered');
        } else {
            return true;
        }
    });

// Validation middleware for the 'email' field during login
const emailLoginSchema = check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email format');

// Combine all validation middleware into a single array
// Common validation middleware for registration and login
const userValidationSchema = {
    registration: [
        usernameSchema,
        emailRegisterSchema,
        passwordSchema,
    ],
    login: [
        emailLoginSchema,
        passwordSchema,
    ],
};

module.exports = userValidationSchema;