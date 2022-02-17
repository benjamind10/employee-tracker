const credentials = require('../credentials');

const config = {
  host: 'localhost',
  user: 'root',
  password: credentials.password,
  database: 'employee_tracker',
};

module.exports = config;
