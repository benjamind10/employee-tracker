// Imports
const config = require('./db/connection');
const Database = require('./lib/Database');
const fn = require('./utils/queryFunctions');
const qs = require('./utils/questions');
const cTable = require('console.table');

// Logo for app
const logo = require('asciiart-logo');
const render_text = require('./package.json');
console.log(logo(render_text).render());

// Creates a new DB object
const db = new Database(config);

// Function that initalizes app
async function init() {
  const managers = await db.getManagers();
  const roles = await db.getRoles();
  const employees = await db.getNames();
  let rendered;

  // Defines a variable to keep the loop active
  let kill = false;
  while (!kill) {
    const response = await qs.mainQuestions();

    // Switch statement listening for any selection
    switch (response.action) {
      case 'View all employees':
        rendered = await fn.renderEmployees(db);
        console.table(rendered);
        break;
      case 'View all departments':
        rendered = await fn.renderDepartments(db);
        console.table(rendered);
        break;
      case 'View all employees by department':
        rendered = await fn.renderEmpDepartment(db);
        console.table(rendered);
        break;
      case 'View all roles':
        rendered = await fn.renderRoles(db);
        console.table(rendered);
        break;
      case 'Add department':
        const newDepartment = await qs.getDepartment();
        rendered = await fn.addDepartment(db, newDepartment);
        console.log(rendered);
        break;
      case 'Add employee':
        const employee = await qs.addEmployee(roles, managers);
        const roleID = await db.getRoleID(employee.role);
        const managerID = await db.getEmployeeID(employee.manager);
        rendered = await fn.addEmployee(
          db,
          employee,
          roleID,
          managerID[0].id
        );
        console.log(rendered);
        break;
      case 'Add role':
        const departments = await db.getDptNames();
        const newDept = await qs.addRole(departments);
        const deptID = await db.getDeptID(newDept.departmentName);
        fn.addRole(db, newDept, deptID);
        break;
      case 'Remove employee':
        const delEmployee = await qs.deleteEmployee(employees);
        rendered = await fn.removeEmployee(
          db,
          delEmployee.employeeName
        );
        console.log(rendered);
        break;
      case 'Update employee role':
        const updatedEmp = await qs.updateEmployee(employees, roles);
        const newRoleID = await db.getRoleID(updatedEmp.role);
        rendered = await fn.updateEmployee(
          db,
          updatedEmp.employeeName,
          newRoleID
        );
        console.log(rendered);
        break;
      default:
        kill = true;
        db.close();
    }
  }
}

init();

// Checks for Ctrl + C interruption
process.on('SIGINT', function () {
  console.log('Interrupted!');
  process.exit();
});
