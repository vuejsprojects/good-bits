// simple function
const makePerson = function(specObject) {
    
    const obj = {};

    // we could copy specObject into a private object of variables

    // private begins
    let coef = 0;
    const calculateRealAge = function() {
        return (calculateCoef() *  specObject.age);
    }
    const calculateCoef = function() {
        if (specObject.role && specObject.role === 'pet') {
            coef = 0.5;
        }
        else {
            coef = 1;
        }
        return coef;
    }
    const getCoef = function() {
        return coef;
    }
    // private ends

    obj.getDetails = function() {
        return "Name: " + specObject.name + " Age: " + calculateRealAge() + 
        ' coef: ' +coef;
    };
    obj.whatIs = function() {
        return "Human?";
    };
    return obj;
}

// new instance of makePerson
const aPerson = makePerson({
    name: 'toto',
    age: 10
});
console.log(aPerson.getDetails()); // ouput Name: toto Age: 10 coef: 1
console.log(aPerson.whatIs()); //output Human?

// inherits from makePerson and add functionalities
const makeChipie = function(spec) {
    const obj = makePerson(spec);

    // we augment the instance
    obj.getRole = function() {
        return spec.role;
    };
    // we call super method getDetails
    obj.getFullDetails = function() {
        return "Role: " + this.getRole() + " " + this.getDetails(); 
    }
    return obj;
};

const chipie =  makeChipie({
    name: 'chipie',
    age: 1,
    role: "pet"
});


console.log(chipie.getDetails()); // Name: chipie Age: 0.5 coef: 0.5
console.log(chipie.getRole()); //output pet
console.log(chipie.whatIs()); //output Human?
console.log(chipie.getFullDetails()); // ouput Role: pet Name: chipie Age: 0.5 coef: 0.5
