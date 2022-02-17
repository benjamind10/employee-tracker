const inquirer = require('inquirer');

async function mainQuestions() {
  return inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View all employees',
        'View all departments',
        'View all employees by department',
        'View all roles',
        'Add department',
        'Add employee',
        'Add role',
        'Remove employee',
        'Update employee role',
        'Exit',
      ],
    },
  ]);
}

module.exports = mainQuestions;
