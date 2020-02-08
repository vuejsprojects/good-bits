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
    innerf = function() {
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

// create a instance
const piscine = Object.create(proto);
piscine.init(9, 4.5);
// add a method to the protype. It should appear in the instance
proto.getSpec = function() {
    return "Specs: Length=" + this.l + " width=" + this.w + ' height:' + this.height;
}
console.log(piscine.getSpec()); // output Length=9 width=4.5 height:1.2
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

### Best Practices

It is better to define all variables at the beginning of functions unlike other language where it best to declare them at the point they are used.

### Closure
It a function or object define with a context, the context being the parameters and variable of the function the create them.

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

### Cascade
It is a function method that returns __this__ so calls can be chain.

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

### pseudoclassical

It uses the __new__ keyword on a function Constructor.  
pseudoclassical drawback:
* all properties are public
* no access to super method

```javascript
const Person = function(name, age) {
    this.name = name;
    this.age = age;
}
Prerson.prototype.getDetails() {
    return "Name: " + this.name + " Age: " + this.age;
}

const person = new Person('toto', 10);

const Employee = function(role) {
    this.role = role;
}

Employee.prototype = new Person();
Employee.prototype.getRole = function() {
    return "Role: " + this.role;
}
const employee = new Employee("Chief");

```

### prototypal
It uses the Object.create (some_object) some_object could be an object litteral



## Note

* Variables and function definition are hosited, meaning a variable can be defined after it used and when defined JS put them back at the top of the file.
* In JS if __;__ is missing will put one at the and of a statement. This dangerous because sometimes it makes wrong assumption and put them at the wrong place.  
Ex:

```
return // JS will put ; here intead of after }
{

}
```

* Unlike Python in JS a variable is define whit a var, const or let whereas in Python a vairable is defined when it is first used.

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
