const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'jake',
    password: 'jake',
    database: 'contacts'
});

connection.connect();

// connection.query('SELECT * FROM contacts', function (error, results, fields) {
//   if (error) throw error;
//   console.log(results[0]);
// });

// connection.end();

module.exports = connection;