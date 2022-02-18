const config = require('./db/connection');
const Database = require('./lib/Database');
const fn = require('./utils/queryFunctions');
const qs = require('./utils/questions');
const logo = require('asciiart-logo');
const render_text = require('./package.json');
console.log(logo(render_text).render());

const db = new Database(config);

async function init() {
  let kill = false;
  while (!kill) {
    const response = await qs.mainQuestions();
    const managers = await db.getManagers();
    const roles = await db.getRoles();

    switch (response.action) {
      case 'View all employees':
        fn.renderEmployees(db);
        break;
      case 'View all departments':
        fn.renderDepartments(db);
        break;
      case 'View all employees by department':
        fn.renderEmpDepartment(db);
        break;
      case 'View all roles':
        fn.renderRoles(db);
        break;
      case 'Add department':
        const newDepartment = await qs.getDepartment();
        fn.addDepartment(db, newDepartment);
        break;
      case 'Add employee':
        const employee = await qs.addEmployee(roles, managers);
        const roleID = await db.getRoleID(employee.role);
        const managerID = await db.getEmployeeID(employee.manager);
        fn.addEmployee(db, employee, roleID, managerID[0].id);
        break;
      case 'Add role':
        const departments = await db.getDptNames();
        const newDept = await qs.addRole(departments);
        const deptID = await db.getDeptID(newDept.departmentName);
        fn.addRole(db, newDept, deptID);
        break;
      case 'Remove employee':
        const employees = await db.getNames();
        const delEmployee = await qs.deleteEmployee(employees);
        fn.removeEmployee(db, delEmployee.employeeName);
        break;
      case 'Update employee role':
        fn.updateEmployee(db);
        break;
      default:
        kill = true;
        db.close();
    }
  }
}

init();

process.on('SIGINT', function () {
  console.log('Interrupted!');
  process.exit();
});
