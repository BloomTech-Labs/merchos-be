const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          role_id: 1,
          username: "admin",
          password: bcrypt.hashSync("password", 12),
          first_name: "Jhon",
          last_name: "Smith",
          phone_number: "(870) 780-2094",
          account_number: "AL86751639367318444714198669",
          routing_number: "021000021",
          card_number: "4003830171874018",
          card_exp: "12/23",
          card_security: "100",
          card_name: "Jhon Smith",
          address_street: "700 T Street",
          address_city: "Las Vegas",
          address_state: "Arizona",
          address_country: "United States",
          address_zip: "8989"
        }
      ]);
    });
};
