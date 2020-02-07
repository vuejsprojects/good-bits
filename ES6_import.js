/*
    For import export to work wee need:
    - if running node version 10.18.x, 
        * use the experimaental flag  --experimental-modules
        * use the extension mjs instead of js
    - if running node version 13.x.y
        * either se the extension mjs instead of js
        * or add "type": "module" to package.json
*/

import * as counter  from './ES6_export.js'
// or import {counter, increment} from './ES6_export.js'
// onsole.log(counter); ...

console.log(counter.counter); // 1
counter.increment();
console.log(counter.counter); // 2