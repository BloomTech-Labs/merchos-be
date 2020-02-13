
exports.up = function (knex) {
    return knex.schema.createTable("user_store", tbl => {
        tbl.increments();
        tbl.integer("user_id")
            .references("id")
            .inTable("users")
            .unsigned()
            .unique()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")


        tbl.integer("store_id")
            .references("id")
            .inTable("store")
            .unsigned()
            .onUpdate("CASCADE")
            .onDelete("CASCADE")
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("user_store");
};
