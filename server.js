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
        let managers = await db.getManagers();
        let roles = await db.getRoles();
        const employee = await questions.addEmployee(roles, managers);
        fn.addEmployee(db, employee);
        break;
      case 'Add role':
        roles = await db.getRoles();
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
