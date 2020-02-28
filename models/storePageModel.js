const db = require('../database/db-config');

module.exports = {
  addStorePage,
  findStorePage
};

// store_page table
function addStorePage(storeData, pageData) {
  return db('store_page')
    .insert({
      store_id: storeData.id,
      page_id: pageData.id
    })
    .returning('*')
    .then(ids => {
      return db('store_page as sp')
        .where({ id: ids[0].id })
        .first();
    });
}

function findStorePage(id) {
  return db('store_page').where({ id });
}
