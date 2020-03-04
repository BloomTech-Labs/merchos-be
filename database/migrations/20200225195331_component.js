exports.up = function(knex) {
  return knex.schema.createTable('component', tbl => {
    tbl.increments();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('component');
};
