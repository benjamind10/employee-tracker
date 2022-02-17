const config = require('./db/connection');
const Database = require('./lib/Database');
const { renderEmployees } = require('./utils/queryFunctions');

const db = new Database(config);

renderEmployees(db);
