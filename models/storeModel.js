const db = require('../database/db-config');

module.exports = {
  find,
  findBy,
  add,
  updateStore,
  remove
};

function find() {
  return db('store');
}

function findBy(filter) {
  return db('store')
    .where(filter)
    .first();
}

function add(newStore) {
  return db('store')
    .insert(newStore)
    .returning('*')
    .then(ids => {
      return findBy({ id: ids[0].id });
    });
}

function updateStore(filter, storeData) {
  return db('store')
    .where(filter)
    .update(storeData)
    .returning('*');
}

function remove(filter) {
  return db('store')
    .where(filter)
    .first()
    .del();
}
