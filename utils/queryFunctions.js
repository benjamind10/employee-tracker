// Imports
const cTable = require('console.table');

// Main object that holds async functions
const fn = {
  renderEmployees: async function renderEmployees(db) {
    const query = 'SELECT * FROM employees;';

    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  renderDepartments: async function renderDepartments(db) {
    const query = ' SELECT * FROM department;';
    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  renderRoles: async function renderRoles(db) {
    const query = `SELECT role.id, role.title, role.salary, department.name AS department FROM role INNER JOIN department ON department.id = role.department_id;`;
    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  renderEmpDepartment: async function renderEmployeeDepartment(db) {
    const query = `   
   SELECT employees.first_name, employees.last_name, role.title, role.salary, department.name AS department, e2.first_name AS manager_fn, e2.last_name AS manager_ln
    FROM employees 
        JOIN role ON role.id = employees.role_id 
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employees AS e2 ON employees.manager_id = e2.id
        ORDER BY employees.id;`;

    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  addDepartment: async function addDepartment(db, newDapartment) {
    const departmentName = newDapartment.departmentName;

    const query = 'INSERT into department (name) VALUES (?)';
    const args = [departmentName];
    const rows = await db.query(query, args);

    console.log('');
    return `Added department named ${departmentName}`;
  },

  addEmployee: async function addEmployee(
    db,
    employee,
    roleID,
    managerID
  ) {
    const query =
      'INSERT into employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)';
    const args = [
      employee.first_name,
      employee.last_name,
      roleID[0].id,
      managerID,
    ];

    const rows = await db.query(query, args);
    console.log('');
    return `Added employee ${employee.first_name} ${employee.last_name}.`;
  },

  addRole: async function addRole(db, newDept, deptID) {
    const name = newDept.roleName;
    const salary = newDept.salary;
    const departmentID = deptID[0].id;

    let args = [name, salary, departmentID];
    const query =
      'INSERT into role (title, salary, department_id) VALUES (?,?,?)';

    const rows = await db.query(query, args);
    console.log('');
    console.log(`${name} added.`);
  },

  removeEmployee: async function removeEmployee(db, employee) {
    const query =
      'DELETE FROM employees WHERE first_name = ? AND last_name = ?';
    const name = employee.split(' ');
    const args = [name[0], name[1]];

    const rows = await db.query(query, args);
    console.log('');
    return `Removed: ${employee}`;
  },

  updateEmployee: async function updateEmployee(db, employee, role) {
    const name = employee.split(' ');
    const newRole = role[0].id;
    console.log(newRole);
    const query =
      'UPDATE employees SET role_id = ? WHERE employees.first_name = ? AND employees.last_name = ?';
    const args = [newRole, name[0], name[1]];

    const rows = await db.query(query, args);
    console.log('');
    return `Updated: ${employee}`;
  },
};

module.exports = fn;
