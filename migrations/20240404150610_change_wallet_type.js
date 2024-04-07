/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('wallets', function(table) {
      // Modify the wallet_type column to be an enum with specific values
      table.enum('wallet_type', ['savings', 'credit', 'crypto','standard']).notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('wallets', function(table) {
      // Revert the changes made in the up function
      table.dropColumn('wallet_type');
    });
  };
  
