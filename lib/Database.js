const mysql = require('mysql2');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        if (err) {
          console.log(err.sql);
          console.log('');
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
  getManagers() {
    let query = 'SELECT * FROM employees WHERE manager_id IS NULL';
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, rows) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const employeeNames = rows.map(employee => {
          return `${employee.first_name} ${employee.last_name}`;
        });
        resolve(employeeNames);
      });
    });
  }
  getRoles() {
    let query = 'SELECT * FROM role';
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, rows) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const roles = rows.map(roles => {
          return roles.title;
        });
        resolve(roles);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        console.log('Disconnected!');
        resolve();
        process.exit(0);
      });
    });
  }
}

module.exports = Database;
