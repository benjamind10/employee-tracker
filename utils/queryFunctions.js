const cTable = require('console.table');

const fn = {
  renderEmployees: async function renderEmployees(db) {
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
  renderDepartments: async function renderDepartments(db) {
    const query =
      ' SELECT department.name AS departments FROM department;';
    const rows = await db.query(query);
    console.table(rows);
  },
  renderRoles: async function renderRoles(db) {
    const query = `SELECT * FROM role`;
    const rows = await db.query(query);
    console.table(rows);
  },
  renderEmpDepartment: async function renderEmployeeDepartment(db) {
    console.log('render employee dpt');
  },
  addDepartment: async function addDepartment(db) {
    console.log('add dpt');
  },

  addEmployee: async function addEmployee(db) {
    console.log('add employee');
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

module.exports = fn;
