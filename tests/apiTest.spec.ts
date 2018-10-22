import { selectPostsFromId, selectAllUsersAndPosts, selectPostsFromTitle, selectSpecificUsersContentCount, selectUserIdFromPost, selectUsernameFromPosts }
  from '../src/controllers/mysql/queries/postQueries';
const request = require("supertest");

const URL = "http://80.240.24.203:3000"

describe('GET / - check that server is running', () => {
  it('should return statuscode 200', async () => {
    const result = await request(URL).get('/');
    expect(result.statusCode).toEqual(200);
  });
})

describe('GET / - an API-endpoint', () => {
  it('should return all comments as JSON', async () => {
    const result = await request(URL).get('/comment/get/all');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Comments).toEqual("object");
  });
})

describe('GET / - an API-endpoint', () => {
  it('should return all comments with votes as JSON', async () => {
    const result = await request(URL).get('/comment/get/all/withVote');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Comments).toEqual("object");
  });
})

describe('GET / - an API-endpoint', () => {
  it('should return the latest digested number as JSON', async () => {
    const result = await request(URL).get('/latest');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.message).toEqual("number");
  });
})

describe('GET / - an API-endpoint', () => {
  it('should return all posts as JSON', async () => {
    const result = await request(URL).get('/post/get/All');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post).toEqual("object");
  });
})

describe('GET / - an API-endpoint', () => {
  it('should return all users with post and commentamount for the specific post as JSON', async () => {
    const result = await request(URL).get('/post/get/all/commentamount');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post).toEqual("object");
  });
})

describe('GET / - an API-endpoint', () => {
  it('should return user with the specified ID as JSON', async () => {
    const result = await request(URL).get('/post/get/ByUser/id/1');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.User).toEqual("object");
  });
})

describe('GET / - an API-endpoint', () => {
  it('should return user with the specified name as JSON', async () => {
    const result = await request(URL).get('/post/get/ByUser/name/bingomanden');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.User).toEqual("object");
  });
})