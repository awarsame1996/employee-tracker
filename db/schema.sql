DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

// WRITE THE CREATE SCRIPTS FOR ALL THREE TABLES
CREATE TABLE DEPARTMENT(
    id INT NOT NULL AUTO_INCREMENT,
    department_name VARCHAR(30),
    PRIMARY KEY (id)
);

CREATE TABLE ROLES (
    id INT NOT NULL,
    title VARCHAR(30),
    salary DECIMAL(8,2),
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES DEPARTMENT(id)
)

CREATE TABLE EMPLOYEES (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT NOT NULL,
    manager_id INT,
    PRIMARY KEY (id),
    FOREIGN KEY (manager_id) REFERENCES EMPLOYEES(id),
    FOREIGN KEY (role_id) REFERENCES ROLES(id)
)




