
exports.up = function (knex) {
    return knex.schema.createTable("product", tbl => {
        tbl.increments();
        tbl.string("product_id");
        tbl.string("color");
        tbl.integer("store_id")
            .references("id")
            .inTable("store")
            .onDelete("CASCADE")
            .onUpdate("CASCADE");
        tbl.timestamp("created_at").defaultsTo(knex.fn.now());
        tbl.timestamp("updated_last").defaultsTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists("product");
};
