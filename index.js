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
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css">
      <title>Document</title>
    </head>
    <body>
      <header class="p-5 mb-4 header bg-light">
        <div class="container">
          <h1 class="display-4">My Team</h1>
        </div>
      </header>
      <main>`;

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
            },
            {
                type: "input",
                name: "id",
                message: `What is this ${employeeType}'s ID?`,
            },
            {
                type: "input",
                name: "email",
                message: `What is this ${employeeType}'s email?`,
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
        return `Github: ${employee.getGithub()}`
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
        <div>
            <div>
                <h2>${employee.getName()}</h2>
                <h3>${employee.getRole()}</h3>
                    <div>
                        <p>ID: ${employee.getId()}</p>
                        <p>Email: ${employee.getEmail()}</p>
                        <p>${uniqueInfo}</p>
                    </div>
            </div>
        </div>
    `
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
