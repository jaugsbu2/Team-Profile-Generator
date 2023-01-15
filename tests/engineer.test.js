const Employee = require('../lib/Employee');

describe('Employee', () => {
    it("should create an object with an object that includes the information of the object shown below", () => {
        const name = "Name";
        const id = "123";
        const email = "Name@email.com";
        const role = "Engineer";

        const obj = new Employee(name, id, email, role)

        expect(obj.name).toEqual("Name");
        expect(obj.id).toEqual("123");
        expect(obj.email).toEqual("Name@email.com");
        expect(obj.role).toEqual("Engineer");
    });
})