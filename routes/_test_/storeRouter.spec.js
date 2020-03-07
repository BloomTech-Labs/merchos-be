const server = require('../../api/server');
const request = require('supertest');

describe('Store Router', () => {
  let fakePerson;
  let agent = request.agent(server);

  beforeEach(async () => {
    fakePerson = {
      username: 'admin',
      password: 'password'
    };

    return await agent
      .post('/auth/login')
      .send({
        username: fakePerson.username,
        password: fakePerson.password
      })
      .expect(200)
      .then(res => {
        const cookie = res.headers['set-cookie'][0]
          .split(',')
          .map(item => item.split(';')[0]);

        agent.jar.setCookies(cookie);
      });
  });

  describe('request to get a list of stores', () => {
    it('responds with 200', async () => {
      await request(server)
        .get('/store')
        .expect(200);
    });
  });

  describe('POST to /store', () => {
    it('responds with 201', async () => {
      await request(server)
        .post('/store')
        .send({
          store: {
            store_name: 'testingstore'
          }
        })
        .expect(201);
    });
  });

  // describe('GET a specific store', () => {
  //   const storeName = 'merchos_test_store';

  //   it('responds with 200', async () => {
  //     const store = await request(server).get(`/store/${storeName}`);
  //     expect(store.status).toBe(200);
  //   });

  //   it('responds with a specifc object', async () => {
  //     const store = await request(server).get(`/store/${storeName}`);
  //     const storeObj = JSON.parse(store.text);
  //     expect(storeObj).toEqual({
  //       data: {
  //         store: {
  //           store_id: 1,
  //           info: {
  //             store_name: 'merchos_test_store',
  //             store_url: 'test'
  //           }
  //         },
  //         page: {
  //           page_id: 1,
  //           info: {
  //             theme: 'Halloween',
  //             layout: '[{ columns: {}, positions: {}}]',
  //             color: "['red', 'yellow', 'blue']"
  //           }
  //         }
  //       }
  // });
  // });
});

//   describe('Creates a store', () => {
//     const storeInfo = {
//       store: {
//         store_name: 'testingstore1',
//         store_url: 'teststore123'
//       }
//     };

//     it('returns a status of 201', async () => {
//       const store = await request(server)
//         .post(`/store`)
//         .send(storeInfo);
//       expect(store.status).toBe(201);
//     });
//   });

//   describe('updates a store', () => {
//     const storeName = 'merchos_test_store';
//     it('responds with 201', async () => {
//       const store = await request(server)
//         .put(`/store/${storeName}`)
//         .send({
//           store_name: 'merchos_test_store',
//           store_url: 'test124'
//         });
//       expect(store.status).toBe(201);
//     });
//   });

//   describe('deletes a store', () => {
//     const storeName = 'merchos_test_store';
//     it('responds with 202', async () => {
//       const store = await request(server).delete(`/store/${storeName}`);
//       expect(store.status).toBe(202);
//     });
//   });
// });
// // get specific user store
