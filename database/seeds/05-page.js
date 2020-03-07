exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('page')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('page').insert([
        {
          theme: 'Halloween',
          layout: '[{ columns: {}, positions: {}}]',
          color: "['red', 'yellow', 'blue']"
        }
      ]);
    });
};
