// middleware/validation.js - Validation Middleware
// Task 3: Validation Implementation

const { ValidationError } = require('../utils/errors');

// Validate product data
const validateProduct = (req, res, next) => {
  try {
    const { name, description, price, category, inStock } = req.body;
    const errors = [];
    
    // Name validation
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      errors.push('Name is required and must be a non-empty string');
    } else if (name.length > 100) {
      errors.push('Name must be 100 characters or less');
    }
    
    // Description validation
    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      errors.push('Description is required and must be a non-empty string');
    } else if (description.length > 500) {
      errors.push('Description must be 500 characters or less');
    }
    
    // Price validation
    if (!price && price !== 0) {
      errors.push('Price is required');
    } else {
      const numPrice = parseFloat(price);
      if (isNaN(numPrice) || numPrice < 0) {
        errors.push('Price must be a non-negative number');
      } else if (numPrice > 999999.99) {
        errors.push('Price must be less than 1,000,000');
      }
    }
    
    // Category validation
    if (!category || typeof category !== 'string' || category.trim().length === 0) {
      errors.push('Category is required and must be a non-empty string');
    } else {
      const validCategories = ['Electronics', 'Clothing', 'Books', 'Home', 'Sports', 'Toys', 'Health', 'Beauty', 'Food', 'Other'];
      if (!validCategories.includes(category)) {
        errors.push(`Category must be one of: ${validCategories.join(', ')}`);
      }
    }
    
    // InStock validation
    if (inStock !== true && inStock !== false && inStock !== 'true' && inStock !== 'false') {
      errors.push('InStock must be a boolean value (true or false)');
    }
    
    if (errors.length > 0) {
      throw new ValidationError('Validation failed', errors);
    }
    
    // Sanitize inputs
    req.body.name = name.trim();
    req.body.description = description.trim();
    req.body.category = category.trim();
    req.body.price = parseFloat(price);
    req.body.inStock = inStock === true || inStock === 'true';
    
    next();
  } catch (error) {
    next(error);
  }
};

// Validate query parameters for filtering/pagination
const validateQuery = (req, res, next) => {
  try {
    const errors = [];
    
    // Validate page parameter
    if (req.query.page) {
      const page = parseInt(req.query.page);
      if (isNaN(page) || page < 1) {
        errors.push('Page must be a positive integer');
      }
    }
    
    // Validate limit parameter
    if (req.query.limit) {
      const limit = parseInt(req.query.limit);
      if (isNaN(limit) || limit < 1 || limit > 100) {
        errors.push('Limit must be a positive integer between 1 and 100');
      }
    }
    
    // Validate search parameter
    if (req.query.search && req.query.search.length > 100) {
      errors.push('Search term must be 100 characters or less');
    }
    
    if (errors.length > 0) {
      throw new ValidationError('Query parameter validation failed', errors);
    }
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateProduct,
  validateQuery
};
