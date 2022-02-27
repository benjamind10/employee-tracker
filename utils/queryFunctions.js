// Main object that holds async functions
const fn = {
  renderEmployees: async function renderEmployees(db) {
    const query = `
    SELECT employees.first_name, employees.last_name, role.title, role.salary, department.name 
      AS department, e2.first_name AS manager_fn, e2.last_name AS manager_ln
    FROM employees 
        JOIN role ON role.id = employees.role_id 
        JOIN department ON role.department_id = department.id 
        LEFT JOIN employees AS e2 ON employees.manager_id = e2.id
        ORDER BY employees.id;`;

    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  renderDepartments: async function renderDepartments(db) {
    const query = 'SELECT * FROM department;';
    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  renderRoles: async function renderRoles(db) {
    const query = `
    SELECT role.id, role.title, role.salary, department.name 
      AS department, department.id AS dept_id
    FROM role INNER JOIN department ON department.id = role.department_id;`;

    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  renderEmpDepartment: async function renderEmployeeDepartment(db) {
    const query = `
    SELECT first_name, last_name, department.name, department.id
      FROM ((employees INNER JOIN role ON role_id = role.id)
      INNER JOIN department ON department_id = department.id);`;

    const rows = await db.query(query);
    console.log('');
    return rows;
  },

  renderEmpByManager: async function renderEmpByManager(
    db,
    managerID
  ) {
    const query =
      'SELECT id, first_name, last_name FROM employees WHERE manager_id = ?;';
    const params = [managerID];

    const rows = await db.query(query, params);
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
    const query = `INSERT into employees (first_name, last_name, role_id, manager_id) 
        VALUES(?,?,?,?)`;
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
    return `${name} added.`;
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

  removeRole: async function removeRole(db, role) {
    const query = 'DELETE FROM role WHERE id = ?;';
    const args = [role];
    const rows = await db.query(query, args);
    console.log('');
    return 'Success.';
  },

  removeDept: async function removeDept(db, department) {
    const query = 'DELETE FROM department WHERE id = ?;';
    const args = [department];
    const rows = await db.query(query, args);
    console.log('');
    return 'Success.';
  },

  updateEmployee: async function updateEmployee(db, employee, role) {
    const name = employee.split(' ');
    const newRole = role[0].id;
    const query =
      'UPDATE employees SET role_id = ? WHERE employees.first_name = ? AND employees.last_name = ?';
    const args = [newRole, name[0], name[1]];

    const rows = await db.query(query, args);
    console.log('');
    return `Updated: ${employee}`;
  },

  updateManager: async function updateManager(db, employee, manager) {
    const name = employee.employeeName.split(' ');
    const managerID = manager[0].id;
    const query =
      'UPDATE employees SET manager_id = ? WHERE employees.first_name = ? AND employees.last_name = ?';
    const args = [managerID, name[0], name[1]];

    const rows = await db.query(query, args);
    console.log('');
    return `Updated: ${employee.employeeName}`;
  },

  viewBudget: async function viewBudget(db, department) {
    const query = `
      SELECT department.name, department.id, role.salary AS salary, sum(role.salary) AS salary_total 
        FROM ((employees INNER JOIN role ON role_id = role.id)
        INNER JOIN department ON department_id = department.id)
        WHERE department.id = ?;`;

    const args = [department];
    const dollarLocale = Intl.NumberFormat('en-US');

    const rows = await db.query(query, args);
    console.log('');
    return `Total spent by this department: $${dollarLocale.format(
      rows[0].salary_total
    )}`;
  },
};

module.exports = fn;
