const db = require('./db/connection');

class Database {
  constructor(config) {
    this.connection = config;
  }
}

module.exports = Database;
