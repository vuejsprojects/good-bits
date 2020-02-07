/*
    For import export to work wee need:
    - if running node version 10.18.x, 
        * use the experimaental flag  --experimental-modules
        * use the extension mjs instead of js
    - if running node version 13.x.y
        * either se the extension mjs instead of js
        * or add "type": "module" to package.json
*/

export let counter = 1;

export function increment() {
  counter++;
}

export function decrement() {
  counter--;
}