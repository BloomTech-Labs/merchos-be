
exports.seed = function (knex) {
  // Deletes ALL existing entries
  if (process.env.DB_ENV === 'development') {
    return knex('roles').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('roles').insert([
          { id: 1, roles: 'admin', role_desc: 'is an admin' },
          { id: 2, roles: 'users', role_desc: 'Can create a store' },
          { id: 3, roles: 'customers', role_desc: 'Can purchase items from a store' }
        ]);
      });
  } else {
    return knex('roles').del()
      .then(function () {
        // Inserts seed entries
        return knex('roles').insert([
          { id: 1, roles: 'admin', role_desc: 'is an admin' },
          { id: 2, roles: 'users', role_desc: 'Can create a store' },
          { id: 3, roles: 'customers', role_desc: 'Can purchase items from a store' }
        ]);
      });
  }
};
