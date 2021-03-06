import { PostObject } from '../../../types/post'
import connection from '../connection';
import { resolve } from 'url';

//Retrieves all post and comments by Username
export function selectAllContentByUsername(username:string){
    return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.username AS userName, comment.`content` AS commentContent, comment.`time` as commentTime, comment.`id` as commentId, comment.`fk_comment` as commentNumber, comment.`fk_post` as postId, post.title as post_title, post.`url` as post_url, post.`time` as postTime, post.helge_id as hanesst_id '
    + 'FROM user '+
    'JOIN comment ON user.id = comment.`fk_user` '+
    'join post ON post.`id` = comment.`fk_post` '+
    'where user.username =?'
    , [username],(error, results, fields) =>{
      if(error != null){
        reject(error)
      }
      let post_and_comments_byuser_name = results;
      resolve(post_and_comments_byuser_name)
    })
    })
  }

//Retrieves all post and comments by User ID
export function selectAllContentByUserId(userid:number){
    return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.username AS userName, comment.`content` AS commentContent, comment.`time` as commentTime, comment.`id` as commentId, comment.`fk_comment` as commentNumber, comment.`fk_post` as postId, post.title as post_title, post.`url` as post_url, post.`time` as postTime, post.helge_id as hanesst_id '
    + 'FROM user '+
    'JOIN comment ON user.id = comment.`fk_user` '+
    'join post ON post.`id` = comment.`fk_post` '+
    'where user.id =?'
    , [userid],(error, results, fields) =>{
      if(error != null){
       reject(error)
      }
      let post_and_comments_byuser_id = results;
      resolve(post_and_comments_byuser_id)
    })
    })
  }
  
  //Retrieves all the content by Post iD
  export function selectAllContentByPostId(postid:number){
    return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.username AS userName, comment.`content` AS commentContent, comment.`time` as commentTime, comment.`id` as commentId, comment.`fk_comment` as commentNumber, comment.`fk_post` as postId, post.title as postTitle, post.`url` as post_url, post.`time` as postTime, post.helge_id as hanesst_id '
    + 'FROM user '+
    'JOIN comment ON user.id = comment.`fk_user` '+
    'join post ON post.`id` = comment.`fk_post` '+
    'where post.id =?'
    , [postid],(error, results, fields) =>{
      if(error != null){
        reject(error)
      }
      let post_and_comments_bypost_id = results;
      resolve(post_and_comments_bypost_id)
    })
    })
  }
  
   //Retrieves all the content by Post Title
  export function selectAllContentByPostTitle(postTitle:string){
    return new Promise((resolve, reject) => {
    connection.query('SELECT user.id as userId, user.userName AS user, comment.`content` AS commentContent, comment.`time` as commentTime, comment.`id` as commentId, comment.`fk_comment` as commentNumber, comment.`fk_post` as postID, post.title as postTitle, post.`url` as post_url, post.`time` as postTime, post.helge_id as hanesst_id '
    + 'FROM user '+
    'JOIN comment ON user.id = comment.`fk_user` '+
    'join post ON post.`id` = comment.`fk_post` '+
    'where post.title =?'
    , [postTitle],(error, results, fields) =>{
      if(error != null){
        reject(error)
      }
      let post_and_comments_bypost_title = results;
      resolve(post_and_comments_bypost_title)
    })
    })
  }

export function closeConnection(){
    connection.end();
  }
