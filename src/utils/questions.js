const inquirer = require('inquirer');

const optionQuestions = async () => {
	const questions = [
		{
			type: 'list',
			message: 'please select an option',
			name: 'journey',
			choices: [
				'view all departments',
				'view all roles',
				'view all employees',
				'add a department',
				'add a role',
				'add an employee',
				'update an employee',
				'quit',
			],
		},
	];
	const { journey } = await inquirer.prompt(questions);
	return { journey };
};
const addDepartment = async () => {
	const questions = [
		{
			type: 'input',
			message: 'what is the name of the department?',
			name: 'departmentName',
		},
	];
	const { departmentName } = await inquirer.prompt(questions);
	return { departmentName };
};
// questions for adding roles
const addRole = async (departmentArray) => {
	const questions = [
		{
			type: 'input',
			message: 'what is the name of the role?',
			name: 'title',
		},
		{
			type: 'input',
			message: 'what is the salary of the role?',
			name: 'salary',
		},
		{
			type: 'list',
			message: 'please select the role the department belongs to',
			name: 'department',
			choices: departmentArray,
		},
	];

	const { title, salary, department } = await inquirer.prompt(questions);
	return { title, salary, department };
};

const AddEmployee = async (roleArray, managerArray) => {
	const questions = [
		{
			type: 'input',
			message: 'what is the employees first name?',
			name: 'first_name',
		},
		{
			type: 'input',
			message: 'what is the employees last name?',
			name: 'last_name',
		},
		{
			type: 'input',
			message: 'what is the employees first name?',
			name: 'first_name',
		},
		{
			type: 'list',
			message: 'please select the role of the employee',
			name: 'role',
			choices: roleArray,
		},
		{
			type: 'list',
			message: "please select the employee's manager",
			name: 'manager',
			choices: managerArray,
		},
	];
	const { first_name, last_name, role, manager } = await inquirer.prompt(
		questions
	);
	return { first_name, last_name, role, manager };
};

const updateEmployee = async (employeeArray, roleArray) => {
	const questions = [
		{
			type: 'list',
			message: 'Please select the employee you want to update',
			name: 'employee',
			choices: employeeArray,
		},
		{
			type: 'list',
			message: 'please select the new role',
			name: 'role',
			choices: roleArray,
		},
	];
	const { employee, role } = await inquirer.prompt(questions);
	return { employee, role };
};

module.exports = {
	optionQuestions,
	addDepartment,
	addRole,
	AddEmployee,
	updateEmployee,
};
