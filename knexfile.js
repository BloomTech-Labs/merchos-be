// Update with your config settings.

require("dotenv").config();

module.exports = {
  development: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: "utf8"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds/dev"
    },
    useNullAsDefault: true
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds/dev"
    }
  },

  testing: {
    client: "pg",
    connection: {
      host: "127.0.0.1",
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      charset: "utf8"
    },
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds/dev"
    },
    useNullAsDefault: true
  },
  ccTesting: {
    client: "pg",
    connection: 'postgres://dxnkguylmorlnw:ab46398a1990fb35a8ba9bf22121f761c5644b380b364a8f914f000ccbf727cc@ec2-3-234-169-147.compute-1.amazonaws.com:5432/d4i8cunl9qr8sl',
    migrations: {
      directory: "./database/migrations"
    },
    seeds: {
      directory: "./database/seeds/dev"
    }
  }
};
