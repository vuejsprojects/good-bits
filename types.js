const ar = ['x', 'y', 'z'];
const obj = {
    a: 'a',
    b: 'b',
    c: 'c'
};
obj.len = function () {
    return Object.size(this);
}

const print = console.log;

// There's a sort of convention in JavaScript 
// that you don't add things to Object.prototype,
// because it can break enumerations in various libraries.
Object.size = function (ob) {
    let size = 0;
    for (let prop in ob) {
        print("ob.prop:", typeof ob[prop]);
        if (ob.hasOwnProperty(prop) &&
            typeof (ob[prop]) !== 'function') {
            size += 1;
        }
    }
    return size;
}
print('1)')
print("obj length:", Object.size(obj));
print('Or')
print("obj length:", Object.keys(obj).length);
print('2)')
print("obj len :", obj.len());

const func = () => ' OK';
print('Typeof func: ', typeof func, func())
if (typeof func === 'function') {
    print('Chouette!')
}

print("Object props:")
for (let p in Object) {
    print("- ", p);
}

const getMethods = (obj) => Object.getOwnPropertyNames(obj).filter(item => typeof obj[item] === 'function')
print(getMethods(obj))


// spread ...
obj2 = { ...ar };
print(obj2);
obj3 = { ...obj2 };
print(obj3);

const getMethods2 = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
        print("Current obj:", currentObj)
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

const getFuncMethods = (obj) => {
    let properties = new Set()
    let currentObj = obj
    do {
        print("Current obj:", currentObj)
        Object.getOwnPropertyNames(currentObj).map(item => properties.add(item))
    } while ((currentObj = Object.getPrototypeOf(currentObj)))
    return [...properties.keys()].filter(item => typeof obj[item] === 'function')
}

print('Properties of objects along th chain')
print(getMethods2(obj))
print('Properties of functions along th chain')
// print(getFuncMethods(func))
print('func proptotype: ', Object.getPrototypeOf(func))
print(Function.prototype);

Object.prototype.fait_chier = () => 'fait chier';
print('All property name of an object');
print('Properties of {}: ', Object.getOwnPropertyNames({}));
print('Prototype of {}: ',Object.getPrototypeOf({}));
print('Properties of Prototype of {}: ',Object.getOwnPropertyNames(Object.getPrototypeOf({})));

print('All property name of an function');
print("type of function() {}: ", function() {});
print('Properties of function() {}: ', Object.getOwnPropertyNames(function() {}));
print('Prototype of function() {}: ',Object.getPrototypeOf(function() {}));
print('Properties of Prototype of function() {}: ',Object.getOwnPropertyNames(Object.getPrototypeOf(function() {})));
