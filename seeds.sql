-- seeds.sql

-- Insert initial departments
INSERT INTO departments (department_name) VALUES ('HR');
INSERT INTO departments (department_name) VALUES ('Engineering');

-- Insert initial roles
INSERT INTO roles (title, salary, department_id) VALUES ('HR Manager', 60000, 1);
INSERT INTO roles (title, salary, department_id) VALUES ('Software Engineer', 80000, 2);

-- Insert initial employees
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('John', 'Doe', 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('Jane', 'Smith', 2, 1);