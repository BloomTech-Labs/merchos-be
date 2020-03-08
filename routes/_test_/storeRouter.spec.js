const server = require('../../api/server');
const request = require('supertest');

const db = require('../../database/db-config');

const login = require('./testHelper');

describe('Store Router', () => {
  describe('request to get a list of stores', () => {
    it('responds with 200', async () => {
      await request(server)
        .get('/store')
        .expect(200);
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
              store_name: 'MerchOS Test Store',
              store_url: 'merchos_test_store'
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

  describe('Creates a store', () => {
    it('responds with 201', async () => {
      const cookie = await login();

      await request(server)
        .post('/store')
        .set('Cookie', cookie)
        .send({
          store: {
            store_name: 'testingstore',
            store_url: 'testingstoreurl'
          }
        })
        .expect(201);
    });
  });

  const storeUrl = 'merchos_test_store';
  describe('updates a store', () => {
    it('responds with 201', async () => {
      const cookie = await login();
      const store = await request(server)
        .put(`/store/${storeUrl}`)
        .set('Cookie', cookie)
        .send({
          store_name: 'MerchOS Test Store',
          store_url: 'merchos_test_store'
        });
      expect(store.status).toBe(201);
    });
  });

  describe('deletes a store', () => {
    it('responds with 202', async () => {
      const cookie = await login();
      const store = await request(server)
        .delete(`/store/${storeUrl}`)
        .set('Cookie', cookie);
      expect(store.status).toBe(202);
    });
  });
});
