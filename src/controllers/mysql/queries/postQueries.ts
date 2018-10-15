import { PostObject } from '../../../types/post'
import connection from '../connection';
import { resolve } from 'url';




export function selectAllUsers_And_Show_Posts_And_CommentAmount(){
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
  
  export function selectAllUsers_And_Show_Posts(){
    return new Promise((resolve)=>{
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user'
      , (error, results, fields)=>{
        let usersAndPost = results;
        resolve(usersAndPost);
      })
    })
  }
  
  export function selectUser_ByID_Show_Posts(id: number){
    return new Promise((resolve) => {
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user WHERE user.id =?'
      ,[id], (error, results, fields) => {
        let userAndPost = results;
        resolve(userAndPost);
      })
    })
  }
  
  export function selectUser_ByName_Show_Posts(name: string){
    return new Promise((resolve) => {
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user WHERE user.username =?'
      ,[name], (error, results, fields) => {
        let userAndPost = results;
        resolve(userAndPost);
      })
    })
  }



export function selectPosts_ByTitle(title: string){
    return new Promise((resolve) => {
      connection.query('SELECT user.username AS user, post.title AS userpost, post.id as postId, post.url FROM user JOIN post ON user.id = post.fk_user WHERE post.title =?'
      ,[title], (error, results, fields) => {
        let PostByTitle = results;
        resolve(PostByTitle);
      })
    })
  }
  
  export function selectPosts_ById(postID: number){
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