/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
// 20220410000000_create_transactions_table.js

exports.up = function(knex) {
    return knex.schema.createTable('transactions', function(table) {
      table.increments('id').primary(); 
      table.decimal('amount').notNullable(); 
      table.enum('status', ['sent', 'pending', 'received', 'cancelled']).notNullable().defaultTo('pending');
      table.integer('senderAcc').notNullable(); 
      table.integer('receiverAcc').notNullable(); 
      table.timestamps(true, true); 
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('transactions');
  };
  
