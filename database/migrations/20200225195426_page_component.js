exports.up = function(knex) {
  return knex.schema.createTable('page_component', tbl => {
    tbl.increments();
    tbl
      .integer('page_id')
      .unsigned()
      .references('id')
      .inTable('page')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('page_component');
};
