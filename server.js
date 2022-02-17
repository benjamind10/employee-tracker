const config = require('./db/connection');
const Database = require('./lib/Database');
const mainQuestions = require('./utils/questions');
const fn = require('./utils/queryFunctions');

const db = new Database(config);

async function init() {
  let kill = false;
  while (!kill) {
    const response = await mainQuestions();

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
        fn.addDepartment(db);
        break;
      case 'Add employee':
        fn.addEmployee(db);
        break;
      case 'Add role':
        fn.addRole(db);
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
