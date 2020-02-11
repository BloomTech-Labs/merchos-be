exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();

    tbl
      .integer("role_id")
      .notNullable()
      .unsigned()
      .unique()
      .references("id")
      .inTable("roles")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");

    tbl
      .string("username", 255)
      .notNullable()
      .unique();

    tbl.string("password", 255).notNullable();

    tbl.string("first_name", 100).notNullable();

    tbl.string("last_name", 100).notNullable();

    tbl.string("phone_number", 100).notNullable();

    tbl
      .string("account_number", 255)
      .unique()
      .notNullable();

    tbl
      .string("routing_number", 255)
      .unique()
      .notNullable();

    tbl
      .string("card_number", 255)
      .unique()
      .notNullable();

    tbl.string("card_exp", 255).notNullable();

    tbl.string("card_security", 255).notNullable();

    tbl.string("card_name", 255).notNullable();

    tbl.string("address_street", 255).notNullable();

    tbl.string("address_city", 255).notNullable();

    tbl.string("address_state", 255).notNullable();

    tbl.string("address_country", 255).notNullable();

    tbl.string("address_zip", 15).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
