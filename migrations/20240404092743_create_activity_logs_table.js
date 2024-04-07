/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('activity_logs', function(table) {
        table.increments('id').primary(); 
        table.integer('transactionId').unsigned().nullable(); 
        table.foreign('transactionId').references('id').inTable('transactions'); 
        table.integer('walletId').unsigned().nullable(); 
        table.foreign('walletId').references('id').inTable('wallets'); 
        table.string('action').notNullable(); 
        table.timestamps(true, true); 
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
