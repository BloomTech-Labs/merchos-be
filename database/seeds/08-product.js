
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('product').del()
    .then(function () {
      // Inserts seed entries
      return knex('product').insert([
        { product_id: "gildan-sweatshirt-crew", color: "ash", store_id: 1 },
        { product_id: "gildan-hoodie-50-50-crew", color: "black", store_id: 1 },
        { product_id: "hat", color: "blue", store_id: 1 },
      ]);
    });
};
