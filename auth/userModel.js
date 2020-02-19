const db = require('../config/dbConfig.js');

const add = user => {
  return db('users')
    .insert(user)
    .returning('id');
};

const addRole = role => {
  return db('roles').insert(role);
};

const findAllRoles = role => {
  return db('roles');
};

const findAll = () => {
  return db('users');
};

const findBy = filter => {
  return db('users')
    .where(filter)
    .first();
};

const findById = id => {
  return db('users').where({ id });
};

const remove = id => {
  return db('users')
    .where({ id })
    .del();
};

module.exports = {
  add,
  addRole,
  findAllRoles,
  findAll,
  findBy,
  findById,
  remove
};
