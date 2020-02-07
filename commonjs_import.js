// https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/

/* 
import a_default_export_var from "./export_stuff.js"

const print = function() {
    console.log.apply(null, arguments,"\n");
}

print(a_default_export_var);  //output
 */
var myModule = require('./commonjs_export');

var myModuleInstance = new myModule();
console.log(myModuleInstance.hello()); // 'hello!'
console.log(myModuleInstance.goodbye()); // 'goodbye!'