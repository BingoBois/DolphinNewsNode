import mysql, { Connection } from 'mysql';
import { PostObject } from '../../types/post'

import connection from './connection';
import { resolve } from 'url';

export function selectFromName(name: string) {
  return new Promise((resolve) => {
    connection.query('SELECT * FROM user WHERE username = ?', [name], (error, results, fields) => {
      let id = results[0].id;
      resolve(id);
    })
  });
}

export function selectUserFromID(id: number){
  return new Promise((resolve) =>{
    connection.query('SELECT id,username,email,karma,role FROM user WHERE id =?', [id], (error, results, fields) => {
      let user = results;
      resolve(user);
    })
  })
}

export function selectAllUsers(){
  return new Promise((resolve)=>{
    connection.query('SELECT id,username,email,karma,role from user', (error, results, fields)=>{
      let users = results;
      resolve(users);
    })

  })
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

//Needs to have the correct FROM destination
//Currently just finds the highest (max) ID and returns it, might need to be readjusted in the future.
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
