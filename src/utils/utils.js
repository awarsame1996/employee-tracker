const allDepartmentsQuery =
	'SELECT department_name as Name FROM DEPARTMENT;';

const allRolesQuery = 'SELECT * FROM role';

const allEmployeesQuery = 'SELECT * FROM EMPLOYEES';

module.exports = { allDepartmentsQuery, allRolesQuery, allEmployeesQuery };
