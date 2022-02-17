const config = require('./db/connection');
const Database = require('./lib/Database');
const mainQuestions = require('./utils/questions');
const {
  renderEmployees,
  renderDepartments,
  renderRoles,
  renderEmployeeDepartment,
  addDepartment,
  addEmployee,
  addRole,
  removeEmployee,
  updateEmployee,
} = require('./utils/queryFunctions');

const db = new Database(config);

async function init() {
  let kill = false;
  while (!kill) {
    const response = await mainQuestions();

    switch (response.action) {
      case 'View all employees':
        renderEmployees(db);
        break;
      case 'View all departments':
        renderDepartments(db);
        break;
      case 'View all employees by department':
        renderEmployeeDepartment(db);
        break;
      case 'View all roles':
        renderRoles(db);
        break;
      case 'Add department':
        addDepartment(db);
        break;
      case 'Add employee':
        addEmployee(db);
        break;
      case 'Add role':
        addRole(db);
        break;
      case 'Remove employee':
        removeEmployee(db);
        break;
      case 'Update employee role':
        updateEmployee(db);
        break;
      default:
        kill = true;
        db.close();
    }
  }
}

init();
