
exports.up = function (knex) {
    return knex.schema.createTable("store", tbl => {
        tbl.increments();

        tbl.string("name", 255)
        .unique();

        tbl.string("url", 255)
        .unique();
    })
};


exports.down = function (knex) {
    return knex.schema.dropTableIfExists("store");

};
