const print = console.log

const func = function () {
    let context_value = -2;
    return function () {
        // JS allows a simple number context value to be changed
        // it's diffrerent from python
        return context_value += 2;
    }
}

const my_func = func();
print(my_func())  // ouput 0
print(my_func())  // ouput 2


my_func2 = (function () {
    let context_value = -2;
    return {
        inc_by: function (inc) {
            // JS allows a simple number context value to be changed
            // it's diffrerent from python
            return context_value += inc;
        }

    }
})()

print(my_func2.inc_by(2))  // ouput 0
print(my_func2.inc_by(2))  // ouput 2


// "this" in the inner function is bound to the global object
// whereas in outer with is a method "this" is bound to the object
var obj = {};
obj.outer = function () {
    function inner() {
        console.log(this);
    }
    return inner;
}

var fn = obj.outer();
fn();  // output the global object

var obj = {};
obj.outer = function () {
    const that = this;
    function inner() {
        console.log(that);
    }
    return inner;
}

var fn = obj.outer();
fn(); // output obj
