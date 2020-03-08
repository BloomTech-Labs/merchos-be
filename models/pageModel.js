const db = require('../database/db-config');

module.exports = {
  getPages,
  addPage,
  updatePage,
  findBy,
  verifyPage
};

function getPages() {
  return db('page');
}

function addPage(page) {
  return db('page')
    .insert(page)
    .returning('*')
    .then(ids => {
      return findBy({ id: ids[0].id });
    });
}

function findBy(filter) {
  return db('page')
    .where(filter)
    .first();
}

function updatePage(id, data) {
  return db('page')
    .where({ id })
    .update(data);
}

async function verifyPage(user_id, page_id) {
  try {
    const storePageConnection = await db
      .select(
        'sp.page_id AS page_id',
        'sp.store_id AS store_id',
        'us.user_id AS user_id'
      )
      .from('store_page AS sp')
      .where({ page_id })
      .join('user_store AS us', 'us.store_id', 'sp.store_id')
      .first();

    return storePageConnection.user_id === user_id ? true : false;
  } catch (err) {
    console.log(err);
  }
  return;
}
