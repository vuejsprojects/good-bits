// Demonstrates a few things
// * list poperties of a type or an object
// * Demonstrating this binding for a function function or method function
// * Augmenting a function from the Function.prototype
// * Curruing which is to transform a function which take n parameters
//   in a cascade of functions return a fucntion and taking only one parameter.
//   Benefit: possibility to use intermediate func ex: below
// * using the apply invocation

//
// list poperties of a type or an object
//
const print = function() {
    console.log.apply(null, arguments,"\n");
}

glob_scope_var = 3;

print("Good bits");
print("list poperties of a type or an object")
print("Inspecting Function");
let ar = Object.getOwnPropertyNames(Function);
print(ar); // output [ 'length', 'name', 'prototype' ]

print("Inspecting Function prototype", Function.prototype);
ar = Object.getOwnPropertyNames(Function.prototype);
print(ar); // [ 'length','name','arguments','caller','constructor','apply', ...
for (let i = 0; i< ar.length; i++) {
    print(ar[i]);
}

const str = 'stuff';
print("Inspecting of a string ", str)
ar = Object.getOwnPropertyNames(str);
print(ar); // [ '0', '1', '2', '3', '4', 'length' ]
const proto = Object.getPrototypeOf(str);
print(proto);
ar = Object.getOwnPropertyNames(proto);
print(ar); // output [ 'length','constructor', ..., 'split','strike','sub','substr','substring',

//
// Demonstrating this binding and function invocation
//
print("\n\nDemonstrating this binding and function invocation\n")

var func_invocation = function() {
    print("In the case of a function invocation this is bound ",
    "to the global object: this.glob_scope_var dsiplays 3")
    print("Type of this is global (not really): ", typeof this)
    print("this.glob_scope_var = ", this.glob_scope_var)
}
print("Calling func_invocation");
func_invocation();

// method invocation
print("\n\nDemonstrating this binding and method invocation\n")
var some_obj = {
    obj_val: 55,
    some_method: function() {
        print("this is bound to the object", 
        "so this.glob_scope_var is undefined: ",
        this.glob_scope_var);
    },
    "other-method": function() {
        var that = this;
        var inner_func = function() {
            print("In an inner function, this time this is bound to the global object", 
            "so this.glob_scope_var is defined: ",
            this.glob_scope_var);
            print("Whereas that is bound to the object: ",
            that.obj_val)
        }
        inner_func();
    }
}

some_obj.some_method();
some_obj["other-method"]();

//
// Augmenting a function from the prototype
//
print("\nDemonstrating augmenting function from Function protoype\n",
"It affects simple function and methods as well, see below\n")
Function.prototype.proto_add_func = function(x, y) {
    return x + y;
}

print("\nEven method are affected by Function augmentation\n",
"some_obj.some_method.proto_add_func(4,18) = ",
some_obj.some_method.proto_add_func(4,18)); // output 22

print("\nOr function defined before Function.prototype was ",
"augmented with  proto_add_func", 
"Calling func_invocation.proto_add_func(3,8) = ", 
func_invocation.proto_add_func(3,8)); // output 11


//Convenient way to augment any type
print("\n\nConvenient way to augment any type with any function")
Function.prototype.stuff = function(prop_name, associatedproc_name_func) {
    // this of the Function object
    this.prototype[prop_name] = associatedproc_name_func;
    //return this;
}
Number.stuff('integer', function() {
    return Math[this < 0 ? "ceil" : 'floor'](this);
});

print("int -7/3:", (-7 / 3).integer());


String.stuff("prefix", function(prefix) {
    return prefix+this
});

print('"normal".prefix("a_") = ', "normal".prefix("a_"));


print("\nShowing properties of a string xxx")
var st="xxx";
print(">>>");
for( p in st) {
    print(p);
}
print("===");
print(Object.getOwnPropertyNames(st));
print(Object.getOwnPropertyNames(st.__proto__));
print("<<<");

print(st['prefix']);
print(st['0']);

print("\nShowing properties of a type String")
for( p in String) {
    // because String is a FUNCTION constructor and Function was augmented
    print(p) // output [proto_add_func, stuff] 
    
}

//
// Curruing which is to transform a function which take n parameters
// in a cascade of function taking only one parameter
//
print("\nCurrying: func(a,b,c) = f(a)(b)(c)")

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
print(volume(2, 3, 4), " === ", vol(2)(3)(4))
// Benefit is reuse of intermediate functions
vol_h_3 = vol(3);
// Knowing all my cubes have height of 3 I can caculate the volume of cubes
// for any length and width
const l = 4, w = 5;
print("Benefit: ", vol_h_3(l)(w)); // ouput 60
//
// using the apply invocation
//
print("\nusing the apply invocation")
var no_this_to_bind_to = null
print(volume.apply(no_this_to_bind_to, [2, 3, 4]))

// var curries = function(func_to_curry, args) {
//     return function(args[]) {
//         return function(args[1]) {

//         }
//     }
// }

const functions_have_two_properties = function(a,b,c) {};
print("functions have two properties:")
print("prototype = ", functions_have_two_properties.prototype)
print("length = ", functions_have_two_properties.length)
