const mysql = require('mysql2');
const credentials = require('../credentials');

// Connect to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: credentials.password,
  database: 'employee_tracker',
});

module.exports = db;
