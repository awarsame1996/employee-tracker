const allDepartmentsQuery =
	'SELECT department_name as Name FROM DEPARTMENT;';

const allRolesQuery = 'SELECT * FROM role';

const allEmployeesQuery = 'SELECT * FROM EMPLOYEES';

const addAdepartment = (anId, aName) =>
	`INSERT INTO department (id, name) VALUES ('${anId}', '${aName}')`;

module.exports = { allDepartmentsQuery, allRolesQuery, allEmployeesQuery };
