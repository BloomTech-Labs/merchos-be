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
  return db
    .select('*')
    .from('store_page AS sp')
    .join('store AS s', 'sp.store_id', 's.id')
    .join('page AS p', 'sp.page_id', 'p.id')
    .where('sp.id', id)
    .first();
}
