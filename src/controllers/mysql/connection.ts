import mysql, { Connection } from 'mysql';

let connection: Connection = mysql.createConnection({
    host: '',
    user: 'dolphin',
    password: 'mingade',
    database: 'dolphinnews'
});


connection.connect((err: Error) => {
  if (err) {
    console.log('error connecting: ' + err.stack);
    return;
  }
  console.log(`connected as id ${connection.threadId}`);
});

connection.on('error', function() {
  console.log("Reconnecting");
  connection.connect();
});

export default connection;
