const knex = require('knex');
const knexConfig = require('../knexfile');

// Initialize Knex instance
const db = knex(knexConfig.development); // Assuming you're using the development environment

// Check if the Knex instance is successfully initialized
db.raw('SELECT 1')
  .then(() => {
    console.log('Knex instance initialized successfully!');
  })
  .catch((error) => {
    console.error('Error initializing Knex instance:', error);
  });

module.exports = db;
