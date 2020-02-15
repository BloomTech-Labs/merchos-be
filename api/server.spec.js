const server = require("./server");
const request = require("supertest");
const db = require("../config/dbConfig");

describe("userRoutes.js", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });
});

describe("POST to /user/roles", () => {
  it("responds with 201", async done => {
    await request(server)
      .post("/user/roles")
      .send({ role: "admin", role_desc: "is an admin" })
      .expect(201);
    done();
  });
});

describe("get request to /user", () => {
  it("responds with 200", async done => {
    await request(server)
      .get("/user")
      .expect(200);

    done();
  });
});

describe("request to server", () => {
  it("responds ok", async done => {
    await request(server)
      .get("/")
      .expect(200);

    done();
  });
});
