
exports.up = function (knex) {
    return knex.schema.createTable("store", tbl => {
        tbl.increments();

        tbl.string("name", 255);

        tbl.string("url", 255);
    })
};


exports.down = function (knex) {
    return knex.schema.dropTableIfExists("store");

};
