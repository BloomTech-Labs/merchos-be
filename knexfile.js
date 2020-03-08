// Update with your config settings.

require('dotenv').config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: 'utf8'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    }
  },

  testing: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: 'utf8'
    },
    migrations: {
      directory: './database/migrations'
    },
    seeds: {
      directory: './database/seeds'
    },
    useNullAsDefault: true
  },
  test: {
    client: "postgresql", connection: {
        database: "merchos-test",
        user: "postgres",
        password: "password",
        port: 5432,
    }, migrations: {
        directory: "./database/migrations",
    }, seeds: {
        directory: "./database/seeds",
    }, pool: {
        min: 2, max: 10,
    },
}
};
