exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('page')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('page').insert([
        {
          content:
            "[{'style': {},'content': {'message': 'stuff'},'contentType':'banner','id': 'banner-1588199433000'}]",
          layout:
            "[{ 'minW': 12, 'maxW': 12, 'minH': 2, 'maxH': 2, 'w': 12, 'h': 2, 'x': 0, 'y': 3, 'i': '0' }]",
        },
      ])
    })
}
