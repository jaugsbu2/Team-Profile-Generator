const Employee = require('./employee');

class Engineer extends Employee {
    constructor(name, id, email, employeeType, github) {
        super(name, id, email, employeeType,);
        this.github = github;
    }

    getGithub() {
        return this.github
    };

}

module.exports = Engineer