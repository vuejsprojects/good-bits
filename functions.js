// Demonstrates:
// - Object.call
// - valueOf
// - arguments

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call

const ar = ['one', 'two', 'three'];
console.log('ar.valueOf = ', ar.valueOf(),'\n');

function Product(name, price, cook) {
    this.name = name;
    this.price = price;
    this.toCook = cook != undefined ? cook : false;
    this.isToBeCooked = function () {
        return this.toCook;
    }
}

// the fundamental difference between apply() and call(), is that call() 
// accepts an argument list, while apply() accepts 
// a single array of arguments.
function Food(name, price, cook) {
    // Add properties Product like to Food
    Product.call(this, name, price, cook);
    this.category = 'food';
}

console.log(Food.prototype === Product.prototype); // output false

// redefines the primitive value of Food
Food.prototype.valueOf = function () {
    // return this.name + ": " + this.price + " Euros";
    return this.price;
}

const cheese = new Food('brie', 5, true)
console.log("\ncheese = ", cheese); // output cheese.toString() not primitie value
console.log("\n", cheese.__proto__ === Food.prototype); // output true - Food { valueOf: [Function] }
console.log("\nFood prototype = ", Food.prototype); // Food { valueOf: [Function] }
console.log("\nFood prototype constructor === Food ", Food.prototype.constructor === Food); // Food proto constructor=  function Food(name, price, cook) {
//     Product.call(this, name, price, cook);
//     this.category = 'food';
// }


console.log("\nCheese properties: ", Object.getOwnPropertyNames(cheese));

console.log('\nName = ', cheese.name);
const val = new String(cheese);
// cheese used in a context where it is to be represented as a primitive value,
// JavaScript automatically calls the function defined in the preceding code.
console.log('\cheese + 3 = ', cheese + 3); // outputs 8

console.log("\nCheese prototype is Food", 
    Object.getPrototypeOf(cheese) === Food) // output true
console.log("\nDoes cheese need to be cooked ? response: ", cheese.isToBeCooked()); // output true

const processedFood = new Product('balony', 3);
console.log("Does ", processedFood.name, " need to be cooked ? response: ",
    processedFood.isToBeCooked()); // output false


//
// Arguments
//
const f = function() {
    let sum = 0;
    for (let i=0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
console.log(f(1,3,5,7,9)); // output 25