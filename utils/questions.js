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
  addEmployee: async function addEmployee(roles, managers) {
    return prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What is the employee's first name?",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "What is the employee's last name?",
      },
      {
        type: 'list',
        message: "What is the employee's role?",
        name: 'role',
        choices: [
          // populate from db
          ...roles,
        ],
      },
      {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'manager',
        choices: [
          // populate from db
          ...managers,
        ],
      },
    ]);
  },
};

module.exports = questions;
