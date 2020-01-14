DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department (
    id INT NOT NULL auto_increment,
    name  VARCHAR(30) 
    PRIMARY KEY (id)
);
 CREATE TABLE role (
     id INT NOT NULL auto_increment,
     title VARCHAR (30),
     salary DECIMAL (10,3),
     department_id INT,
     PRIMARY KEY (id)
 );
CREATE TABLE employee (
      id INT NOT NULL auto_increment,
      first_name  VARCHAR (30),
      last_name VARCHAR (30),
      role_id INT,
      manager_id INT NULL,

);