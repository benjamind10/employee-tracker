const cTable = require('console.table');

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
    console.log(
      `Added employee ${employee.first_name} ${employee.last_name}.`
    );
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
    const split = employee.split(' ');
    const args = [split[0], split[1]];

    const rows = db.query(query, args);
    console.log('');
    console.log(`Removed: ${employee}`);
  },

  updateEmployee: async function updateEmployee(db) {
    console.log('update employee');
  },
};

module.exports = fn;
