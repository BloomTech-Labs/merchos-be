const db = require('../database/db-config');

module.exports = {
  getPages,
  addPage,
  updatePage,
  findBy
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

// When you create a store, a page is also created, and is also created in the associative table (store_page)

// User flow
/**
 * 1. When a user logs in, search db for username and return user ID
 * 2. use the user ID to traverse user_store table and pull associated stores and their ids
 * 3. with the store id, we can search the store_page table and join based on page_id in matching columns
 * 4. pull page data using page ID
 */

// Getting a store
/**
 * 1. Visit store page, using the name, server returns store data
 * 2. This then traverses store_page data using the id
 * 3. Joins with store_page to return page layout data
 */

// STORE CREATION - DONE
// STORE RETREIVING - DONE
// STORE DELETION - DONE
// PAGE Update - DONE
// Update store info - DONE
// TESTS
