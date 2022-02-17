const inquirer = require('inquirer');
const prompt = inquirer.prompt;

const questions = {
  mainQuestions: async function mainQuestions() {
    return prompt([
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
  },
  getDepartment: async function getDepartment() {
    return prompt([
      {
        type: 'input',
        message: 'What is the name of the new department?',
        name: 'departmentName',
      },
    ]);
  },
};

module.exports = questions;
