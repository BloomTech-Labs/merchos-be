
exports.up = function (knex) {
    return knex.schema.createTable("store", tbl => {
        tbl.increments();

        tbl.string("store_name", 255)
        .unique();

        tbl.string("store_url", 255)
        .unique();
    })
};


exports.down = function (knex) {
    return knex.schema.dropTableIfExists("store");

};
