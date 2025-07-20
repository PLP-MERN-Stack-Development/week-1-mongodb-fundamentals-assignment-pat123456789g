// middleware/logger.js - Custom Logging Middleware
// Task 3: Custom Logger Implementation

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method = req.method;
  const url = req.originalUrl;
  const userAgent = req.get('User-Agent') || 'Unknown';
  const ip = req.ip || req.connection.remoteAddress;
  
  // Log the request
  console.log(`[${timestamp}] ${method} ${url} - IP: ${ip} - User-Agent: ${userAgent}`);
  
  // Capture the original res.end to log response
  const originalEnd = res.end;
  res.end = function(...args) {
    const endTime = Date.now();
    const statusCode = res.statusCode;
    const responseTime = endTime - req.startTime;
    
    console.log(`[${timestamp}] ${method} ${url} - ${statusCode} - ${responseTime}ms`);
    
    // Call the original end method
    originalEnd.apply(this, args);
  };
  
  // Store start time for response time calculation
  req.startTime = Date.now();
  
  next();
};

module.exports = logger;
