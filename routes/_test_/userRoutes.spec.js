require('dotenv').config();
const server = require('../../api/server');
const request = require('supertest');

describe('userRoutes.js', () => {
  // before each, reset
  describe('POST to /user/register', () => {
    it('responds with 201', async () => {
      // since I am unable to truncate the user's table
      // due to foreign key constraints
      // here is a random string generator for usernames
      // and passwords for registration
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
      // create a user object with random strings in username and password
      // so as to not conflict with another user
      let user = {
        username: randomString(),
        password: randomString()
      };

      // await a response posted to the user/registration route
      const res = await request(server)
        .post('/user/register')
        .send(user);

      // expect the status to be 201
      expect(res.status).toBe(201);
    });
  });

  describe('POST to /user/login', () => {
    it('responds with 200', async () => {
      // create a user object with username and password already seeded
      // - Although this should be changed as it's a real admin account
      let user = {
        username: 'admin',
        password: 'password'
      };

      // await the response
      const res = await request(server)
        .post('/user/login')
        .send(user);

      // expect the status of that response to be 200
      expect(res.status).toBe(200);
    });
  });
});
