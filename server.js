// Imports
const config = require('./db/connection');
const Database = require('./lib/Database');
const fn = require('./utils/queryFunctions');
const qs = require('./utils/questions');
const cTable = require('console.table');

// Logo for app
const logo = require('asciiart-logo');
const render_text = require('./package.json');
console.log(logo(render_text).render());

// Creates a new DB object
const db = new Database(config);

// Function that initalizes app
async function init() {
  let managers,
    departments,
    res,
    roleID,
    managerID,
    updatedEmployees,
    roles,
    currentEmployee;

  // Defines a variable to keep the loop active
  let kill = false;
  while (!kill) {
    const response = await qs.mainQuestions();

    // Switch statement listening for any selection
    switch (response.action) {
      case 'View all employees':
        res = await fn.renderEmployees(db);
        console.table(res);
        break;

      case 'View all departments':
        res = await fn.renderDepartments(db);
        console.table(res);
        break;

      case 'View employees by department':
        res = await fn.renderEmpDepartment(db);
        console.table(res);
        break;

      case 'View all roles':
        roles = await db.getRoles();
        res = await fn.renderRoles(db);
        console.table(res);
        break;

      case 'Add department':
        const newDepartment = await qs.getDepartment();
        res = await fn.addDepartment(db, newDepartment);
        console.log(res);
        break;

      case 'Add employee':
        roles = await db.getRoles();
        managers = await db.getManagers();
        const employee = await qs.addEmployee(roles, managers);
        roleID = await db.getRoleID(employee.role);
        managerID = await db.getEmployeeID(employee.manager);
        res = await fn.addEmployee(
          db,
          employee,
          roleID,
          managerID[0].id
        );
        console.log(res);
        break;

      case 'Add role':
        departments = await db.getDptNames();
        const newDept = await qs.addRole(departments);
        const deptID = await db.getDeptID(newDept.departmentName);
        res = await fn.addRole(db, newDept, deptID);
        console.log(res);
        break;

      case 'Remove employee':
        updatedEmployees = await db.getNames();
        const delEmployee = await qs.deleteEmployee(updatedEmployees);
        res = await fn.removeEmployee(db, delEmployee.employeeName);
        console.log(res);
        break;

      case 'Update employee role':
        roles = await db.getRoles();
        updatedEmployees = await db.getNames();
        currentEmployee = await qs.updateEmployee(
          updatedEmployees,
          roles
        );
        roleID = await db.getRoleID(currentEmployee.role);
        res = await fn.updateEmployee(
          db,
          currentEmployee.employeeName,
          roleID
        );
        console.log(res);
        break;

      case 'Update employee manager':
        managers = await db.getManagers();
        updatedEmployees = await db.getNames();
        currentEmployee = await qs.updateManager(
          updatedEmployees,
          managers
        );
        managerID = await db.getEmployeeID(currentEmployee.mName);
        res = await fn.updateManager(db, currentEmployee, managerID);
        console.log(res);
        break;

      case 'View by manager':
        managers = await db.getManagers();
        const managerSelected = await qs.viewByManager(managers);
        managerID = await db.getEmployeeID(
          managerSelected.managerName
        );
        res = await fn.renderEmpByManager(db, managerID[0].id);
        console.table(res);
        break;

      case 'Remove role':
        roles = await db.getRoles();
        const delRole = await qs.deleteRole(roles);
        const delRoleID = await db.getRoleID(delRole.roleName);
        res = await fn.removeRole(db, delRoleID[0].id);
        console.log(res);
        break;

      case 'Remove department':
        departments = await db.getDptNames();
        const delDept = await qs.deleteDpt(departments);
        const delDeptID = await db.getDeptID(delDept.deptName);
        res = await fn.removeDept(db, delDeptID[0].id);
        console.log(res);
        break;

      case 'View budget by department':
        departments = await db.getDptNames();
        const selected = await qs.budgetView(departments);
        const selectedID = await db.getDeptID(selected.deptName);
        res = await fn.viewBudget(db, selectedID[0].id);
        console.log(res);
        break;

      default:
        kill = true;
        db.close();
    }
  }
}

init();

// Checks for Ctrl + C interruption
process.on('SIGINT', function () {
  console.log('Interrupted!');
  process.exit();
});
