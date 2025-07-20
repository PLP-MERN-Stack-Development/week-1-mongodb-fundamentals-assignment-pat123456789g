// middleware/auth.js - Authentication Middleware
// Task 3: Authentication Implementation

const { UnauthorizedError } = require('../utils/errors');

const auth = (req, res, next) => {
  try {
    // Check for API key in headers
    const apiKey = req.header('X-API-Key') || req.header('Authorization')?.replace('Bearer ', '');
    
    if (!apiKey) {
      throw new UnauthorizedError('Access denied. No API key provided.');
    }
    
    // For this assignment, we'll use a simple API key validation
    // In a real application, you would validate against a database or JWT
    const validApiKeys = [
      'plp-student-2025',
      'week2-express-api',
      'test-api-key-123'
    ];
    
    if (!validApiKeys.includes(apiKey)) {
      throw new UnauthorizedError('Access denied. Invalid API key.');
    }
    
    // Add user info to request (simulate authenticated user)
    req.user = {
      id: 'user-123',
      name: 'PLP Student',
      role: 'student',
      apiKey: apiKey
    };
    
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
