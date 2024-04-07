/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
      
      table.enum('status', ['sent', 'pending', 'received', 'cancelled']).notNullable().defaultTo('pending');
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
      // Drop the 'status' column
      table.dropColumn('status');
      
      // Re-add the 'status' column as a string column
      table.string('status').notNullable().defaultTo('pending');
    });
  };


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

