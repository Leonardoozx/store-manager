const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
});

module.exports = connection;
