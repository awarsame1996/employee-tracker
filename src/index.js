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
				console.log(addDepartments.departmentName);
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
				//   get the answer
				// get data
				// store the data
				// show the data
			}
			if (journey === 'add an employee') {
				//   get the answer
				// get data
				// store the data
				// show the data
			}
			if (journey === 'update an employee') {
				//   get the answer
				// get data
				// store the data
				// show the data
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
