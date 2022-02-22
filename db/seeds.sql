INSERT INTO department (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

 INSERT INTO role (title, salary, department_id)
 VALUES
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, manager_id, role_id, dept_id)
VALUES
    ('Michael', 'Chan', NULL, 1, 1),
    ('Steve', 'Aoki', 1, 1, 1),
    ('Ashley', 'Rodriguez', NULL, 2, 2),
    ('Kevin', 'Tupik', 3, 3, 2),
    ('Jim', 'Morrison', 3, 3, 2),
    ('Kunal', 'Singh', NULL, 4, 3),
    ('John', 'Lennon', 6, 4, 3),
    ('Malia', 'Brown', NULL, 5, 3),
    ('John', 'Davis', 7, 5, 4),
    ('Sarah', 'Lourd', NULL, 6, 4),
    ('Fred', 'Durst', 10, 6, 4),
    ('Tom', 'Allen', 10, 7, 4),
    ('Scott', 'Anderson', 10, 7, 4);


