import mysql, { Connection } from 'mysql';
import { PostObject } from '../../../types/post'
import connection from '../connection';
import UserObject from '../../../types/user';
import  Vote  from '../../../types/vote';

const crypto = require('crypto');
const secret = 'mingade85';

export function createPost(postObject: PostObject){
  return new Promise((resolve, reject) => {
    switch(postObject.post_type){
      case 'story': {
        connection.query('INSERT INTO post (title, url, time, fk_user) VALUES (?, ?, ?, (SELECT id FROM user WHERE username = ?))',
        [postObject.post_title, postObject.post_url, new Date(), postObject.username],
        (error, results, fields) => {
          resolve(results);
        });
        break;
      }
      case 'comment': {
        connection.query('INSERT INTO comment (content, time, fk_user, fk_post) VALUES (?, ?, (SELECT id FROM user WHERE username = ?), ?, ?)',
        [postObject.post_text, new Date(), postObject.username, postObject.post_parent],
        (error, results, fields) => {
          resolve(results);
        });
        break;
      }
      default: {
       reject('Invalid post_type');
      }
    }
  });
  
}

export function createUser(userObject: UserObject){
  const hash = crypto.
              createHmac('sha256', secret).
              update(userObject.password).
              digest('hex');
  
  return new Promise((resolve, reject) => {
    connection.query('INSERT INTO user (username, password, email, karma, role) VALUES (?, ?, ?, ?, ?)',
    [userObject.username, hash, userObject.email, userObject.karma, "member"],
    (error, results, fields) => {
      if(error != null){
        reject(error);
      }
      resolve(results)
    });
    
  });
}

export function getUser(username: string, password: string){

  const hash = crypto.
              createHmac('sha256', secret).
              update(password).
              digest('hex');
  console.log(hash)
  return new Promise((resolve, reject) => {
    connection.query('SELECT * FROM user where username=? AND password=?',
    [username, hash],
    (error, results, fields) => {
      if(error != null){
        reject(error);
      }
      resolve(results[0])
    });
    
  });
}

export function vote(vote: Vote){
  return new Promise((resolve, reject) => {
    switch(vote.vote_type){
      case 'comment':
          connection.query('INSERT INTO vote_comment (amount, fk_user, fk_comment) VALUES (?,?,?)',
          [vote.amount, vote.fk_user, vote.fk_comment],
          (error, results, fields) => {
            if(error !== null){
              reject(error);
            }
            resolve(results);
          });
        break;
      case 'post':
          connection.query('INSERT INTO vote_post (amount, fk_user, fk_post) VALUES (?,?,?)',
          [vote.amount, vote.fk_user, vote.fk_post],
          (error, results, fields) => {
            if(error !== null){
              reject(error);
            }
            resolve(results);
          });
        break;
    }
  });
}

//Retrieves the latest (successfully) digested data
export function latestDigestedPostNumber() {
  return new Promise((resolve) => {
      connection.query('SELECT * FROM user ORDER BY id DESC LIMIT 1', (error, results, fields) => {
      let latestDigestedNumber = results[0].id;
      resolve(latestDigestedNumber);
    })
  });
}

export function closeConnection(){
  connection.end();
}
