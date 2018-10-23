import { PostObject } from '../../../types/post'
import connection from '../connection';
import { resolve } from 'url';



//Displays all users and show their post and commentamount for the specific post
export function selectSpecificUsersContentCount(){
    return new Promise((resolve)=>{
      connection.query('SELECT post.id as postId, post.title AS userpost, user.username AS user, COUNT(comment.`fk_post`) as NumberOfComments,  post.url, post.time' 
     + ' FROM user '
     + ' JOIN post ON user.id = post.fk_user '
     + ' join comment on comment.`fk_post` = post.id'
     + ' GROUP BY post.id'
      , (error, results, fields)=>{
        let usersAndPost = results;
        resolve(usersAndPost);
      })
    })
  }
  
  //Display all users and corensponding post
  export function selectAllUsersAndPosts(){
    return new Promise((resolve)=>{
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url, post.time FROM user JOIN post ON user.id = post.fk_user'
      , (error, results, fields)=>{
        let usersAndPost = results;
        resolve(usersAndPost);
      })
    })
  }

  //Display all the post by a specific user id
  export function selectUserIdFromPost(id: number){
    return new Promise((resolve) => {
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user WHERE user.id =?'
      ,[id], (error, results, fields) => {
        let userAndPost = results;
        resolve(userAndPost);
      })
    })
  }
  
  //Display all the post by a specific user name
  export function selectUsernameFromPosts(name: string){
    return new Promise((resolve) => {
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user WHERE user.username =?'
      ,[name], (error, results, fields) => {
        let userAndPost = results;
        resolve(userAndPost);
      })
    })
  }


//Display a specific post by title
export function selectPostsFromTitle(title: string){
    return new Promise((resolve) => {
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user WHERE post.title =?'
      ,[title], (error, results, fields) => {
        let PostByTitle = results;
        resolve(PostByTitle);
      })
    })
  }
  
  //Display a specific post by ID
  export function selectPostsFromId(postID: number){
    return new Promise((resolve) => {
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user WHERE post.id =?'
      ,[postID], (error, results, fields) => {
        let PostByTitle = results;
        resolve(PostByTitle);
      })
    })
  }

export function closeConnection(){
    connection.end();
  }
