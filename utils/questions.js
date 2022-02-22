// Imports
const inquirer = require('inquirer');
const prompt = inquirer.prompt;

// Inquirer object that holds all questions
const questions = {
  mainQuestions: async function mainQuestions() {
    return prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all departments',
          'View all roles',
          'View all employees',
          'View employees by department',
          'View by manager',
          'Add department',
          'Add role',
          'Add employee',
          'Remove employee',
          'Remove department',
          'Remove role',
          'Update employee role',
          'Update employee manager',
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
        choices: [...roles],
      },
      {
        type: 'list',
        message: "Who is the employee's manager?",
        name: 'manager',
        choices: [...managers],
      },
    ]);
  },

  deleteEmployee: async function deleteEmployee(employees) {
    return prompt([
      {
        type: 'list',
        message: 'Which employee do you want to remove?',
        name: 'employeeName',
        choices: [...employees],
      },
    ]);
  },

  deleteRole: async function deleteRole(roles) {
    return prompt([
      {
        type: 'list',
        message: 'Which role do you want to remove?',
        name: 'roleName',
        choices: [...roles],
      },
    ]);
  },

  updateEmployee: async function updateEmployee(employees, roles) {
    return prompt([
      {
        type: 'list',
        message: 'Which employee do you want to update?',
        name: 'employeeName',
        choices: [...employees],
      },
      {
        type: 'list',
        message: "What is the employee's new role?",
        name: 'role',
        choices: [...roles],
      },
    ]);
  },

  updateManager: async function updateManager(employees, managers) {
    return prompt([
      {
        type: 'list',
        message: 'Which employee do you want to update?',
        name: 'employeeName',
        choices: [...employees],
      },
      {
        type: 'list',
        message: "What is the employee's new manager?",
        name: 'mName',
        choices: [...managers],
      },
    ]);
  },

  addRole: async function addRole(deptNames) {
    return prompt([
      {
        type: 'input',
        message: 'What is the title of the new role?',
        name: 'roleName',
      },
      {
        type: 'input',
        message: 'What is the salary of the new role?',
        name: 'salary',
      },
      {
        type: 'list',
        message: 'Which department uses this role?',
        name: 'departmentName',
        choices: [...deptNames],
      },
    ]);
  },

  viewByManager: async function viewByManager(managers) {
    return prompt([
      {
        type: 'list',
        message: 'View employees by manager:',
        name: 'managerName',
        choices: [...managers],
      },
    ]);
  },
};

module.exports = questions;
