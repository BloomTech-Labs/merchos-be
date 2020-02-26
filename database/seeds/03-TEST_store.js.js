exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("store")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("store").insert([
        { name: "MERCHOS_TEST_STORE", url: "TEST" }
      ]);
    });
};