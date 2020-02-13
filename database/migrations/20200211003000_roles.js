exports.up = function(knex) {
  return knex.schema.createTable("roles", tbl => {
    tbl.increments();
    tbl.string("role", 26);
    tbl.string("role_desc", 255);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("roles");
};
