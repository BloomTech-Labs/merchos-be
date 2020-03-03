const server = require('../../api/server');
const request = require('supertest');

describe('Store Router', () => {
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
        .send({
          store: {
            store_name: 'TEST_STORE_',
            store_url: 'TEST_URL_'
          }
        })
        .expect(201);
      done();
    });
  });

  describe('GET a specific store', () => {
    const storeName = 'merchos_test_store';

    it('responds with 200', async () => {
      const store = await request(server).get(`/store/${storeName}`);
      expect(store.status).toBe(200);
    });

    it('responds with a specifc object', async () => {
      const store = await request(server).get(`/store/${storeName}`);
      const storeObj = JSON.parse(store.text);
      expect(storeObj).toEqual({
        data: {
          store: {
            store_id: 1,
            info: {
              store_name: 'merchos_test_store',
              store_url: 'test'
            }
          },
          page: {
            page_id: 1,
            info: {
              theme: 'Halloween',
              layout: '[{ columns: {}, positions: {}}]',
              color: "['red', 'yellow', 'blue']"
            }
          }
        }
      });
    });
  });
});

// get specific store

// create a store

// update a store

// delete a store

// get specific user store
