exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('store_page')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('store_page').insert([
        {
          store_id: 1,
          page_id: 1
        }
      ]);
    });
};
