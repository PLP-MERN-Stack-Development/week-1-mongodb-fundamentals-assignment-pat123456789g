# Express.js RESTful API - Week 2 Assignment ✅

A complete RESTful API built with Express.js implementing CRUD operations, custom middleware, error handling, and advanced features.

## 🎯 Assignment Status: COMPLETED

**All 5 Tasks Successfully Implemented:**

- ✅ **Task 1:** Express.js Setup with Hello World endpoint
- ✅ **Task 2:** RESTful API Routes for products (GET, POST, PUT, DELETE)
- ✅ **Task 3:** Custom Middleware (logging, authentication, validation)
- ✅ **Task 4:** Global Error Handling with custom error classes
- ✅ **Task 5:** Advanced Features (filtering, pagination, search, statistics)

## 🗂️ Project Structure

```
express-api-week2/
├── server.js              # Main Express server
├── package.json           # Project dependencies and scripts
├── .env.example          # Environment variables template
├── test-api.js           # API testing script
├── routes/
│   └── productRoutes.js  # Product API routes
├── middleware/
│   ├── auth.js           # Authentication middleware
│   ├── logger.js         # Custom logging middleware
│   ├── validation.js     # Input validation middleware
│   └── errorHandler.js   # Global error handling
├── utils/
│   ├── errors.js         # Custom error classes
│   └── asyncHandler.js   # Async error wrapper
└── data/
    └── products.js       # Sample product data
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd express-api-week2
npm install
```

### 2. Start the Server
```bash
npm start
# or for development with auto-reload
npm run dev
```

### 3. Test the API
```bash
npm test
# or
node test-api.js
```

The server will start on `http://localhost:3000`

## 📡 API Endpoints

### Basic Endpoints
- `GET /` - Welcome message and API documentation
- `GET /health` - Health check endpoint

### Product Endpoints
- `GET /api/products` - Get all products (with filtering, pagination, search)
- `GET /api/products/:id` - Get specific product by ID
- `POST /api/products` - Create new product (requires authentication)
- `PUT /api/products/:id` - Update existing product (requires authentication)
- `DELETE /api/products/:id` - Delete product (requires authentication)
- `GET /api/products/stats` - Get product statistics

## 🔧 Advanced Features

### Filtering
```bash
GET /api/products?category=Electronics
GET /api/products?search=iPhone
```

### Pagination
```bash
GET /api/products?page=1&limit=5
```

### Authentication
Include API key in request headers:
```bash
X-API-Key: plp-student-2025
# or
Authorization: Bearer plp-student-2025
```

**Valid API Keys:**
- `plp-student-2025`
- `week2-express-api`
- `test-api-key-123`

## 📝 API Usage Examples

### 1. Get All Products
```bash
curl http://localhost:3000/api/products
```

### 2. Create New Product
```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -H "X-API-Key: plp-student-2025" \
  -d '{
    "name": "New Product",
    "description": "Product description",
    "price": 29.99,
    "category": "Electronics",
    "inStock": true
  }'
```

### 3. Update Product
```bash
curl -X PUT http://localhost:3000/api/products/PRODUCT_ID \
  -H "Content-Type: application/json" \
  -H "X-API-Key: plp-student-2025" \
  -d '{
    "name": "Updated Product",
    "price": 39.99
  }'
```

### 4. Delete Product
```bash
curl -X DELETE http://localhost:3000/api/products/PRODUCT_ID \
  -H "X-API-Key: plp-student-2025"
```

## 🛡️ Middleware Implementation

### 1. Custom Logger
- Logs all requests with timestamp, method, URL, IP, and response time
- Implemented in `middleware/logger.js`

### 2. Authentication
- API key validation for protected routes (POST, PUT, DELETE)
- Supports multiple authentication methods
- Implemented in `middleware/auth.js`

### 3. Validation
- Input validation for product creation and updates
- Query parameter validation for pagination and filtering
- Implemented in `middleware/validation.js`

### 4. Error Handling
- Global error handling middleware
- Custom error classes for different error types
- Proper HTTP status codes and error messages
- Implemented in `middleware/errorHandler.js`

## 📊 Product Schema

```javascript
{
  id: "uuid-string",
  name: "Product Name",
  description: "Product description",
  price: 29.99,
  category: "Electronics|Clothing|Books|Home|Sports|Toys|Health|Beauty|Food|Other",
  inStock: true,
  createdAt: "2025-01-15T10:00:00Z",
  updatedAt: "2025-01-15T10:00:00Z"
}
```

## 🧪 Testing

The project includes a comprehensive test script (`test-api.js`) that tests:
- All CRUD operations
- Authentication and authorization
- Filtering and pagination
- Error handling
- Input validation

Run tests with: `npm test`

## 🔄 Error Handling

The API returns consistent error responses:

```javascript
{
  "success": false,
  "error": "Error message",
  "details": ["Validation errors..."], // if applicable
  "timestamp": "2025-01-15T10:00:00Z"
}
```

**HTTP Status Codes Used:**
- 200: Success
- 201: Created
- 400: Bad Request (validation errors)
- 401: Unauthorized
- 404: Not Found
- 409: Conflict
- 500: Internal Server Error

## 🎓 Learning Outcomes Achieved

- ✅ Express.js server setup and configuration
- ✅ RESTful API design and implementation
- ✅ Custom middleware development
- ✅ Input validation and sanitization
- ✅ Authentication and authorization
- ✅ Global error handling
- ✅ Async error handling patterns
- ✅ Query parameters and filtering
- ✅ Pagination implementation
- ✅ API testing and documentation

## 🚀 Ready for Submission

This project demonstrates all required Express.js concepts for Week 2 of the MERN stack course and is ready for GitHub Classroom submission.

## 📚 Technologies Used

- **Express.js** - Web framework
- **UUID** - Unique ID generation
- **Body-parser** - Request body parsing
- **CORS** - Cross-origin resource sharing
- **Helmet** - Security headers
- **Morgan** - HTTP request logging
- **Dotenv** - Environment variable management

---
**Status:** ✅ Assignment Complete  
**Course:** MERN Stack Development  
**Week:** 2 - Express.js RESTful API
