exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("roles")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("roles").insert([
        { role: "admin", role_desc: "is an admin" },
        { role: "users", role_desc: "Can create a store" },
        {
          role: "customers",
          role_desc: "Can purchase items from a store"
        }
      ]);
    });
};
