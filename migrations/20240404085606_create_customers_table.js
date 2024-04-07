exports.up = function(knex) {
    return knex.schema.createTable('customers', function(table) {
      table.increments('id').primary(); // Primary key, auto-incrementing
      table.string('fullName').notNullable(); // Full name, cannot be null
      table.string('email').notNullable().unique(); // Email, cannot be null, must be unique
      table.string('phone_number').notNullable(); // Phone number, cannot be null
      table.string('address').notNullable(); // Address, cannot be null
      table.enum('gender', ['male', 'female', 'other']).notNullable(); // Gender, must be one of the specified values
      table.timestamps(true, true); // Created_at and updated_at timestamps
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('customers');
  };
  