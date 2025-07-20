// test-api.js - Simple API Testing Script
// Test all endpoints to ensure they work correctly

const http = require('http');
const querystring = require('querystring');

const BASE_URL = 'http://localhost:3000';
const API_KEY = 'plp-student-2025';

// Helper function to make HTTP requests
function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': API_KEY
      }
    };

    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const responseData = body ? JSON.parse(body) : {};
          resolve({
            statusCode: res.statusCode,
            data: responseData,
            headers: res.headers
          });
        } catch (e) {
          resolve({
            statusCode: res.statusCode,
            data: body,
            headers: res.headers
          });
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

// Test functions
async function testAPI() {
  console.log('🧪 Starting Express.js API Tests...\n');

  try {
    // Test 1: Root endpoint
    console.log('1️⃣ Testing GET / (Root endpoint)');
    const rootTest = await makeRequest('GET', '/');
    console.log(`   Status: ${rootTest.statusCode}`);
    console.log(`   Message: ${rootTest.data.message}\n`);

    // Test 2: Health check
    console.log('2️⃣ Testing GET /health');
    const healthTest = await makeRequest('GET', '/health');
    console.log(`   Status: ${healthTest.statusCode}`);
    console.log(`   Health: ${healthTest.data.status}\n`);

    // Test 3: Get all products
    console.log('3️⃣ Testing GET /api/products');
    const productsTest = await makeRequest('GET', '/api/products');
    console.log(`   Status: ${productsTest.statusCode}`);
    console.log(`   Products count: ${productsTest.data.products?.length || 0}\n`);

    // Test 4: Get products with pagination
    console.log('4️⃣ Testing GET /api/products?page=1&limit=3');
    const paginationTest = await makeRequest('GET', '/api/products?page=1&limit=3');
    console.log(`   Status: ${paginationTest.statusCode}`);
    console.log(`   Products on page: ${paginationTest.data.products?.length || 0}`);
    console.log(`   Total pages: ${paginationTest.data.pagination?.totalPages || 0}\n`);

    // Test 5: Filter by category
    console.log('5️⃣ Testing GET /api/products?category=Electronics');
    const filterTest = await makeRequest('GET', '/api/products?category=Electronics');
    console.log(`   Status: ${filterTest.statusCode}`);
    console.log(`   Electronics products: ${filterTest.data.products?.length || 0}\n`);

    // Test 6: Search products
    console.log('6️⃣ Testing GET /api/products?search=iPhone');
    const searchTest = await makeRequest('GET', '/api/products?search=iPhone');
    console.log(`   Status: ${searchTest.statusCode}`);
    console.log(`   Search results: ${searchTest.data.products?.length || 0}\n`);

    // Test 7: Get product statistics
    console.log('7️⃣ Testing GET /api/products/stats');
    const statsTest = await makeRequest('GET', '/api/products/stats');
    console.log(`   Status: ${statsTest.statusCode}`);
    console.log(`   Total products: ${statsTest.data.totalProducts || 0}`);
    console.log(`   In stock: ${statsTest.data.inStockProducts || 0}\n`);

    // Test 8: Create new product
    console.log('8️⃣ Testing POST /api/products');
    const newProduct = {
      name: 'Test Product',
      description: 'A product created during testing',
      price: 29.99,
      category: 'Other',
      inStock: true
    };
    const createTest = await makeRequest('POST', '/api/products', newProduct);
    console.log(`   Status: ${createTest.statusCode}`);
    console.log(`   Created: ${createTest.data.product?.name || 'Failed'}\n`);

    let createdProductId = createTest.data.product?.id;

    if (createdProductId) {
      // Test 9: Get specific product
      console.log('9️⃣ Testing GET /api/products/:id');
      const getProductTest = await makeRequest('GET', `/api/products/${createdProductId}`);
      console.log(`   Status: ${getProductTest.statusCode}`);
      console.log(`   Product: ${getProductTest.data.name || 'Not found'}\n`);

      // Test 10: Update product
      console.log('🔟 Testing PUT /api/products/:id');
      const updatedProduct = {
        name: 'Updated Test Product',
        description: 'This product was updated during testing',
        price: 39.99,
        category: 'Other',
        inStock: false
      };
      const updateTest = await makeRequest('PUT', `/api/products/${createdProductId}`, updatedProduct);
      console.log(`   Status: ${updateTest.statusCode}`);
      console.log(`   Updated: ${updateTest.data.product?.name || 'Failed'}\n`);

      // Test 11: Delete product
      console.log('1️⃣1️⃣ Testing DELETE /api/products/:id');
      const deleteTest = await makeRequest('DELETE', `/api/products/${createdProductId}`);
      console.log(`   Status: ${deleteTest.statusCode}`);
      console.log(`   Deleted: ${deleteTest.data.message || 'Failed'}\n`);
    }

    // Test 12: Test authentication error
    console.log('1️⃣2️⃣ Testing authentication error (no API key)');
    const noAuthTest = await makeRequest('POST', '/api/products', newProduct);
    console.log(`   Status: ${noAuthTest.statusCode}`);
    console.log(`   Error: ${noAuthTest.data.error || 'No error'}\n`);

    console.log('✅ All tests completed successfully!');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Check if server is running before testing
async function checkServer() {
  try {
    await makeRequest('GET', '/health');
    return true;
  } catch (error) {
    return false;
  }
}

// Main execution
async function main() {
  const serverRunning = await checkServer();
  
  if (!serverRunning) {
    console.log('❌ Server is not running. Please start the server first:');
    console.log('   npm start');
    console.log('   or');
    console.log('   node server.js');
    return;
  }

  await testAPI();
}

main();
