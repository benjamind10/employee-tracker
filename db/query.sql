   -- Show all employees query
   SELECT employees.first_name, employees.last_name, role.title, role.salary, department.name AS department, employees.manager_id 
    FROM employees 
        JOIN role ON role.id = employees.role_id 
        JOIN department ON role.department_id = department.id 
        ORDER BY employees.id;

-- Show all departments query
SELECT department.name AS departments FROM department;
SELECT * FROM department; -- with id

-- Add employee query
INSERT into employees (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);

-- Delete employee
DELETE from employees WHERE first_name = ? AND last_name = ?;

-- Update employee role
UPDATE employees SET role_id = ? WHERE employees.first_name = ? AND employees.last_name = ?;

-- Add department
INSERT into department (name) VALUES (?);

-- Add Role
INSERT into role (title, salary, department_id) VALUES (?,?,?);

-- View Roles
SELECT * FROM role;

-- View employees by department
SELECT first_name, last_name, department.name FROM ((employees INNER JOIN role ON role_id = role.id) INNER JOIN department ON department_id = department.id);

SELECT role.id, role.title, role.salary FROM role JOIN department ON role.department_id = department.id;
