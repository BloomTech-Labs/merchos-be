const db = require('../database/db-config');
module.exports = {
    add,
    findByStoreId,
    findById,
    remove,
}

function findByStoreId(store_id) {
    return db("product").where({ store_id })
}

function findById(id) {
    return db("product").where({ id }).first();
}

function add(product) {
    return db("product")
        .insert(product)
        .returning("id")
        .then((ids) => findById(ids[0]))
}

function remove(id) {
    return db("product").where({id}).del();
}
