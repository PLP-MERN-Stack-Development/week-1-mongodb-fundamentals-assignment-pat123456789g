// routes/productRoutes.js - Product API Routes
// Task 2: RESTful API Routes Implementation

const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// Import middleware
const auth = require('../middleware/auth');
const validate = require('../middleware/validation');

// Import utilities
const { NotFoundError, ValidationError } = require('../utils/errors');
const { asyncHandler } = require('../utils/asyncHandler');

// Import data store
let products = require('../data/products');

// Task 2: RESTful Routes

// GET /api/products - List all products with filtering, pagination, and search
router.get('/', asyncHandler(async (req, res) => {
  let filteredProducts = [...products];
  
  // Task 5: Advanced Features - Filtering by category
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }
  
  // Task 5: Advanced Features - Search by name
  if (req.query.search) {
    const searchTerm = req.query.search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => product.name.toLowerCase().includes(searchTerm) ||
                 product.description.toLowerCase().includes(searchTerm)
    );
  }
  
  // Task 5: Advanced Features - Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);
  
  // Response with pagination info
  const response = {
    products: paginatedProducts,
    pagination: {
      currentPage: page,
      totalProducts: filteredProducts.length,
      totalPages: Math.ceil(filteredProducts.length / limit),
      hasNextPage: endIndex < filteredProducts.length,
      hasPreviousPage: page > 1
    }
  };
  
  // Add applied filters info
  if (req.query.category || req.query.search) {
    response.filters = {
      category: req.query.category || null,
      search: req.query.search || null
    };
  }
  
  res.json(response);
}));

// GET /api/products/stats - Get product statistics
router.get('/stats', asyncHandler(async (req, res) => {
  const stats = {
    totalProducts: products.length,
    inStockProducts: products.filter(p => p.inStock).length,
    outOfStockProducts: products.filter(p => !p.inStock).length,
    categoryCounts: {},
    averagePrice: 0,
    priceRange: {
      min: Math.min(...products.map(p => p.price)),
      max: Math.max(...products.map(p => p.price))
    }
  };
  
  // Calculate category counts
  products.forEach(product => {
    stats.categoryCounts[product.category] = 
      (stats.categoryCounts[product.category] || 0) + 1;
  });
  
  // Calculate average price
  stats.averagePrice = products.length > 0 
    ? products.reduce((sum, p) => sum + p.price, 0) / products.length
    : 0;
  
  res.json(stats);
}));

// GET /api/products/:id - Get specific product by ID
router.get('/:id', asyncHandler(async (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  
  if (!product) {
    throw new NotFoundError(`Product with ID ${req.params.id} not found`);
  }
  
  res.json(product);
}));

// POST /api/products - Create new product
router.post('/', auth, validate.validateProduct, asyncHandler(async (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  
  // Check if product with same name already exists
  const existingProduct = products.find(
    p => p.name.toLowerCase() === name.toLowerCase()
  );
  
  if (existingProduct) {
    throw new ValidationError('Product with this name already exists');
  }
  
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price: parseFloat(price),
    category,
    inStock: Boolean(inStock),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  products.push(newProduct);
  
  res.status(201).json({
    message: 'Product created successfully',
    product: newProduct
  });
}));

// PUT /api/products/:id - Update existing product
router.put('/:id', auth, validate.validateProduct, asyncHandler(async (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    throw new NotFoundError(`Product with ID ${req.params.id} not found`);
  }
  
  const { name, description, price, category, inStock } = req.body;
  
  // Check if another product with same name exists
  const existingProduct = products.find(
    p => p.name.toLowerCase() === name.toLowerCase() && p.id !== req.params.id
  );
  
  if (existingProduct) {
    throw new ValidationError('Another product with this name already exists');
  }
  
  // Update product
  products[productIndex] = {
    ...products[productIndex],
    name,
    description,
    price: parseFloat(price),
    category,
    inStock: Boolean(inStock),
    updatedAt: new Date().toISOString()
  };
  
  res.json({
    message: 'Product updated successfully',
    product: products[productIndex]
  });
}));

// DELETE /api/products/:id - Delete product
router.delete('/:id', auth, asyncHandler(async (req, res) => {
  const productIndex = products.findIndex(p => p.id === req.params.id);
  
  if (productIndex === -1) {
    throw new NotFoundError(`Product with ID ${req.params.id} not found`);
  }
  
  const deletedProduct = products.splice(productIndex, 1)[0];
  
  res.json({
    message: 'Product deleted successfully',
    product: deletedProduct
  });
}));

module.exports = router;
