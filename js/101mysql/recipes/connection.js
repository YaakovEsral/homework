const mysql = require('mysql');

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'jake',
    password: 'jake',
    database: 'recipes2' 
})


module.exports = pool;