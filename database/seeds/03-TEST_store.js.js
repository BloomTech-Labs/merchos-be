exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('store')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('store').insert([
        { store_name: 'merchos_test_store', store_url: 'test' }
      ]);
    });
};
