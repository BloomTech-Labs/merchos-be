const db = require("../database/db-config");

module.exports = {
  addStorePage,
  findStorePage,
  storePageObj,
  deleteStore
};

// store_page table
function addStorePage(storeData, pageData) {
  return db("store_page")
    .insert({
      store_id: storeData.id,
      page_id: pageData.id
    })
    .returning("*")
    .then((ids) => {
      return db("store_page as sp").where({ id: ids[0].id }).first();
    });
}

function findStorePage(id) {
  return db
    .select("*")
    .from("store_page AS sp")
    .join("store AS s", "sp.store_id", "s.id")
    .join("page AS p", "sp.page_id", "p.id")
    .where("sp.id", id)
    .first();
}

function storePageObj(data) {
  return {
    store: {
      store_id: data.store_id,
      info: {
        store_name: data.store_name,
        store_url: data.store_url
      }
    },
    page: {
      page_id: data.page_id,
      info: {
        layout: data.layout,
        content: data.content
      }
    }
  };
}

async function deleteStore(store_id) {
  try {
    const storePage = await db("store_page").where({ store_id }).first();
    await db("store").where({ id: storePage.store_id }).del();

    await db("page").where({ id: storePage.page_id }).del();
  } catch (err) {
    console.log(err);
  }
}
