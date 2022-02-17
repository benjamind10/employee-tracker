const cTable = require('console.table');

async function renderEmployees(db) {
  const query = `   
  SELECT employees.first_name, employees.last_name, role.title, role.salary, department.name AS department, employees.manager_id 
    FROM employees 
        JOIN role ON role.id = employees.role_id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employees.id;`;

  const rows = await db.query(query);
  console.table(rows);
}

async function renderDepartments(db) {
  const query =
    ' SELECT department.name AS departments FROM department;';
  const rows = await db.query(query);
  console.table(rows);
}

async function renderRoles(db) {
  const query = `SELECT * FROM role`;
  const rows = await db.query(query);
  console.table(rows);
}

module.exports = { renderEmployees, renderDepartments, renderRoles };
