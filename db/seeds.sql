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

INSERT INTO employees (first_name, last_name, manager_id, role_id)
VALUES
    ('Michael', 'Chan', NULL, 1),
    ('Steve', 'Aoki', 1, 1),
    ('Ashley', 'Rodriguez', NULL, 2),
    ('Kevin', 'Tupik', 3, 3),
    ('Jim', 'Morrison', 3, 3),
    ('Kunal', 'Singh', NULL, 4),
    ('John', 'Lennon', 6, 4),
    ('Malia', 'Brown', NULL, 5),
    ('John', 'Davis', 7, 5),
    ('Sarah', 'Lourd', NULL, 6),
    ('Fred', 'Durst', 10, 6),
    ('Tom', 'Allen', 10, 7),
    ('Scott', 'Anderson', 10, 7);


