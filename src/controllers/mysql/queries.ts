import mysql, { Connection } from 'mysql';

import connection from './connection';

export function selectFromName(name: string) {
  return new Promise((resolve) => {
    connection.query('SELECT * FROM user WHERE username = ?', [name], (error, results, fields) => {
      let id = results[0].id;
      resolve(id);
    })
  });
}

export function closeConnection(){
  // connection.destroy();
  connection.end();
}
