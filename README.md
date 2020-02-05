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
