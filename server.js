const config = require('./db/connection');
const Database = require('./lib/Database');
const {
  renderEmployees,
  renderDepartments,
  renderRoles,
} = require('./utils/queryFunctions');
const mainQuestions = require('./utils/questions');

const db = new Database(config);

function init() {
  mainQuestions().then(response => {
    renderEmployees(db);
  });
}

init();
