const inquirer = require('inquirer');
const {
	optionQuestions,
	addDepartment,
	addRole,
	AddEmployee,
	updateEmployee,
} = require('./utils/questions');

const init = () => {
	// start asking the questions using inquirer

    let inProgress = true
    
    while (inProgress) {
        let selectedOption = await optionQuestions();
        //check which option clicked and prompt the questions required
        if (selectedOption.optionQuestions === 'view all departments'){
            //get the data
            // show the data
        }
        else if (selectedOption.optionQuestions === 'view all roles'){
               //get the data
            // show the data
        }
        else if (selectedOption.optionQuestions === 'view all employees'){
            //get the data
         // show the data
     }
     else if (selectedOption.optionQuestions === 	'add a department'){
    //   get the answer
    // get data
    // store the data
     // show the data
 }
 else if (selectedOption.optionQuestions === 	'add a role'){
    //   get the answer
    // get data
    // store the data
     // show the data
 }
 else if (selectedOption.optionQuestions === 	'add an employee'){
    //   get the answer
    // get data
    // store the data
     // show the data
 }
 else if (selectedOption.optionQuestions === 	'update an employee'){
    //   get the answer
    // get data
    // store the data
     // show the data
 }
 else if (selectedOption.optionQuestions === 	'quit'){
   inProgress = false
 }
    }
};

init();
