// queries.js - MongoDB queries for PLP Week 1 Assignment
// This file contains all the required queries for Tasks 2-5

// Import MongoDB client
const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb://localhost:27017';
const dbName = 'plp_bookstore';
const collectionName = 'books';

async function runQueries() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Connected to MongoDB server');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    console.log('\n=== TASK 2: BASIC CRUD OPERATIONS ===\n');

    // 1. Find all books in a specific genre
    console.log('1. Books in Fiction genre:');
    const fictionBooks = await collection.find({ genre: 'Fiction' }).toArray();
    console.log(fictionBooks.map(book => `- ${book.title} by ${book.author}`));

    // 2. Find books published after a certain year (e.g., after 1950)
    console.log('\n2. Books published after 1950:');
    const recentBooks = await collection.find({ published_year: { $gt: 1950 } }).toArray();
    console.log(recentBooks.map(book => `- ${book.title} (${book.published_year})`));

    // 3. Find books by a specific author
    console.log('\n3. Books by George Orwell:');
    const orwellBooks = await collection.find({ author: 'George Orwell' }).toArray();
    console.log(orwellBooks.map(book => `- ${book.title}`));

    // 4. Update the price of a specific book
    console.log('\n4. Updating price of "1984" to $15.99:');
    const updateResult = await collection.updateOne(
      { title: '1984' },
      { $set: { price: 15.99 } }
    );
    console.log(`Modified ${updateResult.modifiedCount} document(s)`);

    // Verify the update
    const updatedBook = await collection.findOne({ title: '1984' });
    console.log(`New price of "1984": $${updatedBook.price}`);

    // 5. Delete a book by its title (we'll add one to delete)
    console.log('\n5. Adding a book to delete, then deleting it:');
    await collection.insertOne({
      title: 'Book to Delete',
      author: 'Test Author',
      genre: 'Test',
      published_year: 2023,
      price: 1.00,
      in_stock: false,
      pages: 100,
      publisher: 'Test Publisher'
    });
    
    const deleteResult = await collection.deleteOne({ title: 'Book to Delete' });
    console.log(`Deleted ${deleteResult.deletedCount} document(s)`);

    console.log('\n=== TASK 3: ADVANCED QUERIES ===\n');

    // 1. Find books that are both in stock and published after 2010
    console.log('1. Books in stock published after 2010:');
    const inStockRecent = await collection.find({
      in_stock: true,
      published_year: { $gt: 2010 }
    }).toArray();
    console.log(inStockRecent.length > 0 ? 
      inStockRecent.map(book => `- ${book.title} (${book.published_year})`) : 
      ['No books found matching criteria']);

    // 2. Use projection to return only title, author, and price
    console.log('\n2. Books with only title, author, and price (first 5):');
    const projectedBooks = await collection.find({}, {
      projection: { title: 1, author: 1, price: 1, _id: 0 }
    }).limit(5).toArray();
    console.log(projectedBooks);

    // 3. Sort books by price (ascending)
    console.log('\n3. Books sorted by price (ascending):');
    const sortedAsc = await collection.find({}, {
      projection: { title: 1, price: 1, _id: 0 }
    }).sort({ price: 1 }).toArray();
    console.log(sortedAsc);

    // 4. Sort books by price (descending)
    console.log('\n4. Books sorted by price (descending):');
    const sortedDesc = await collection.find({}, {
      projection: { title: 1, price: 1, _id: 0 }
    }).sort({ price: -1 }).toArray();
    console.log(sortedDesc);

    // 5. Pagination - 5 books per page
    console.log('\n5. Pagination example (Page 1 - first 5 books):');
    const page1 = await collection.find({}, {
      projection: { title: 1, author: 1, _id: 0 }
    }).limit(5).skip(0).toArray();
    console.log(page1);

    console.log('\n   Page 2 (next 5 books):');
    const page2 = await collection.find({}, {
      projection: { title: 1, author: 1, _id: 0 }
    }).limit(5).skip(5).toArray();
    console.log(page2);

    console.log('\n=== TASK 4: AGGREGATION PIPELINE ===\n');

    // 1. Calculate average price by genre
    console.log('1. Average price by genre:');
    const avgPriceByGenre = await collection.aggregate([
      {
        $group: {
          _id: '$genre',
          averagePrice: { $avg: '$price' },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { averagePrice: -1 }
      }
    ]).toArray();
    console.log(avgPriceByGenre);

    // 2. Find author with most books
    console.log('\n2. Authors with book counts:');
    const authorBookCounts = await collection.aggregate([
      {
        $group: {
          _id: '$author',
          bookCount: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      {
        $sort: { bookCount: -1 }
      }
    ]).toArray();
    console.log(authorBookCounts);

    // 3. Group books by publication decade
    console.log('\n3. Books by publication decade:');
    const booksByDecade = await collection.aggregate([
      {
        $addFields: {
          decade: {
            $multiply: [
              { $floor: { $divide: ['$published_year', 10] } },
              10
            ]
          }
        }
      },
      {
        $group: {
          _id: '$decade',
          count: { $sum: 1 },
          books: { $push: '$title' }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]).toArray();
    console.log(booksByDecade);

    console.log('\n=== TASK 5: INDEXING ===\n');

    // Create indexes
    console.log('Creating indexes...');
    
    // Index on title field
    await collection.createIndex({ title: 1 });
    console.log('✓ Created index on title field');

    // Compound index on author and published_year
    await collection.createIndex({ author: 1, published_year: 1 });
    console.log('✓ Created compound index on author and published_year');

    // List all indexes
    console.log('\nCurrent indexes:');
    const indexes = await collection.indexes();
    console.log(indexes);

    // Demonstrate performance with explain()
    console.log('\n=== PERFORMANCE ANALYSIS ===\n');

    console.log('Query execution plan for title search (with index):');
    const explainResult = await collection.find({ title: 'The Hobbit' }).explain('executionStats');
    console.log('Execution stats:', {
      executionTimeMillis: explainResult.executionStats.executionTimeMillis,
      totalDocsExamined: explainResult.executionStats.totalDocsExamined,
      totalDocsReturned: explainResult.executionStats.totalDocsReturned,
      indexUsed: explainResult.executionStats.executionStages.indexName || 'No index used'
    });

    console.log('\nQuery execution plan for author + year search (with compound index):');
    const explainCompound = await collection.find({ 
      author: 'J.R.R. Tolkien', 
      published_year: { $gte: 1950 } 
    }).explain('executionStats');
    console.log('Execution stats:', {
      executionTimeMillis: explainCompound.executionStats.executionTimeMillis,
      totalDocsExamined: explainCompound.executionStats.totalDocsExamined,
      totalDocsReturned: explainCompound.executionStats.totalDocsReturned
    });

  } catch (err) {
    console.error('Error running queries:', err);
  } finally {
    await client.close();
    console.log('\nDisconnected from MongoDB server');
  }
}

// Run all queries
runQueries().catch(console.error);

// Export for potential use in other modules
module.exports = { runQueries };
