import { PostObject } from '../../../types/post'
import connection from '../connection';
import { resolve } from 'url';

//Retrives a specific user based on username
export function selectFromName(name: string) {
    return new Promise((resolve) => {
      connection.query('SELECT * FROM user WHERE username = ?', [name], (error, results, fields) => {
        let id = results[0].id;
        resolve(id);
      })
    });
  }
  
  //Retrives a specific user based on user id
  export function selectUserFromID(id: number){
    return new Promise((resolve) =>{
      connection.query('SELECT id,username,email,karma,role FROM user WHERE id =?', [id], (error, results, fields) => {
        let user = results;
        resolve(user);
      })
    })
  }
  
  //Retrives the users with equal-to or above Karma points
  export function selectUsersAboveKarma(karma: number){
    return new Promise((resolve) =>{
      connection.query('SELECT id,username,email,karma,role FROM user WHERE karma >=?', [karma], (error, results, fields) => {
        let user = results;
        resolve(user);
      })
    })
  }
  
  //Retrives the users with equal-to or below Karma points
  export function selectUsersBelowKarma(karma: number){
    return new Promise((resolve) =>{
      connection.query('SELECT id,username,email,karma,role FROM user WHERE karma <=?', [karma], (error, results, fields) => {
        let user = results;
        resolve(user);
      })
    })
  }
  
  //Retrieves all users (But no passwords!)
  export function selectAllUsers(){
    return new Promise((resolve)=>{
      connection.query('SELECT id,username,email,karma,role from user', (error, results, fields)=>{
        let users = results;
        resolve(users);
      })
  
    })
  }
  
   //Retrieves all users with role of "admin" (But no passwords!)
  export function selectAllAdmins(){
    return new Promise((resolve)=>{
      connection.query('SELECT id,username,email,karma,role from user WHERE role ="admin"', (error, results, fields)=>{
        let admins = results;
        resolve(admins);
      })
  
    })
  }
  
  //Retrieves all users with role of "member" (But no passwords!)
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