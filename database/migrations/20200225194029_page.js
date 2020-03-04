exports.up = function(knex) {
  return knex.schema.createTable('page', tbl => {
    tbl.increments();

    tbl.text('theme');
    tbl.text('layout');
    tbl.text('color');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('page');
};
