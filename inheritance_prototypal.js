// simple object
const aPerson = {
    name: 'toto',
    age: 10,
    getDetails: function() {
        return "Name: " + this.name + " Age: " + this.age;
    },
    whatIs: function() {
        return "Human?";
    }
}

// new instance chipie inherits from aPerson object
// chipie's prototype is aPerson
const chipie = Object.create(aPerson);
console.log(chipie.getDetails()); // ouput Name: toto Age: 10
console.log(chipie.whatIs()); //output Human?

// here we are not modifying the prototype aPerson but adding to chipie
chipie.age = 1;
chipie.name = 'chipie';
chipie.role = 'pet';
chipie.getRole = function() {
    return this.role;
}
// It is possible to call a super method directly
chipie.getFullDetails = function() {
    return "Role: " + this.role + " " + this.getDetails(); 
}

console.log(chipie.getDetails()); // ouput Name: chipie Age: 1
console.log(chipie.getRole()); //output pet
console.log(chipie.whatIs()); //output Human?
console.log(chipie.getFullDetails()); // ouput Role: pet Name: toto Age: 10

// It is possible to call a super method thru __proto__
// But the result is the object prototype's data
chipie.getDetails = function() {
    return "Role: " + this.role + " " + this.__proto__.getDetails(); 
}
console.log(chipie.getDetails()); // ouput Role: pet Name: toto Age: 10
