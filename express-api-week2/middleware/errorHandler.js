// middleware/errorHandler.js - Global Error Handling Middleware
// Task 4: Error Handling Implementation

const { CustomError } = require('../utils/errors');

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;
  
  // Log error for debugging
  console.error('Error occurred:', err);
  
  // Custom error handling
  if (err instanceof CustomError) {
    return res.status(err.statusCode).json({
      success: false,
      error: err.message,
      ...(err.errors && { details: err.errors }),
      timestamp: new Date().toISOString()
    });
  }
  
  // Mongoose bad ObjectId (for future MongoDB integration)
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    return res.status(404).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    });
  }
  
  // Mongoose duplicate key error (for future MongoDB integration)
  if (err.code === 11000) {
    const message = 'Duplicate field value entered';
    return res.status(400).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    });
  }
  
  // Mongoose validation error (for future MongoDB integration)
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    return res.status(400).json({
      success: false,
      error: message,
      timestamp: new Date().toISOString()
    });
  }
  
  // JSON parse error
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      success: false,
      error: 'Invalid JSON format in request body',
      timestamp: new Date().toISOString()
    });
  }
  
  // Default to 500 server error
  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    timestamp: new Date().toISOString()
  });
};

module.exports = errorHandler;
