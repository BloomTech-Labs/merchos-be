exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('component')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('component').insert([
        {
          id: 1
        }
      ]);
    });
};
