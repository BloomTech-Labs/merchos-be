// Update with your config settings.

require("dotenv").config;
const pg = require("pg");
pg.defaults.ssl = true;
module.exports = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "./database/shops.db3"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    },
    pool: {
      afterCreate: (conn, done) => {
        conn.run("PRAGMA foreign_keys = ON", done);
      }
    }
  },

  staging: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: "./database/seeds"
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: ".database/migrations"
    },
    seeds: {
      directory: "./database/seeds"
    }
  }
};
