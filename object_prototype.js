
// Object has a create method that can be used to create new objects 
// based on an old object, the protoype object
console.log(typeof(Object.create))

// this show how Object.create would be implemented
if (typeof Object.create !== 'function') {
    Object.create = function(o) {
        const F = function() {};
        F.prototype = o;
        return new F();
    }
}

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
console.log(piscine.squareFootage()); // output 40.5

// reflecting the piscine object
console.log('piscine properties')
for (let prop in piscine) {
    console.log(prop); // l, w, squareFootage, init
}
// Print property names only (not the function/methode)
console.log('piscine properties with Object.getOwnPropertyNames which exclude functions')
let piscine_props = Object.getOwnPropertyNames(piscine);
for (let i=0; i < piscine_props.length; i++) {
    console.log(piscine_props[i]); // l, w
}

// Add new properties to the instance
piscine.height = 1.20;
piscine.getVolume = function() {
    return this.squareFootage() * this.height;
}
console.log(piscine.getVolume()); // output 48.6

// list all the properties (methods included)
console.log('piscine new properties')
for (let prop in piscine) {
    console.log(prop);  // l, w, height, getVolume, squareFootage, init
}
// list propertie only
console.log('piscine new properties with Object.getOwnPropertyNames which exclude functions')
piscine_props = Object.getOwnPropertyNames(piscine);
for (let i=0; i < piscine_props.length; i++) {
    console.log(piscine_props[i]);   // l, w, height, getVolume
}

// list piscine prototype
console.log('list piscine prototype');
for (let prop in piscine.__proto__) {
    console.log(prop); // l, w, squareFootage, init
}

// add a method to the protype. It should appear in the instance
proto.getSpec = function() {
    return "Specs: Length=" + this.l + " width=" + this.w + ' height:' + this.height;
}

// list all the properties (methods included)
console.log('piscine with updated prototype')
for (let prop in piscine) {
    console.log(prop);  // l, w, height, getVolume, squareFootage, init, getSpec
}
console.log(piscine.getSpec()); // output Length=9 width=4.5 height:1.2
const paddling_ppol = Object.create(proto);
paddling_ppol.init(2,2);
console.log(paddling_ppol.getSpec()); // output Length=9 width=4.5 height:undefined
