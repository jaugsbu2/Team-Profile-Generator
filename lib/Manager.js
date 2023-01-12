const Employee = require('./employee');

class Manager extends Employee {
    constructor(name, id, email, employeeType, officeNumber) {
        super(name, id, email, employeeType);
        this.officeNumber = officeNumber;
    }

    getOfficeNumber() {
        return this.officeNumber
    };
}

module.exports = Manager