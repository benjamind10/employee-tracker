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
  let res;

  // Defines a variable to keep the loop active
  let kill = false;
  while (!kill) {
    const response = await qs.mainQuestions();

    // Switch statement listening for any selection
    switch (response.action) {
      case 'View all employees':
        res = await fn.renderEmployees(db);
        console.table(res);
        break;

      case 'View all departments':
        res = await fn.renderDepartments(db);
        console.table(res);
        break;

      case 'View all employees by department':
        res = await fn.renderEmpDepartment(db);
        console.table(res);
        break;

      case 'View all roles':
        res = await fn.renderRoles(db);
        console.table(res);
        break;

      case 'Add department':
        const newDepartment = await qs.getDepartment();
        res = await fn.addDepartment(db, newDepartment);
        console.log(res);
        break;

      case 'Add employee':
        const employee = await qs.addEmployee(roles, managers);
        const roleID = await db.getRoleID(employee.role);
        const managerID = await db.getEmployeeID(employee.manager);
        res = await fn.addEmployee(db, employee, roleID, managerID[0].id);
        console.log(res);
        break;

      case 'Add role':
        const departments = await db.getDptNames();
        const newDept = await qs.addRole(departments);
        const deptID = await db.getDeptID(newDept.departmentName);
        res = await fn.addRole(db, newDept, deptID);
        console.log(res);
        break;

      case 'Remove employee':
        let updatedEmployees = await db.getNames();
        const delEmployee = await qs.deleteEmployee(updatedEmployees);
        res = await fn.removeEmployee(db, delEmployee.employeeName);
        console.log(res);
        break;

      case 'Update employee role':
        let newList = await db.getNames();
        const updatedEmp = await qs.updateEmployee(newList, roles);
        const newRoleID = await db.getRoleID(updatedEmp.role);
        res = await fn.updateEmployee(db, updatedEmp.employeeName, newRoleID);
        console.log(res);
        break;

      case 'Update employee manager':
        let cEmployees = await db.getNames();
        const updated_employee = await qs.updateManager(cEmployees, managers);
        const newManagerID = await db.getEmployeeID(updated_employee.mName);
        res = await fn.updateManager(db, updated_employee, newManagerID);
        console.log(res);
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
