const db = require('../database/db-config');

module.exports = {
  find,
  findBy,
  add,
  remove
};

function find() {
  return db('store');
}

function findBy(name) {
  return db('store').where(name);
}

async function add(newStore) {
  return db('store').insert(newStore, 'id');
}

function remove(id) {
  return db('store')
    .where({ id })
    .first()
    .del();
}
