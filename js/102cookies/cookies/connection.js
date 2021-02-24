const mysql = require('mysql');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'jake',
    password: 'jake',
    database: 'users_test'
});

module.exports = pool;