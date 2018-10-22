const request = require("supertest");

const URL = "http://80.240.24.203:3000"

describe('GET / - an API-endpoint', () => {
  it('should return all posts as JSON', async () => {
    const result = await request(URL).get('/post/get/All');
    console.log(typeof result.body.Post)
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post).toEqual("object");
  });
})
