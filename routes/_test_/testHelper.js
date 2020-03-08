const server = require('../../api/server');
const request = require('supertest');

module.exports = async function() {
  return await request(server)
    .post('/auth/login')
    .send({
      username: 'admin',
      password: 'password'
    })
    .then(res =>
      res.headers['set-cookie'][0]
        .split(',')
        .map(item => item.split(';')[0])
        .join(';')
    );
};
