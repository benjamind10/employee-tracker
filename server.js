const config = require('./db/connection');
const Database = require('./lib/Database');
const {
  renderEmployees,
  renderDepartments,
  renderRoles,
} = require('./utils/queryFunctions');

const db = new Database(config);

renderEmployees(db);
renderDepartments(db);
renderRoles(db);
