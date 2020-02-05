// Demonstrate difference between prototype and function constructor

// https://medium.com/better-programming/prototypes-in-javascript-5bba2990e04b

//Define the object specific properties inside the constructor
function Human(name, age){
	this.name = name;
	this.age = age;
    this.friends = ["Jadeja", "Vijay"];
    this.getDetails = function () {
        return "Name: " + this.name +"\nAge:" + this.age;
    }
    //Define the shared properties and methods using the prototype
    this.__proto__['sayName'] = function(){
        console.log(this.name);
    }
}
// //Define the shared properties and methods using the prototype
// Human.prototype.sayName = function(){
// 	console.log(this.name);
// }

//Create two objects using the Human constructor function
var person1 = new Human("Virat", 31);
var person2 = new Human("Sachin", 40);

//Lets check if person1 and person2 sayName points to the same instance 
//of the sayName function because it was defined on the Human prototype
// property object aka prtotype object
console.log(person1.sayName === person2.sayName) // output true

//Let's modify friends property and check
person1.friends.push("Amit");

//friends being defined on the function contructor
//each person1 and person2 have their own instance
console.log(person1.friends)// Output: "Jadeja, Vijay, Amit"
console.log(person2.friends)//Output: "Jadeja, Vijay"

//same for getDetails
console.log( person1.getDetails === person2.getDetails); // output false

//Human.prototype == person1.__proto__
console.log(Human.prototype == person1.__proto__); // output true
//Human.prototype.constructor == Human
console.log(Human.prototype.constructor == Human); // output true

