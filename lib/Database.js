const { handle } = require('express/lib/application');
const mysql = require('mysql2');

class Database {
  constructor(config) {
    this.connection = mysql.createConnection(config);
  }
  query(sql, args) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, args, (err, rows) => {
        errorHandle(err);
        resolve(rows);
      });
    });
  }
  getManagers() {
    const query = 'SELECT * FROM employees WHERE manager_id IS NULL';
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, rows) => {
        errorHandle(err);
        const employeeNames = rows.map(employee => {
          return `${employee.first_name} ${employee.last_name}`;
        });
        resolve(employeeNames);
      });
    });
  }
  getRoles() {
    const query = 'SELECT * FROM role';
    return new Promise((resolve, reject) => {
      this.connection.query(query, (err, rows) => {
        errorHandle(err);
        const roles = rows.map(roles => {
          return roles.title;
        });
        resolve(roles);
      });
    });
  }
  getRoleId(roleName) {
    const query = 'SELECT * FROM role WHERE role.title = ?';
    let args = [roleName];

    return new Promise((resolve, reject) => {
      this.connection.query(query, args, (err, rows) => {
        errorHandle(err);
        resolve(rows);
      });
    });
  }
  getEmployeeID(name) {
    const employee = name.split(' ');
    const args = [employee[0], employee[1]];
    const query =
      'SELECT id FROM employees WHERE employees.first_name = ? AND employees.last_name = ?';
    return new Promise((resolve, reject) => {
      this.connection.query(query, args, (err, rows) => {
        errorHandle(err);
        resolve(rows);
      });
    });
  }
  close() {
    return new Promise((resolve, reject) => {
      this.connection.end(err => {
        if (err) return reject(err);
        console.log('Good Bye!');
        resolve();
        process.exit(0);
      });
    });
  }
}

function errorHandle(err) {
  if (err) {
    throw new Error('There was a problem with your request');
  }
}

module.exports = Database;
