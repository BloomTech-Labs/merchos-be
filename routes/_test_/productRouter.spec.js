const server = require("../../api/server");
const request = require("supertest");



describe("GET /:store_id", () => {
    const store_id = 1;
    it("it can get a list of products from ", async () => {
        const res = await request(server).get(`/products/${store_id}`)
        expect(res.status).toBe(200);
    });
});

describe("GET /:product_id", () => {
    const product_id = 2;
    it("it can get a single product by id", async () => {
        const res = await request(server).get(`/products/product/${product_id}`)
        expect(res.status).toBe(200);
    })
})

describe("DELETE /:product_id",  () => {
    const product_id = 1;
    it("it can delete a product when given an id",async () => {
        const res = await request(server).delete(`/products/product/${product_id}`)
        expect(res.status).toBe(200);
    });
})