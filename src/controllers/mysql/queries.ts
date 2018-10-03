import mysql, { Connection } from 'mysql';
import { PostObject } from '../../types/post'

import connection from './connection';

export function selectFromName(name: string) {
  return new Promise((resolve) => {
    connection.query('SELECT * FROM user WHERE username = ?', [name], (error, results, fields) => {
      let id = results[0].id;
      resolve(id);
    })
  });
}

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

export function closeConnection(){
  connection.end();
}
