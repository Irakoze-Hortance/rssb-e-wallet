/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
        // Add foreign key for the sender account
        table.integer('senderAccountId').unsigned().notNullable();
        table.foreign('senderAccountId').references('id').inTable('customers');
    
        // Add foreign key for the receiver account
        table.integer('receiverAccountId').unsigned().notNullable();
        table.foreign('receiverAccountId').references('id').inTable('customers');
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('transactions', function(table) {
        // Remove foreign key for the sender account
        table.dropForeign('senderAccountId');
        table.dropColumn('senderAccountId');
    
        // Remove foreign key for the receiver account
        table.dropForeign('receiverAccountId');
        table.dropColumn('receiverAccountId');
      });
  
};
