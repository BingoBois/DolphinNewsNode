import mysql, { Connection } from 'mysql';

let connection: Connection = mysql.createConnection({
    host: 'viter.dk',
    user: 'transformer',
    password: 'mingade',
    database: 'dolphinnews'
});

connection.connect((err: Error) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log(`connected as id ${connection.threadId}`);
  });

export default connection;
