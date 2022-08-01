require('dotenv').config();
const inquirer = require('inquirer');
const {
	optionQuestions,
	addDepartment,
	addRole,
	AddEmployee,
	updateEmployee,
} = require('./utils/questions');
const initDatabase = require('./db');
const {
	allDepartmentsQuery,
	allRolesQuery,
	allEmployeesQuery,
} = require('./utils/utils');

const init = async () => {
	// start asking the questions using inquirer
	try {
		//connect to the database
		const { executeQuery, closeConnection } = await initDatabase({
			host: process.env.DB_HOST,
			user: process.env.DB_USER,
			password: process.env.DB_PASSWORD,
			database: process.env.DB_NAME,
		});
		let inProgress = true;

		while (inProgress) {
			const { journey } = await optionQuestions();
			//check which option clicked and prompt the questions required
			if (journey === 'view all departments') {
				//get the data
				const allDepartments = await executeQuery(allDepartmentsQuery);

				// show the data
				console.table(allDepartments);
			}
			if (journey === 'view all roles') {
				//get the data
				const allRoles = await executeQuery(allRolesQuery);
				// show the data
				console.table(allRoles);
			}
			if (journey === 'view all employees') {
				//get the data
				const allEmployees = await executeQuery(allEmployeesQuery);
				// show the data
				console.table(allEmployees);
			}
			if (journey === 'add a department') {
				//   get the answer
				let addDepartments = await addDepartment();
				// get data

				// get max id
				const maxId = await executeQuery(
					'SELECT max(id) as max FROM DEPARTMENT'
				);
				const newId = maxId[0].max + 1;

				// store the data

				const addAnotherDepartment = await executeQuery(
					`INSERT INTO DEPARTMENT (id, department_name) VALUES ` +
						`(${newId}, '${addDepartments.departmentName}')`
				);
				// show the data
			}
			if (journey === 'add a role') {
				// get all departments
				let allDepartmentNames = await executeQuery(
					'SELECT department_name FROM DEPARTMENT'
				);
				//create the array of choices
				let departmentArray = [];
				const pushToArray = allDepartmentNames.map((item) =>
					departmentArray.push(item.department_name)
				);

				//   get the answer
				let addRoles = await addRole(departmentArray);
				// get data

				// get department id
				const departmentId = `(SELECT id FROM DEPARTMENT WHERE department_name = '${addRoles.department}')`;
				// get max id
				const maxId = await executeQuery(
					'SELECT max(id) as max FROM role'
				);
				const newId = maxId[0].max + 1;

				// store the data
				const addAnotherRole = await executeQuery(
					`INSERT INTO role (id, title, salary, department_id) VALUES` +
						`(${newId}, '${addRoles.title}', '${addRoles.salary}', ${departmentId})`
				);
				// show the data
			}
			if (journey === 'add an employee') {
				// get all employees
				const allEmployees = await executeQuery(allEmployeesQuery);

				// get all roles
				let allRoleNames = await executeQuery('SELECT title FROM role');
				// create array of role choices
				let roleArray = [];
				const pushToArray = allRoleNames.map((item) =>
					roleArray.push(item.title)
				);

				// create array of manager choices
				let allManagerNames = await executeQuery(
					'SELECT first_name FROM EMPLOYEES'
				);

				let managerArray = [];
				const pushTArray = allManagerNames.map((item) =>
					managerArray.push(item.first_name)
				);
				// get max id
				const maxId = await executeQuery(
					'SELECT max(id) as max FROM EMPLOYEES'
				);
				const newId = maxId[0].max + 1;

				//   get the answer
				let addEmployees = await AddEmployee(roleArray, managerArray);

				// get data
				// get department id
				const managerId = allEmployees.filter(
					(item) => item.first_name === addEmployees.manager
				)[0].id;

				const roleId = `(SELECT id FROM role WHERE title= '${addEmployees.role}')`;

				// store the data
				const addAnotherRole = await executeQuery(
					`INSERT INTO EMPLOYEES (id, first_name, last_name, role_id, manager_id) VALUES` +
						`(${newId}, '${addEmployees.first_name}', '${addEmployees.last_name}',  ${roleId}, ${managerId})`
				);
				// show the data
			}
			if (journey === 'update an employee') {
				// get all roles
				let allRoleNames = await executeQuery('SELECT title FROM role');
				// create array of role choices
				let roleArray = [];
				const pushToArray = allRoleNames.map((item) =>
					roleArray.push(item.title)
				);

				// create array of employee choices
				let allEmployeeNames = await executeQuery(
					'SELECT first_name FROM EMPLOYEES'
				);

				let employeeArray = [];
				const pushTArray = allEmployeeNames.map((item) =>
					employeeArray.push(item.first_name)
				);
				//   get the answer
				const updateAnswers = await updateEmployee(
					employeeArray,
					roleArray
				);

				const roleId = `(SELECT id FROM role WHERE title= '${updateAnswers.role}')`;

				// store the data
				const updateQuery = await executeQuery(
					`UPDATE employees SET role_id = ${roleId} WHERE first_name = '${updateAnswers.employee}'  `
				);
			}
			if (journey === 'quit') {
				inProgress = false;
				console.log('thank you');
			}
		}
	} catch (error) {
		console.log(`[ERROR]: Internal error | ${error.message}`);
	}
};

init();
