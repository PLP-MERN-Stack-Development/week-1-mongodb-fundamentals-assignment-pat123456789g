// data/products.js - Sample Product Data
// Initial product data for testing

const { v4: uuidv4 } = require('uuid');

const products = [
  {
    id: uuidv4(),
    name: 'iPhone 14 Pro',
    description: 'Latest Apple smartphone with advanced camera system and A16 Bionic chip',
    price: 999.99,
    category: 'Electronics',
    inStock: true,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z'
  },
  {
    id: uuidv4(),
    name: 'Nike Air Max 90',
    description: 'Classic running shoes with comfortable cushioning and iconic design',
    price: 129.99,
    category: 'Clothing',
    inStock: true,
    createdAt: '2025-01-15T10:30:00Z',
    updatedAt: '2025-01-15T10:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'The Great Gatsby',
    description: 'Classic American novel by F. Scott Fitzgerald',
    price: 12.99,
    category: 'Books',
    inStock: false,
    createdAt: '2025-01-15T11:00:00Z',
    updatedAt: '2025-01-15T11:00:00Z'
  },
  {
    id: uuidv4(),
    name: 'Coffee Maker Deluxe',
    description: 'Programmable coffee maker with built-in grinder and thermal carafe',
    price: 89.99,
    category: 'Home',
    inStock: true,
    createdAt: '2025-01-15T11:30:00Z',
    updatedAt: '2025-01-15T11:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    price: 199.99,
    category: 'Electronics',
    inStock: true,
    createdAt: '2025-01-15T12:00:00Z',
    updatedAt: '2025-01-15T12:00:00Z'
  },
  {
    id: uuidv4(),
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra cushioning for comfortable practice',
    price: 49.99,
    category: 'Sports',
    inStock: true,
    createdAt: '2025-01-15T12:30:00Z',
    updatedAt: '2025-01-15T12:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'LED Smart Bulb',
    description: 'WiFi-enabled smart LED bulb with color changing capabilities',
    price: 24.99,
    category: 'Home',
    inStock: false,
    createdAt: '2025-01-15T13:00:00Z',
    updatedAt: '2025-01-15T13:00:00Z'
  },
  {
    id: uuidv4(),
    name: 'Gaming Mechanical Keyboard',
    description: 'RGB mechanical keyboard with tactile switches for gaming',
    price: 149.99,
    category: 'Electronics',
    inStock: true,
    createdAt: '2025-01-15T13:30:00Z',
    updatedAt: '2025-01-15T13:30:00Z'
  },
  {
    id: uuidv4(),
    name: 'Skincare Routine Set',
    description: 'Complete skincare set with cleanser, toner, serum, and moisturizer',
    price: 79.99,
    category: 'Beauty',
    inStock: true,
    createdAt: '2025-01-15T14:00:00Z',
    updatedAt: '2025-01-15T14:00:00Z'
  },
  {
    id: uuidv4(),
    name: 'Organic Green Tea',
    description: 'Premium organic green tea leaves sourced from mountain regions',
    price: 19.99,
    category: 'Food',
    inStock: true,
    createdAt: '2025-01-15T14:30:00Z',
    updatedAt: '2025-01-15T14:30:00Z'
  }
];

module.exports = products;
