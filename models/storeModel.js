const db = require('../database/db-config');

module.exports = {
  find,
  findBy,
  add,
  updateStore,
  remove,
  addUserStore,
  returnUserStores
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

function addUserStore(user_id, store_id) {
  return db('user_store').insert({
    user_id,
    store_id
  });
}

function returnUserStores(user_id) {
  return db
    .select('*')
    .from('user_store AS us')
    .where({ user_id })
    .join('store AS s', 's.id', '=', 'us.store_id');
}
