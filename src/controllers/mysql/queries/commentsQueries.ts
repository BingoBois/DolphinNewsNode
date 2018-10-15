import { PostObject } from '../../../types/post'
import connection from '../connection';
import { resolve } from 'url';

export function selectAllComments(){
    return new Promise((resolve) => {
    connection.query(
    'SELECT   comment.`id` as commentId, comment.`content` AS usercomment, comment.`time` as commentTime, user.id as userID, user.username AS user,  comment.`fk_comment` as commentNumber, comment.`fk_post` as postID, post.title as postTitle, post.`url`, post.`time` as postTime' 
    +' FROM user ' 
    +' JOIN comment ON user.id = comment.`fk_user`' 
    +' join post ON post.`id` = comment.`fk_post`'
    ,(error, results, fields) =>{
      let allComments = results;
      resolve(allComments)
    })
    })
  }

  export function selectGetAllComments_With_Votes() {
    return new Promise((resolve) => {
        connection.query('Select vote_comment.`fk_comment` as commentID, comment.`content` as commentContent, user.`username` as Author, SUM(vote_comment.amount) as Votes, post.url as postURL from vote_comment join comment on comment.`id` = vote_comment.fk_comment join user on comment.`fk_user` = user.`id` join post on comment.`fk_post` = post.id GROUP BY vote_comment.fk_comment', (error, results, fields) => {
        let allComments = results;
        resolve(allComments);
      })
    });
  }

export function closeConnection(){
    connection.end();
  }