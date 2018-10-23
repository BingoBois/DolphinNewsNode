import { selectPostsFromId, selectAllUsersAndPosts, selectPostsFromTitle, selectSpecificUsersContentCount, selectUserIdFromPost, selectUsernameFromPosts }
  from '../src/controllers/mysql/queries/postQueries';
const request = require("supertest");

const URL = "http://80.240.24.203:3000"

describe('GET / - check if server is running', () => {
  it('should return statuscode 200', async () => {
    const result = await request(URL).get('/');
    expect(result.statusCode).toEqual(200);
  });
})

describe('GET /comment/get/all - an API-endpoint', () => {
  it('should return all comments as JSON', async () => {
    const result = await request(URL).get('/comment/get/all');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Comments).toEqual("object");
  });
})

describe('GET /comment/get/all/withVote - an API-endpoint', () => {
  it('should return all comments with votes as JSON', async () => {
    const result = await request(URL).get('/comment/get/all/withVote');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Comments).toEqual("object");
  });
})

describe('GET /latest - an API-endpoint', () => {
  it('should return the latest digested number as JSON', async () => {
    const result = await request(URL).get('/latest');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.message).toEqual("number");
  });
})

describe('GET /post/get/All - an API-endpoint', () => {
  it('should return all posts as JSON', async () => {
    const result = await request(URL).get('/post/get/All');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post).toEqual("object");
  });
})

describe('GET /post/get/all/commentamount - an API-endpoint', () => {
  it('should return all users with post and commentamount (as JSON) for the specific post', async () => {
    const result = await request(URL).get('/post/get/all/commentamount');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post).toEqual("object");
  });
})

describe('GET /post/get/ByUser/id/:id - an API-endpoint', () => {
  it('should return user with the specified ID as JSON', async () => {
    const result = await request(URL).get('/post/get/ByUser/id/1');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.User).toEqual("object");
  });
})

describe('GET /post/get/ByUser/name/:name - an API-endpoint', () => {
  it('should return user (as JSON) with the specified name', async () => {
    const result = await request(URL).get('/post/get/ByUser/name/bingomanden');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.User).toEqual("object");
  });
})

describe('GET /post/get/byTitle/:title - an API-endpoint', () => {
  it('should return post as JSON with the specified name', async () => {
    const result = await request(URL).get('/post/get/byTitle/Warcraft');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post).toEqual("object");
  });
})

describe('GET /post/get/byID/:id - an API-endpoint', () => {
  it('should return post (as JSON) with the specified ID', async () => {
    const result = await request(URL).get('/post/get/byID/1');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post).toEqual("object");
  });
})

describe('GET /postandcomments/get/byUser/name/:username - an API-endpoint', () => {
  it('should return posts and comments (as JSON) for user with the specified username', async () => {
    const result = await request(URL).get('/postandcomments/get/byUser/name/bingomanden');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post_And_Comments_By_User_Name).toEqual("object");
  });
})

describe('GET /postandcomments/get/byUser/id/:userID - an API-endpoint', () => {
  it('should return posts and comments (as JSON) for user with the specified ID', async () => {
    const result = await request(URL).get('/postandcomments/get/byUser/id/1');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post_And_Comments_By_User_Id).toEqual("object");
  });
})

describe('GET /postandcomments/get/byPost/id/:postID - an API-endpoint', () => {
  it('should return posts and comments (as JSON) with the specified post ID', async () => {
    const result = await request(URL).get('/postandcomments/get/byPost/id/1');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post_And_Comments_By_Post).toEqual("object");
  });
})

describe('GET /postandcomments/get/byPost/title/:postTitle - an API-endpoint', () => {
  it('should return posts and comments (as JSON) with the specified post title', async () => {
    const result = await request(URL).get('/postandcomments/get/byPost/title/NYC%20Developer%20Dilemma');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.Post_And_Comments_By_Post).toEqual("object");
  });
})

describe('GET /status - an API-endpoint', () => {
  it('should return "Alive" as the status of the server', async () => {
    const result = await request(URL).get('/status');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body).toEqual("object");
  });
})

describe('GET /status/404 - an API-endpoint', () => {
  it('should return "Alive" as the status of the server', async () => {
    const result = await request(URL).get('/status/404');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body).toEqual("object");
  });
})

describe('GET /user/get/ByID/:id - an API-endpoint', () => {
  it('should return the user (as JSON) with the specified ID', async () => {
    const result = await request(URL).get('/user/get/ByID/1');
    expect(result.statusCode).toEqual(200);
    expect(typeof result.body.User).toEqual("object");
  });
})