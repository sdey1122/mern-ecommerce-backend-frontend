const express = require('express');
const router = express.Router();
const userController = require('../App/controllers/users-cltr');
const authController = require('../App/controllers/auth-cltr');
const adminController = require('../App/controllers/admin-cltr')
const productController = require('../App/controllers/product-cltr');
const cartController = require('../App/controllers/cart-cltr');
const orderController = require('../App/controllers/order-cltr')
const addressController = require('../App/controllers/address-cltr');
const userValidationSchema = require('../App/helpers/user-Validation');
const cartValidationSchema = require('../App/helpers/cart-Validation');
const productValidationSchema = require('../App/helpers/product-Validation');
const orderValidationSchema = require('../App/helpers/order-Validation');
const addressValidationSchema = require('../App/helpers/address-Validation');
const { checkSchema } = require('express-validator');
const { authenticateByJWT, authorizeAdmin } = require('../App/middlewares/authentication');

// Route for user and admin register, login
router.post('/api/auth/register', checkSchema(userValidationSchema), authController.register);
router.post('/api/auth/login', checkSchema(userValidationSchema), authController.login);

// Routes for Users
router.get('/api/users', authenticateByJWT, userController.getAllUsers);
router.get('/api/users/:id', authenticateByJWT, userController.getUserById);
router.put('/api/users/:id', authenticateByJWT, userController.updateUserById);
router.delete('/api/users/:id', authenticateByJWT, userController.deleteUserById);

// Routes for Admin (here admin can get update or delete both users and admin)
router.get('/api/admin', authenticateByJWT, authorizeAdmin, adminController.getAllUsersAndAdmins);
router.get('/api/admin/:id', authenticateByJWT, authorizeAdmin, adminController.getUserOrAdminById);
router.put('/api/admin/:id', authenticateByJWT, authorizeAdmin, adminController.updateUserOrAdminById);
router.delete('/api/admin/:id', authenticateByJWT, authorizeAdmin, adminController.deleteUserOrAdminById);

// Route for Products (CRUD OPS by Admin and user)
router.post('/api/products', authenticateByJWT, checkSchema(productValidationSchema), authorizeAdmin, productController.createProduct);
router.get('/api/products', authenticateByJWT, productController.getAllProducts);
router.get('/api/products/:id', authenticateByJWT, productController.getProductById);
router.put('/api/products/:id', authenticateByJWT, checkSchema(productValidationSchema), authorizeAdmin, productController.updateProductById);
router.delete('/api/products/:id', authenticateByJWT, authorizeAdmin, productController.deleteProductById);

// Routes for cart
router.post('/api/cart', authenticateByJWT, checkSchema(cartValidationSchema), cartController.addToCart);
router.put('/api/cart', authenticateByJWT, checkSchema(cartValidationSchema), cartController.modifyProductInCart);
router.get('/api/cart/:userId/:productId', authenticateByJWT, cartController.getProductFromCart);
router.get('/api/cart/:userId', authenticateByJWT, cartController.getAllProductsFromCart);
router.delete('/api/cart/:userId/:productId', authenticateByJWT, cartController.deleteProductFromCart);
router.delete('/api/cart/:userId', authenticateByJWT, cartController.deleteAllProductsFromCart);

// Routes for orders
router.post('/api/orders', authenticateByJWT, checkSchema(orderValidationSchema), orderController.createOrder);
router.put('/api/orders/:id', authenticateByJWT, checkSchema(orderValidationSchema), orderController.updateOrderById);
router.get('/api/orders/:id', authenticateByJWT, orderController.getOrderById);
router.get('/api/orders', authenticateByJWT, orderController.getAllOrders);
router.delete('/api/orders/:id', authenticateByJWT, orderController.deleteOrderById);

// Routes for Address
router.post('/api/address/register', authenticateByJWT, checkSchema(addressValidationSchema), addressController.registerAddress);
router.post('/api/address', authenticateByJWT, checkSchema(addressValidationSchema), addressController.createAddress);
router.get('/api/address/:id', authenticateByJWT, addressController.getAddressById);
router.get('/api/address/user/:userId', authenticateByJWT, addressController.getAllAddressesByUserId);
router.put('/api/address/:id', authenticateByJWT, checkSchema(addressValidationSchema), addressController.updateAddressById);
router.delete('/api/address/:id', authenticateByJWT, addressController.deleteAddressById);

module.exports = router;