// demonstrates few things

glob_scope_var = 3

console.log("Good bits")
console.log(Function)
console.log("Inspecting Function", Function.prototype)
for (prop in Function) {
    console.log(prop)
}

// Demonstrating this binding and function invocation
console.log("\n\nDemonstrating this binding and function invocation\n")

var func_invocation = function() {
    console.log("In the case of a function invocation this is bound ",
    "the to global object: this.glob_scope_var dsiplays 3")
    console.log("Type of this is global (not really): ", typeof this)
    console.log("this.glob_scope_var = ", this.glob_scope_var)
}
console.log("Calling func_invocation");
func_invocation();

// Augmenting a function from the prototype
console.log("\n\nDemonstrating augmenting function from Function protoype\n",
"It affects simple function and methods as well, see below\n")
Function.prototype.proto_add_func = function(x, y) {
    return x + y;
}

console.log("Function was augmented with proto_add_func", 
"Calling func_invocation.proto_add_func(3,8) = ", 
func_invocation.proto_add_func(3,8))


// method invocation
console.log("\n\nDemonstrating this binding and method invocation\n")
var some_obj = {
    obj_val: 55,
    some_method: function() {
        console.log("this is bound to the object", 
        "so this.glob_scope_var is undefined: ",
        this.glob_scope_var);
    },
    "other-method": function() {
        var that = this;
        var inner_func = function() {
            console.log("In an inner function, this time this is bound to the global object", 
            "so this.glob_scope_var is defined: ",
            this.glob_scope_var);
            console.log("Whereas that is bound to the object: ",
            that.obj_val)
        }
        inner_func();
    }
}

some_obj.some_method();
some_obj["other-method"]();
console.log("Method are affected by Function augmentation\n",
"some_obj.some_method.proto_add_func(4,18) = ",
some_obj.some_method.proto_add_func(4,18));


//Convenient way to augment any type
console.log("\n\nConvenient way to augment any type with any function")
Function.prototype.stuff = function(prop_name, associatedproc_name_func) {
    // this of the Function object
    this.prototype[prop_name] = associatedproc_name_func;
    //return this;
}
Number.stuff('integer', function() {
    return Math[this < 0 ? "ceil" : 'floor'](this);
});

console.log("int -7/3:", (-7 / 3).integer());

String.stuff("prefix", function(prefix) {
    return prefix+this
});

console.log('"normal".prefix("a_") = ', "normal".prefix("a_"));

var print = console.log
print("Showing properties of a string xxx")
var st="xxx"
for( p in st) {
    console.log(p);
}
print(st['prefix']);
print(st['0']);

print("\nShowing properties of a type String")
for( p in String) {
    console.log(p)
}

print("\nCurrying: func(a,b,c) = f(a)(b)(c)")

var volume = function(h,l,L) {
    return h * l * L;
}

var vol = function(h) {
    return function(l) {
        return function(H) {
            return h * l * H;
        }
    }
}

print("volume(2, 3, 4) === vol(2)(3)(4)")
print(volume(2, 3, 4), " === ", vol(2)(3)(4))

// using the apply invocation
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
