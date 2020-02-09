// pseudoclass
const Person = function(name, age) {
    this.name = name;
    this.age = age;
}
Person.prototype.getDetails = function() {
    return "Name: " + this.name + " Age: " + this.age;
}
Person.prototype.whatIs = function() {
    return "Human?";
}
const person = new Person('toto', 10);

// pseudo class
const Employee = function(name, age, role) {
    // name, age, role are direct property of employee not Person
    this.role = role;
    // we would rather call the super method to initialize name, age
    this.name = name;
    this.age = age;
}

Employee.prototype = new Person();
Employee.prototype.getRole = function() {
    return "Role: " + this.role;
}
Employee.prototype.getDetails = function() {
    // Again we would rather call the method on super class to 
    // dsipay the details.
    return "Role: " + this.role +" "+"Name: " + this.name + " Age: " + this.age;
}

const employee = new Employee('chipie', 1, "Chief");
console.log(employee.getDetails()); // ouput undefined, undefined
console.log(employee.getRole()); //output chief
console.log(employee.whatIs()); //output Human?
