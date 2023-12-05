const { check } = require("express-validator");

// Validation middleware for the 'name' field
const productNameSchema = check("name")
  .notEmpty()
  .withMessage("Name is required")
  .isLength({ max: 50 })
  .withMessage("Name must not exceed 100 characters");

// Validation middleware for the 'description' field
const productDescriptionSchema = check("description")
  .notEmpty()
  .withMessage("Description is required");

// Validation middleware for the 'price' field
const productPriceSchema = check("price")
  .notEmpty()
  .withMessage("Price is required")
  .isNumeric()
  .withMessage("Price must be a number")
  .isLength({ max: 7 })
  .withMessage("Price must not exceed 7 digits");

// Validation middleware for the 'category' field
const productCategorySchema = check("category")
  .notEmpty()
  .withMessage("Category is required");

// Combine all validation middleware into a single array for product creation
const createProductValidationSchema = [
  productNameSchema,
  productDescriptionSchema,
  productPriceSchema,
  productCategorySchema,
];

// Optional validations for updating a product
const updateProductValidationSchema = [
  productNameSchema.optional(),
  productDescriptionSchema.optional(),
  productPriceSchema.optional(),
  productCategorySchema.optional(),
];

// Export the validation schemas
module.exports = {
  createProduct: createProductValidationSchema,
  updateProduct: updateProductValidationSchema,
};
