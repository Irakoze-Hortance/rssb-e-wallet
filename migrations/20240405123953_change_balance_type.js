/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('wallets', function(table) {
      table.decimal('balance').alter();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.alterTable('wallets', function(table) {
      table.integer('balance').alter();
    });
  };
  
