const Employee = require('./employee');

class Intern extends Employee {
    constructor(name, id, email, employeeType, school) {
        super(name, id, email, employeeType,);
        this.school = school;
    }

    getSchool() {
        return this.school
    }
}
module.exports = Intern