const server = require('./server');
const request = require('supertest');

const db = require('../database/db-config');

describe('request to server', () => {
  beforeAll(async () => {
    return await db.seed.run();
  });

  it('responds with 200', async done => {
    await request(server)
      .get('/')
      .expect(200);
    done();
  });
});

describe('POST to /user/roles', () => {
  it('responds with 201', async done => {
    await request(server)
      .post('/user/roles')
      .send({ role: 'admin', role_desc: 'is an admin' })
      .expect(201);
    done();
  });

  it('responds with json', async done => {
    await request(server)
      .post('/user/roles')
      .send({ role: 'user', role_desc: 'Can create a store' })
      .expect(201);
    done();
  });

  it('responds with json', async done => {
    await request(server)
      .get('/user/roles')
      .expect(200);
    done();
  });
});

describe('get request to /user', () => {
  it('responds with 200', async done => {
    await request(server)
      .get('/user')
      .expect(200);

    done();
  });

  it('responds with json', async done => {
    await request(server)
      .get('/user')
      .expect(200);

    done();
  });
});
