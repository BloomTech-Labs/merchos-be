const server = require('../server');
const request = require('supertest');

describe('request to get a list of stores', () => {
  it('responds with 200, our list of stores users can connect to exists', async done => {
    await request(server)
      .get('/store')
      .expect(200);
    done();
  });
});

describe('POST to /store', () => {
    it('responds with 201', async done => {
      await request(server)
        .post('/store')
        .send({name:'TEST_STORE_', url: 'TEST_URL_' })
        .expect(201);
      done();
    });
});


