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
    ('Accountant', 1250000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
    ('Michael', 'Chan', NULL, 1),
    ('Steve', 'Aoki', NULL, 1),
    ('Ashley', 'Rodriguez', NULL, 2),
    ('Kevin', 'Tupik', NULL, 3),
    ('Jim', 'Morrison', NULL, 3),
    ('Kunal', 'Singh', NULL, 4),
    ('John', 'Lennon', NULL, 4),
    ('Malia', 'Brown', NULL, 5),
    ('John', 'Davis', NULL, 5),
    ('Sarah', 'Lourd', NULL, 6),
    ('Fred', 'Durst', NULL, 6),
    ('Tom', 'Allen', NULL, 7),
    ('Scott', 'Anderson', NULL, 7);


