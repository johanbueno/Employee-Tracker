var mysql = require('mysql');
var inquirer = require("inquirer");
const cTable = require('console.table');
var colors = require('colors');

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "Sebastian7201",
  database: "employee_trackerDB"
});
console.log(colors.green('///////////////////////////////////////////////////////'));
console.log(colors.green('///////////////////////////////////////////////////////'));
console.log(colors.blue('--------------------- Employee Tracker------------------'));
console.log(colors.green('///////////////////////////////////////////////////////'));
console.log(colors.green('///////////////////////////////////////////////////////'));
connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  start();
});
console.log()
function start() {
  inquirer
    .prompt({
      name: "choice",
      type: "list",
      message: "What Would you like to do?",
      choices: [
        "view all Employees",
        "view all departments",
        "view all roles",
        "Add new Employee",
        "Add new Role",
        "Add new department"
        ]
    })
    .then(function (answer) {

      if (answer.choice === "view all Employees") {
        viewEmployees();
      }
      else if (answer.choice === "view all departments") {
        viewDepartment();
      }
      else if (answer.choice === "view all roles") {
        viewRoles();
      }
      else if (answer.choice === "Add new Employee") {
        addEmployee();
      }
      else if (answer.choice === "Add new Role") {
        addRole()
      }
      else if (answer.choice === "Add new department") {
        addDepartment()
      }

      else {
        connection.end();
      }
    });
}

function viewEmployees() {
  console.log("test employees");
  
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].first_name + " | " + res[i].last_name + " | " + res[i].role_id + "|" + res[i].manager_id);
    }
    console.table(res);
    console.log("-----------------------------------");
  });
}

function viewDepartment() {
  console.log("test Department");
  connection.query("SELECT * FROM department", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].id + " | " + res[i].dpt_name);
    }
    console.table(res);
    console.log("-----------------------------------");
  });
}

function viewRoles() {
  console.log("test Roles");
  connection.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {

      console.log(res[i].id + " | " + res[i].title + " | " + res[i].salary + " | " + res[i].department_id);
    }
    console.table(res);
    console.log("-----------------------------------");
  });
}

function addEmployee() {

  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "What is the new employee's firts name?"
      },
      {
        name: "last_name",
        type: "input",
        message: "What is the new employee's last name?"
      },
      {
        name: "role_id",
        type: "input",
        message: "Please set the employee's role id?"
      },
      {
        name: "manager_id",
        type: "input",
        message: "If the employee has a manager please assign Manager id",

        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }

    ])
    .then(function (answerA) {
      // when finished prompting, insert a new item into the db
      connection.query(
        "INSERT INTO employee SET ?",
        {
          first_name: answerA.first_name,
          last_name: answerA.last_name,
          role_id: answerA.role_id || 0,
          manager_id: answerA.manager_id || 0
        },
        function (err) {
          if (err) throw err;
          console.log("Your new Employee was added successfully!");

          viewEmployees();
        }
      );
    });
}
function addRole() {

  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please write the new role name?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the anual's gross income for this role?"
      },
      {
        name: "department_id",
        type: "input",
        message: "Please set the role's department id?",
        validate: function (value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
      }       
    ])
    .then(function (answerB) {
        // when finished prompting, insert a new item into the db
        connection.query(
          "INSERT INTO role SET ?",
          {
            title: answerB.title,
            salary: answerB.salary || 0,
            department_id: answerB.department_id || 0,
          },
          function (err) {
            if (err) throw err;
            console.log("Your new Role was added successfully!");

            viewRoles();
          }
        );
      });
}
function addDepartment() {

  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please name the new department ?",
        
      }   
    ])
    .then(function (answerC) {
        // when finished prompting, insert a new item into the db
        connection.query(
          "INSERT INTO department SET ?",
          {
            dpt_name : answerC.title,

          },
          function (err) {
            if (err) throw err;
            console.log("Your new department was added successfully!");

            viewDepartment();
          }
        );
      });
}
