const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Isa262406!#',
  database: 'heroes_db'
});

module.exports = connection;