const credentials = require('../credentials');
require('dotenv').config();

const config = {
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
};

module.exports = config;
