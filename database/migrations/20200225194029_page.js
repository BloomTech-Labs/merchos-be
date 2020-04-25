exports.up = function (knex) {
  return knex.schema.createTable("page", (tbl) => {
    tbl.increments();

    tbl.text("layout");
    tbl.text("content");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("page");
};
