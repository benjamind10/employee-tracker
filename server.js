const config = require('./db/connection');
const Database = require('./lib/Database');
const fn = require('./utils/queryFunctions');
const questions = require('./utils/questions');
const logo = require('asciiart-logo');
const render_text = require('./package.json');
console.log(logo(render_text).render());

const db = new Database(config);

async function init() {
  let kill = false;
  while (!kill) {
    const response = await questions.mainQuestions();
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
        const newDepartment = await questions.getDepartment();
        fn.addDepartment(db, newDepartment);
        break;
      case 'Add employee':
        const employee = await questions.addEmployee(roles, managers);
        const roleID = await db.getRoleId(employee.role);
        const managerID = await db.getEmployeeID(employee.manager);
        fn.addEmployee(db, employee, roleID, managerID[0].id);
        break;
      case 'Add role':
        console.log(roles);
        // fn.addRole(db);
        break;
      case 'Remove employee':
        fn.removeEmployee(db);
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
