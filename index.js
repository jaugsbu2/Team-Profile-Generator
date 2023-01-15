const inquirer = require("inquirer");
const Employee = require("./lib/Employee");
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const fs = require('fs');

let employees = 0

function init() {
    const htmlPageStart = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Team Roster</title>
      <link rel="stylesheet" href="assets/css/style.css">
    </head>
    
    <body>
      <header>
        <h1 class="header">My Team</h1>
      </header>
      <main class="flex-row justify-center">`;

    fs.writeFile('./dist/index.html', htmlPageStart, (err) =>
    err ? console.log(err) : console.log('Successfully created index.html!')
  );
    newEmployee()
}

function newEmployee() {
    if (employees === 0) {
        let employeeType = "Manager"
        getEmployeeinfo(employeeType)
    }
    else {
        inquirer
            .prompt([
                {
                    type: 'confirm',
                    name: 'choice',
                    message: `Add another Employee?`,
                },
            ])
            .then(val => {
                if (val.choice) {
                    inquirer
                        .prompt([
                            {
                                type: 'list',
                                name: 'type',
                                message: `What type of employee would you like to add?`,
                                choices: ["Engineer", "Intern"]
                            },
                        ])
                        .then((val) => {
                            getEmployeeinfo(val.type);
                        })
                }
                else {
                    console.log('Your team webpage is being built.')
                    finishHTMLFile()
                }

            })
    }

}

function getOtherinfo(employeeType, data) {
    if (employeeType === 'Manager') {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'officenumber',
                    message: `What is this ${employeeType}'s Office Number?`,
                    validate: val => /[a-z1-9]/gi.test(val),
                },
            ])
            .then((val) => {
                manager = new Manager(data.name, data.id, data.email, employeeType, val.officenumber);
                // addEmployee(manager);
                addEmployee(manager)
            })
    }
    else if (employeeType === 'Engineer') {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'github',
                    message: `What is this ${employeeType}'s Github Username?`,
                    validate: val => /[a-z1-9]/gi.test(val),
                },
            ])
            .then((val) => {
                engineer = new Engineer(data.name, data.id, data.email, employeeType, val.github);
                addEmployee(engineer);
            })
    }
    else if (employeeType === 'Intern') {
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'school',
                message: `What is this ${employeeType}'s school?`,
                validate: val => /[a-z1-9]/gi.test(val),
            },
        ])
        .then((val) => {
            intern = new Intern(data.name, data.id, data.email, employeeType, val.school);
            addEmployee(intern);
        })
    }

}


function getEmployeeinfo(employeeType) {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: `What is this ${employeeType}'s name?`,
                validate: val => /[a-z1-9]/gi.test(val),
            },
            {
                type: "input",
                name: "id",
                message: `What is this ${employeeType}'s ID?`,
                validate: val => /[a-z1-9]/gi.test(val),
            },
            {
                type: "input",
                name: "email",
                message: `What is this ${employeeType}'s email?`,
                validate: val => /[a-z1-9]/gi.test(val),
            },

        ])
        .then((data) => {
                getOtherinfo(employeeType, data)
        })
}

function buildEmployeeUnique(employee) {
    if (employee.getRole() === 'Manager') {
        return `Office: ${employee.getOfficeNumber()}`
    }
    else if (employee.getRole() === 'Engineer') {
        return `Github: <a href="https://github.com/${employee.getGithub()}">${employee.getGithub()}</a>`
    }
    else if (employee.getRole() === 'Intern') {
        return `School: ${employee.getSchool()}`
    }
    else {
        return
    }
}

function buildEmployeeTab(employee) {
    const uniqueInfo = buildEmployeeUnique(employee)
    
    return`
    <div class=" card col-5 col-md-3 col-lg-2">
    <div class="cardHeader">
      <h2>${employee.getName()}</h2>
      <h3>${employee.getRole()}</h3>
    </div>
    <div class="cardInfo">
      <p>ID: ${employee.getId()}</p>
      <p>Email: <a href = "mailto: ${employee.getEmail()}">${employee.getEmail()}</a></p>
      <p>${uniqueInfo}</p>
    </div>
    </div>`
}

function addEmployee(employee) {
    employees++;
    const employeeTab = buildEmployeeTab(employee)

    fs.appendFile('./dist/index.html', employeeTab, (err) =>
    err ? console.log(err) : console.log('Successfully added employee to index.html!')
  );

    newEmployee()
}


function finishHTMLFile() {

    const htmlPageEnd = `</main>
    </body>
    </html>`;

    fs.appendFile('./dist/index.html', htmlPageEnd, (err) =>
    err ? console.log(err) : console.log('Successfully finished index.html!')
  );
}

init()
