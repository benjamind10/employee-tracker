const cTable = require('console.table');

async function renderEmployees(db) {
  console.log('');

  // SELECT * FROM employee;
  let query = 'SELECT * FROM employees';
  const rows = await db.query(query);
  console.table(rows);
}

module.exports = { renderEmployees };
