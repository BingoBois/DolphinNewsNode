const request = require("supertest");

describe('GET / - a simple api endpoint', () => {
  it('Hello API Request', async () => {
    const result = await request("http://80.240.24.203:3000/post/get/All").get('/');
    console.log()
    //expect(result.text).toEqual("hello");
    expect(result.statusCode).toEqual(200);
  });
})
