const db = require('../../config/dbConfig');

module.exports = {
    find,
    findBy,
    add,
    findById,
    remove
};

function find() {
    return db('store');
};

function findBy(name) {
    return db('store').where(name);
};

async function add(newStore) {
    return db('store')
    .insert(newStore, 'id');
  };


  function findById(id) {
    return db('store')
      .where({ id })
      .first();
  };

  function remove(id) {
    return db('store')
      .where({ id })
      .first()
      .del();
  };