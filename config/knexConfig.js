const knex = require('knex');
const data = require('../knexfile.js');

const environment = process.env.DB_ENV

module.exports = knex(data[environment]);