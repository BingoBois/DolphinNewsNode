import { PostObject } from '../../../types/post'
import connection from '../connection';
import { resolve } from 'url';

// Retrieves all comments
export function selectAllComments(){
    return new Promise((resolve, reject) => {
    connection.query(
    'SELECT   comment.`id` as commentId, comment.`content` AS commentContent, comment.`time` as commentTime, user.id as userId, user.username AS userName, comment.`fk_comment` as commentNumber, comment.`fk_post` as postId, post.title as post_title, post.`url` as post_url, post.`time` as postTime, post.helge_id as hanesst_id' 
    +' FROM user ' 
    +' JOIN comment ON user.id = comment.`fk_user`' 
    +' join post ON post.`id` = comment.`fk_post`'
    ,(error, results, fields) =>{
      if(error != null){
        reject(error)
      }
      let allComments = results;
      resolve(allComments)
    })
    })
  }

  //Retrives all comments based on the ID
  export function selectAllCommentsFromPostId(postId: number){
    return new Promise((resolve, reject) => {
      connection.query('SELECT `comment`.id ,`comment`.content, comment.time, comment.fk_user, user.username, post.helge_id as hanesst_id \
        FROM comment \
        LEFT JOIN user ON comment.fk_user=user.id \
        JOIN post on post.id = comment.fk_post \
        WHERE fk_post = ? \
        GROUP BY comment.id',
        [postId], (error, rows, fields) => {
          if(error != null){
            reject(error)
          }
          let comments = rows;
        resolve(rows);
      });
    });
  }

//Retrives only comments with votes!
/* 
  export function selectAllCommentsFromPostId(postId: number){
    return new Promise((resolve) => {
      connection.query('SELECT `comment`.id ,`comment`.content, comment.time, comment.fk_user, user.username\
        FROM comment \
        LEFT JOIN user ON comment.fk_user=user.id \
         JOIN vote_comment ON `vote_comment`.`fk_comment` \
        WHERE fk_post = ? \
        GROUP BY comment.id',
        [postId], (error, rows, fields) => {
          let comments = rows;
        resolve(rows);
      });
    });
  }
*/

  //Retrieves all the comments with (and only with) votes
  export function selectGetAllCommentsWithVotes() {
    return new Promise((resolve, reject) => {
        connection.query('Select vote_comment.`fk_comment` as commentId, comment.`content` as commentContent, user.`username` as userName, SUM(vote_comment.amount) as votesCount, post.id as postId, post.url as post_url from vote_comment, post.helge_id as hanesst_id join comment on comment.`id` = vote_comment.fk_comment join user on comment.`fk_user` = user.`id` join post on comment.`fk_post` = post.id GROUP BY vote_comment.fk_comment', (error, results, fields) => {
        let allComments = results;
        if(error != null){
          reject(error)
        }
        resolve(allComments);
      })
    });
  }

export function closeConnection(){
    connection.end();
  }
