exports.up = function(knex) {
  return knex.schema.createTable('store_page', tbl => {
    tbl.increments();

    tbl
      .integer('store_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('store')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');

    tbl
      .integer('page_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('page')
      .onUpdate('CASCADE')
      .onDelete('CASCADE');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('store_page');
};
