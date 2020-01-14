var mysql = require ('mysql');
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port:3306,

    user: "root",

    password: "Sebastian7201",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    inquirer
      .prompt({
        name: "What Would like",
        type: "list",
        message: "What Would you like to do?",
        choices: ["view all Employees", 
        "view all Employees by department", 
        "view all Employees by department",
        "Add Employee",
        "Remove Employee",
        "Update Employee Role",
        "Update Employee Manager"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer=== "view all Employees") {
           viewEmployees();
        }
        // else if(answer === " ") {
        //   
        // } else{
        //   connection.end();
        // }
      });
  }

  function viewEmployees (){
    connection.query("SELECT * employee", function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].id + " | " + res[i].firts_name + " | " + res[i].last_name + " | " + res[i].role_id+"|"+ re[i].manager_id);
        }
        console.log("-----------------------------------");
    });
  }