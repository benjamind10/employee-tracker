const cTable = require('console.table');
const questions = require('./questions');

const fn = {
  renderEmployees: async function renderEmployees(db) {
    const query = 'SELECT * FROM employees;';

    const rows = await db.query(query);
    console.log('');
    console.table(rows);
  },
  renderDepartments: async function renderDepartments(db) {
    const query = ' SELECT * FROM department;';
    const rows = await db.query(query);
    console.log('');
    console.table(rows);
  },
  renderRoles: async function renderRoles(db) {
    const query = `SELECT role.id, role.title, role.salary FROM role JOIN department ON role.department_id = department.id;`;
    const rows = await db.query(query);
    console.log('');
    console.table(rows);
  },
  renderEmpDepartment: async function renderEmployeeDepartment(db) {
    const query = `   
  SELECT employees.first_name, employees.last_name, role.title, role.salary, department.name AS department, employees.manager_id 
    FROM employees 
        JOIN role ON role.id = employees.role_id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employees.id;`;

    const rows = await db.query(query);
    console.log('');
    console.table(rows);
  },
  addDepartment: async function addDepartment(db, newDapartment) {
    const departmentName = newDapartment.departmentName;

    const query = 'INSERT into department (name) VALUES (?)';
    const args = [departmentName];
    const rows = await db.query(query, args);
    console.log(`Added department named ${departmentName}`);
  },

  addEmployee: async function addEmployee(db, employee) {
    const roleID = await getRoleId(db, employee.role);
    console.log('');
    console.log(roleID);
  },

  addRole: async function addRole(db) {
    console.log('add role');
  },

  removeEmployee: async function removeEmployee(db) {
    console.log('rem employee');
  },

  updateEmployee: async function updateEmployee(db) {
    console.log('update employee');
  },
};

async function getRoleId(db, roleName) {
  let query = 'SELECT * FROM role WHERE role.title=?';
  let args = [roleName];
  const rows = await db.query(query, args);
  return rows[0].id;
}

module.exports = fn;
