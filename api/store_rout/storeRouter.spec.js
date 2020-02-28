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


