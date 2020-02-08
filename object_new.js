
// Instead of using Object.create() to create new objects 
// based on an old object, the protoype object
// we will create new objects with using a constructor function
console.log(typeof(Object.create))

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

let piscine = Object.create(proto);

// Now using a constructor function
// The old init function is now the contructor: Object.prototype.constructor => Object

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

piscine = new Piscine(9, 4.5);
console.log(piscine.squareFootage()); // output 40.5
console.log("in m2: ", piscine.squareMeter()); // output 40.5

// reflecting the piscine object
console.log('piscine properties')
for (let prop in piscine) {
    console.log(prop); // l, w, squareMeter, squareFootage, init
}
console.log('piscine properties with Object.getOwnPropertyNames which exclude functions')
let piscine_props = Object.getOwnPropertyNames(piscine);
for (let i=0; i < piscine_props.length; i++) {
    console.log(piscine_props[i]); // l, w, squareMeter
}

piscine.height = 1.20;
piscine.getVolume = function() {
    return this.squareFootage() * this.height;
}
console.log(piscine.getVolume()); // output 48.6

console.log('piscine new properties')
for (let prop in piscine) {
    console.log(prop);  // l, w, squareMeter, height, getVolume, squareFootage, init
}
console.log('piscine new properties with Object.getOwnPropertyNames which exclude functions')
piscine_props = Object.getOwnPropertyNames(piscine);
for (let i=0; i < piscine_props.length; i++) {
    console.log(piscine_props[i]);   // l, w, squareMeter, height, getVolume
}

// list piscine prototype
console.log('list piscine prototype, i.e. what was defined on the Piscine.prototype');
for (let prop in piscine.__proto__) {
    console.log(prop); // squareFootage
}
