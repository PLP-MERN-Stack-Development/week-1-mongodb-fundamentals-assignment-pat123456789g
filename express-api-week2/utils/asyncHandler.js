// utils/asyncHandler.js - Async Error Handling Utility
// Task 4: Async Error Handling

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = { asyncHandler };
