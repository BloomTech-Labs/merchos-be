exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_store')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('user_store').insert([{ user_id: 1, store_id: 1 }]);
    });
};
