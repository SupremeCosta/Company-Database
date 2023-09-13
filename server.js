const fs = require('fs');
const inquirer = require('inquirer');
const db = require('./db'); // Import your db.js module

// Function to view all roles
function viewRoles() {
  db.query('SELECT role_id, title, salary, department_id FROM roles')
    .then((rows) => {
      console.table(rows);
      startApp();
    })
    .catch((err) => {
      console.error('Error fetching roles:', err);
      startApp();
    });
}

// Function to add a role
function addRole() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'title',
          message: 'Enter the title of the role:',
        },
        {
          type: 'input',
          name: 'salary',
          message: 'Enter the salary for the role:',
        },
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the role:',
        },
      ])
      .then(async (answers) => {
        const { title, salary, department_id } = answers;
  
        try {
          await db.query('INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)', [title, salary, department_id]);
          console.log(`Role "${title}" added successfully.`);
        } catch (err) {
          console.error('Error adding role:', err);
        }
  
        startApp();
      });
  }

// Function to view all employees
function viewEmployees() {
    db.query('SELECT employee_id, first_name, last_name, role_id, manager_id FROM employees')
      .then((rows) => {
        console.table(rows);
        startApp();
      })
      .catch((err) => {
        console.error('Error fetching employees:', err);
        startApp();
      });
  }
  
  // Function to add an employee
  function addEmployee() {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'first_name',
          message: 'Enter the first name of the employee:',
        },
        {
          type: 'input',
          name: 'last_name',
          message: 'Enter the last name of the employee:',
        },
        {
          type: 'input',
          name: 'role_id',
          message: 'Enter the role ID for the employee:',
        },
        {
          type: 'input',
          name: 'manager_id',
          message: 'Enter the manager ID for the employee (leave blank if none):',
        },
      ])
      .then(async (answers) => {
        const { first_name, last_name, role_id, manager_id } = answers;
  
        try {
          await db.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [first_name, last_name, role_id, manager_id || null]);
          console.log(`Employee "${first_name} ${last_name}" added successfully.`);
        } catch (err) {
          console.error('Error adding employee:', err);
        }
  
        startApp();
      });
  }
  
  // Function to update an employee's role
  function updateEmployeeRole() {
    // Implement code to update an employee's role
  }
  
  // ... (Other functions omitted for brevity)
  
  // Function to start the application
  function startApp() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'Add a department',
            'View all roles',
            'Add a role',
            'View all employees',
            'Add an employee',
            'Update an employee role',
            // Add choices for other options...
            'Exit',
          ],
        },
      ])
      .then((answers) => {
        switch (answers.action) {
          case 'View all departments':
            viewDepartments();
            break;
          case 'Add a department':
            addDepartment();
            break;
          case 'View all roles':
            viewRoles();
            break;
          case 'Add a role':
            addRole();
            break;
          case 'View all employees':
            viewEmployees();
            break;
          case 'Add an employee':
            addEmployee();
            break;
          case 'Update an employee role':
            updateEmployeeRole();
            break;
          // Handle other options...
          case 'Exit':
            console.log('Exiting the application.');
            db.end(); // Close the database connection
            break;
          default:
            console.log('Invalid choice.');
            startApp();
            break;
        }
      });
  }
  
  // ... (Database connection and initialization code omitted)
  
  // Connect to the database and execute the schema and seeds scripts
  db.connect()
    .then(() => {
      console.log('Connected to the database');
      executeSQLScript('schema.sql')
        .then(() => {
          executeSQLScript('seeds.sql')
            .then(() => {
              console.log('Database initialized successfully');
              startApp(); // Start your application after initializing the database
            });
        });
    })
    .catch((err) => {
      console.error('Error connecting to the database:', err);
    });