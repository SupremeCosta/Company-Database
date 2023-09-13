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
  