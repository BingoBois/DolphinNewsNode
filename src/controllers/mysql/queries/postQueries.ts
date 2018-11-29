import { PostObject } from '../../../types/post'
import connection from '../connection';
import { resolve } from 'url';

//Displays all users and show their post and commentamount for the specific post
export function showPostCommentAmount() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT post.id as postId, post.title AS post_title, post.text as post_text, user.username AS userName, user.id as userId, COUNT(comment.`fk_post`) as NumberOfComments,  post.url as post_url, post.time as postTime, post.helge_id as hanesst_id'
      + ' FROM user '
      + ' JOIN post ON user.id = post.fk_user '
      + ' join comment on comment.`fk_post` = post.id'
      + ' GROUP BY post.id'
      , (error, results, fields) => {
        if (error != null) {
          reject(error)
        }
        let usersAndPost = results;
        resolve(usersAndPost);
      })
  })
}

//Display all post with votes
export function showPostVotes() {
  return new Promise((resolve, reject) => {
    connection.query('Select vote_post.`fk_post` as postId, post.`title` as post_title, post.text as post_text, user.`id` as userId, user.`username` as userName, SUM(vote_post.amount) as postVotes, post.url as post_url, post.time as postTime, post.helge_id as hanesst_id '
      + ' from vote_post'
      + ' join post on post.`id` = vote_post.fk_post '
      + ' join user on post.`fk_user` = user.`id` '
      + ' GROUP BY vote_post.fk_post'
      , (error, results, fields) => {
        if (error != null) {
          reject(error)
        }
        let usersAndPost = results;
        resolve(usersAndPost);
      })
  })
}

// Used for creating a new post from the Frontend
export function createNonHelgePost(postObject: any) {
  return new Promise((resolve, reject) => {
    connection.query(
      "INSERT INTO post (title, text, url, time, helge_id, fk_user) VALUES (?, ?, ?, ?, 0, ?)",
      [
        postObject.postTitle,
        postObject.postText,
        postObject.postURL,
        new Date(),
        postObject.userId
      ],
      (error, results, fields) => {
        if (error !== null) {
          reject(error)
        }
        resolve(results);
      }
    );
  });
}

//Display all users and corensponding post
export function selectAllUsersAndPosts() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.username AS userName, post.id as postId, post.title AS post_title, post.text as post_text, post.url as post_url, post.time as postTime, post.helge_id as hanesst_id FROM user JOIN post ON user.id = post.fk_user'
      , (error, results, fields) => {
        if (error != null) {
          reject(error)
        }
        let usersAndPost = results;
        resolve(usersAndPost);
      })
  })
}

//Display all the post by a specific user id
export function selectUserIdFromPost(id: number) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.username AS userName, post.id as postId, post.title AS post_title, post.text as post_text, post.url as post_url, post.time as postTime, post.helge_id as hanesst_id FROM user JOIN post ON user.id = post.fk_user WHERE user.id =?'
      , [id], (error, results, fields) => {
        if (error != null) {
          reject(error)
        }
        let userAndPost = results;
        resolve(userAndPost);
      })
  })
}

//Display all the post by a specific user name
export function selectUsernameFromPosts(name: string) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.username AS userName, post.id as postId,post.title AS post_title, post.text as post_text, post.url as post_url, post.time as postTime, post.helge_id as hanesst_id FROM user JOIN post ON user.id = post.fk_user WHERE user.username =?'
      , [name], (error, results, fields) => {
        if (error != null) {
          reject(error)
        }
        let userAndPost = results;
        resolve(userAndPost);
      })
  })
}

//Display a specific post by title
export function selectPostsFromTitle(title: string) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.username AS userName, post.id as postId, post.title AS post_title, post.text as post_text, post.url as post_url, post.helge_id as hanesst_id FROM user JOIN post ON user.id = post.fk_user WHERE post.title =?'
      , [title], (error, results, fields) => {
        if (error != null) {
          reject(error)
        }
        let PostByTitle = results;
        resolve(PostByTitle);
      })
  })
}

//Display a specific post by ID
export function selectPostsFromId(postID: number) {
  return new Promise((resolve, reject) => {
    connection.query('SELECT  user.id as userID, user.username AS userName, post.id as postId, post.title AS post_title, post.text as post_text, post.url as post_url, post.helge_id as hanesst_id FROM user JOIN post ON user.id = post.fk_user WHERE post.id =?'
      , [postID], (error, results, fields) => {
        if (error != null) {
          reject(error)
        }
        let PostByTitle = results;
        resolve(PostByTitle);
      })
  })
}

export function closeConnection() {
  connection.end();
}
