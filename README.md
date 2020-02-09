# Good bits

List of examples illustrating js good bits
Run it as

```

node init
node index.js
```

## Types or Primitives

Js is both dynamically typed, i.e. variables are not declared with type, 
and wekly types i.e. type is inferred as another type ex: 1 + '2' becomes a Strin "12"

Dynamic languages means types is inferred at runtime.  

The tool *TypeScript* allows to write a statically type JS: int x = 5; String stuff="stuff"  

### Primitives

Primitives are immutable which is what makes them different from Object references.

* Boolean (true, false) 
    * typeof true // 'boolean'
    * don't use new Boolen(false), no need
    * same idea don't use new Srting or new Object or new Array: just "string", {}, []

* Null (null)
    * typeof null // 'object'

* Undefined (we can't set a variable to undefined)
    * __undefined just like Nan are not constant but global variables that can be changed!!!__
    * typeof undefined // undefined

* Number (64bits floating point: no distinction integer or float)

* String

* Symbol
    * Symbol("some description") create a new unique symbol and returns a refrence
    * can be used to create unique properties
    * can not be enumerated
    * olny way to access them: Object.getOwnPropertySymbols(obj_having_symbol_properties)

Everything else **is Object type**

### Main objects
See *https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object*

    * Object
    * Array

### Many other like

    * Function
    * Bolean
    * Symbol
    * Error
    * Number
    * String
    * RegExp
    * Math
    * Set ...

### General

Ojects litterals i.e. {}, are linked to __Object.prototype__  
Function objects are likend to __Function.prototype__  

Every JavaScript object has an internal property called __prototype__ . This is a link (known as reference ) to another object. When trying to access a property that does not exist in an object, JavaScript tries to find this property in the prototype (or more precisely the prototype chain) of this object.

__prototype__ is an object with several properties, on of them is __constructor__ which points back to the oject itself.  
__constructor__ In Javascript, the equivalent of the built-in init __Python__ function is called a constructor function, and it is invoked by using the special Javascript keyword __new__

A function is a first class object, it can be passed or returned, have properties, assigned.  

#### Declared

```javascript
function todo() {}
```

#### Anonymous

```javascript
const f = function() {}
```

#### Inner functions

Inner function have access to parent variables and can even modify them unlike Python

```javascript
const f = function() {
    let v1 = 0;
    const innerf = function() {
        v1 += 1;
    }
}
```

#### Implicit parameters

Besides it's parameters a function receives 2 parameters: this and arguments.  
This depends on the invocation patern of the function:  

* Invoked a mere function, this points to the global object.
* Invoked as a method, i.e. property of an object, this points to the object. So becareful when a method calls an inner function  

```javascript
{
    prop: 1,
    method: function() {
        const that = this;
        this.prop = (function(that) {that.pop +=2;})();
    }
}
```

* Invoked as a consrtuctor with keyword new, (by convetion the first letter o the function is uppercase) this points to the object instance. Construtor function are not the recommended way to create objects  
* Invoked with apply, 2 parameters are pass to the function __(that, arguments)__. __That__ if not null points to the __this__ of the object the function should work on, __arguments__ is a speudo array containing the parameters of the function. If __arguments__ contains fewer arguments that the function parameters, the remaining parameters are set to null, if it contains more arguments they are just ignored. There is no error or type checking.  
Since all functions receive __arguments__ one could write a function acception any number of parameters  

```javascript
const f = function() {
    let sum = 0;
    for (let i=0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
```

#### Function return

If a function doens't return anything its return value is __undefined__  

#### Exceptions
There is only one catch all. It is necessary to inspect the propeties on __e__ to get more info about the exception.

```javascript
try {

}
catch(e) {

}
```

### Augmenting types

JS allows basic type to be augmented  
Adding a method to Object.prototype makes the propety available to all object create before or after the addition.  

__Note:__

Everything has prototype but only functions have a property called prototype.  
Object instances have a protoype property called __proto__.
Eventually, down the chain, a __proto__ will point to Object.prototype as everything is object.  
ref: <http://dmitrysoshnikov.com/ecmascript/javascript-the-core/>

*Note:  
If Javascript doesn't find a property directly on the object, it goes down the property chain to find it. If it is not there it returns __undefined__*

```javascript
const Foo = function(x){};
( new Foo ).__proto__ === Foo.prototype;  
( new Foo ).prototype === undefined;
```

[Using a prototype object](https://github.com/vuejsprojects/good-bits/blob/master/object_prototype.js "Example using prototype object")

```javascript
// prototype object
const proto = {
    l: 0,
    w: 0,
    squareFootage: function () {
        return this.l * this.w;
    },
    init: function(l, w) {
        this.l = l;
        this.w = w;
    }
}

// create an object whose prototype is proto
const piscine = Object.create(proto);
piscine.init(9, 4.5);
// add a method to the protype. It should appear in the instance
proto.getSpec = function() {
    return "Specs: Length=" + this.l + " width=" + this.w + ' height:' + this.height;
}
console.log(piscine.getSpec()); // output Length=9 width=4.5 height:1.2
// add a method to the protoype proto thru the instance
piscine.__proto__.getType = function() {
    return "salt";
}
console.log(piscine.getType()); // output salt
```

[Using a function constructor and keyword new](https://github.com/vuejsprojects/good-bits/blob/master/object_new.js "Example using function constructor")

```javascript
// Convention: first character on a function constructor is uppercase
const Piscine = function(l, w) {
    this.l = l;
    this.w = w;
    this.squareMeter = function() {
        return this.l *0.3 * this.w * 0.3;
    }
}

Piscine.prototype.squareFootage = function () {
    return this.l * this.w;
}
// the init function is actually the constructor which is a property of Object.prototype
// and points to the object itself
piscine = new Piscine(9, 4.5);

```

With a function constructor no need to call an init function to initialize the object.

One could add a method to Function to add new methods to any object.

```javascript
Function.prototype.method = function(method_name, func) {
    if (!this.prototype[method_name]) {
        this.prototype[method_name] = func;
        return this;
    }
}

Number.method('toInteger', function() {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
((-10/3)).toInteger(); // output -3
```

### Scope

JavaScript doesn't have __block scope__ it only has __function scope__.  

__In ES6, const and let__ keywords allow developers to declare variables in the block scope, which means those variables exist only within the corresponding block.

```javascript
function foo(){
    if(true){
        var fruit1 = 'apple';        //exist in function scope it gets hoisted
        const fruit2 = 'banana';     //exist in block scope
        let fruit3 = 'strawberry';   //exist in block scope

    }
    console.log(fruit1); // output apple
    console.log(fruit2); // output ReferenceError
    console.log(fruit3);  // output ReferenceError (doesn't get there)
}

foo();
```

### Best Practices

It is better to define all variables at the beginning of functions unlike other language where it best to declare them at the point they are used.

### Closure
It a function or object define with a context, the context being the parameters and variable of the function the create them.

[Example](https://github.com/vuejsprojects/good-bits/blob/master/closure.js "Example demonstrating closures")

```javascript
const closure = (function(conter_name) {
    let var1 = 0;
    const obj = {
        display: function() {
            return conter_name + ' = ' + var1;
        },
        increment: function(inc) {
            return var1 += inc;
        }
    }
    return obj;
})('Mighty counter');

console.log(closure.display()); // Mighty counter = 0
closure.increment(4);
console.log(closure.display()); // Mighty counter = 4
closure.increment(3);
console.log(closure.display()); // Mighty counter = 7
```

### [Cascade](https://github.com/vuejsprojects/good-bits/blob/master/cascade.js "Example demonstrating cascades")

It is a function method that returns __this__ so calls can be chained.

```javascript
const ob  = {
    method1: function(x) {
        this.x = x;
        const that = this;
        const exp = function(n) {
            that.x = that.x * Math.pow(10, n);
        }
        exp(3);
        return this;
    },
    method2: function(y) {
        this.x += y;
        return this;
    },
    print: function() {
        console.log(this.x);
        return this;
    }
}
ob.method1(5).method2(3).print();  // output 5008
```

### Currying

It is to transform a function that takes arguments into function taking just one argument and returning a function taking the next argument and returning a function and so on until there is no argument left, the last having all the argument to perform the operation.

 ```javascript
var volume = function(h,l,w) {
    return h * l * w;
}

var vol = function(h) {
    return function(l) {
        return function(w) {
            return h * l * w;
        }
    }
}

print("volume(2, 3, 4) === vol(2)(3)(4)")
print(volume(2, 3, 4), " === ", vol(2)(3)(4)) // true
// Benefit is reuse of intermediate functions
vol_h_3 = vol(3);
// Knowing all my cubes have height of 3 I can caculate the volume of cubes
// for any length and width
const l = 4, w = 5;
print("Benefit: ", vol_h_3(l)(w)); // ouput 60
 ```


## Inheritance

### [pseudoclassical](https://github.com/vuejsprojects/good-bits/blob/master/inheritance_pseudoclassical.js "Example demonstrating pseudoclassical inheritance")

It uses the __new__ keyword on a function Constructor.  
pseudoclassical drawback:

* all properties are public
* no access to super method

```javascript
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

```

### [prototypal](https://github.com/vuejsprojects/good-bits/blob/master/inheritance_prototypal.js "Example demonstrating prototypal inheritance")

Simpler than psudoclassical.  
It uses the Object.create (some_object) some_object could be an object litteral

```javascript
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
```

### [Functional](https://github.com/vuejsprojects/good-bits/blob/master/inheritance_functional.js "Example demonstrating Functional inheritance")

* allows privacy
* Better encapsulation (private proerties and methods)
* access to super methods

```javascript
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
```

## [Arrays](https://github.com/vuejsprojects/good-bits/blob/master/arrays.js "Example about Array")

They are objects made of properties, i.e. array like objects.  
Their properties is a set of integers starting from 0.  
The first element has property name 0  
The second element has property name 1  
And so on  

```javascript
const ar = ['one', 'two', 'three'];
// equivalent to
const eq_ar = {
    '0': 'one',
    '1': 'two',
    '2': 'three',
};
// this is why
for (let it in ar) {
    console.log(it); // output '0' '1' '2' + possible other prepoerties set on the array and no order guarantee
}
// and
for (let i=0; i < ar.length; i++) {
    console.log(ar[i]); // output 'one`, 'two', 'three'
}
```

Array has a length property which is the highest property name + 1
length is not the number of items in the array

```javascript
const ar_high = [];
ar_high[1000] = 'stuff'; // 1000 is auto converted to a string '1000'
console.log(ar_high.length); // output 1001
```

If an array has 10 items and it length is set to 3 all the items beyond 3 are discarded.  

To add a item to an array:
ar[ar.length] = 'item';
or
ar.puush('item');

One can delete a item but it leaves a hole in the array. Use splice which compresses the array:

```javascript
ar = ['one', 'two', 'three', 'quatre'];
delete(ar[2]);
console.log(ar); // output ["one", "two", …, "quatre"] 
// To remove the hole, use splice which compresses the array:  
const rank_to_delete = 2;  
const num_of_items_to_delete = 1;
ar.splice(rank_to_delete, num_of_items_to_delete);  
console.log(ar); // output ["one", …, "quatre"]
```

Type of an array is object, To make sure it is an array, check it's cconstructor

```javascript
cont ar [1,2,3,4]
console.log(type of ar); // output object
console.log(ar.constructor === Array); // output true
```

## RegExp

Methods working with regular expressions are:

* regexp.exec
* regexp.test
* String.match
* String.replace
* String.search
* String.split

A litteral regex is surrounded with /the regular exp/  
A RegExp object world be:  
const regex = new RegExp("regular expression");  
Within "regular expression" / and \ and " need to be escaped



## Reminder

* Variable and function definitions are hosited, meaning a variable can be defined after it used and when defined JS put them back at the top of the file.  
__See this very good article__ <https://blog.bitsrc.io/hoisting-in-modern-javascript-let-const-and-var-b290405adfda>

* if a __;__ is missing JavaScript will put one at the and of the statement. This is dangerous because sometimes it makes wrong assumptions and put them at the wrong place.  
Ex:

```
return // JS will put ; here intead of after }
{

}
```

* Unlike Python in JS a variable is define whith a var, const or let whereas in Python a vairable is defined when it is first used.

* __var__ is more or less deprecated used __let__ if the variable is supposed to mutated if not __const__. if any is omitted the variable is global.

* Enumerable properties are those properties whose internal __enumerable flag is set to true__, which is the default for properties created via simple assignment or via a property initializer (properties defined via __Object.defineProperty__ and such default enumerable to false). Enumerable properties show up in for...in loops unless the __property's key is a Symbol__.  
Object.create(ob, props) props is a litteral describing the properties with among other things the __enumerable__ flag.

## Idiosyncrasies

* Infinity
    * typeof Infinity // number  
__But NaN just like undefined is actually a global variable that can be changed!__  
NaN !== NaN  
isNaN('stuff') // true  
isNan('0') // false!  
Test with isNaN()  
To find out if a number is a number typeof val == 'number' && isFinite(val)

## Strict mode

To set strict mode type 'use strict'; at the very beginning of a script or a function.  
ECMAScript 2015 sets it as default.  

### Strict mode makes several changes to normal JavaScript semantics

1. Eliminates some JavaScript silent errors by changing them to throw errors.
1. Fixes mistakes that make it difficult for JavaScript engines to perform optimizations: strict mode code can sometimes be made to run faster than identical code that's not strict mode.
1. Prohibits some syntax likely to be defined in future versions of ECMAScript.
