require('dotenv').config();
const server = require('../../api/server');
const request = require('supertest');

describe('authentication', () => {
  // Create a random string generator
  function randomString() {
    return (
      Math.random()
        .toString(36)
        .substring(2, 15) +
      Math.random()
        .toString(36)
        .substring(2, 15)
    );
  }

  describe('POST to /user/register', () => {
    // create a user object with random strings in username and password
    // so as to not conflict with another user
    let user = {
      username: randomString(),
      password: randomString()
    };
    it('responds with 201', async () => {

      // await a response posted to the user/registration route
      const res = await request(server)
        .post('/auth/register')
        .send(user);

      // expect the status to be 201
      expect(res.status).toBe(201);
    });

    it('responds with 200', async () => {
      let user = {
        username: 'testingadmin',
        password: 'password'
      };

      // register user
      await request(server)
        .post('/auth/register')
        .send(user);

      // await the response
      const res = await request(server)
        .post('/auth/login')
        .send(user);

      // expect the status of that response to be 200
      expect(res.status).toBe(200);
    });
  });
});
