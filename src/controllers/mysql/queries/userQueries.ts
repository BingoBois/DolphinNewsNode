import { PostObject } from '../../../types/post'
import connection from '../connection';
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
  
  export function selectUsers_With_Above_Or_Equal_Karma_Points(karma: number){
    return new Promise((resolve) =>{
      connection.query('SELECT id,username,email,karma,role FROM user WHERE karma >=?', [karma], (error, results, fields) => {
        let user = results;
        resolve(user);
      })
    })
  }
  
  export function selectUsers_With_Below_Or_Equal_Karma_Points(karma: number){
    return new Promise((resolve) =>{
      connection.query('SELECT id,username,email,karma,role FROM user WHERE karma <=?', [karma], (error, results, fields) => {
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
  
  export function selectAllAdmins(){
    return new Promise((resolve)=>{
      connection.query('SELECT id,username,email,karma,role from user WHERE role ="admin"', (error, results, fields)=>{
        let admins = results;
        resolve(admins);
      })
  
    })
  }
  
  export function selectAllMembers(){
    return new Promise((resolve)=>{
      connection.query('SELECT id,username,email,karma,role from user WHERE role ="member"', (error, results, fields)=>{
        let members = results;
        resolve(members);
      })
  
    })
  }

export function closeConnection(){
    connection.end();
  }