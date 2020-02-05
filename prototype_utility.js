

Function.prototype.method = function(name, func) {
    if (!this.prototype[name]) {
        this.prototype[name] = func;
        return this;
    }
}

const Human = function(name, age, smile) {
    this.name = name;
    this.age = age;
    this.smile = smile
}

Human.method('isGood', function (){
    return this.name + (this.smile ? (this.smile ? " is good"  : "is ass hole") : " is an ass hole anyway");
});

const goodPerson = new Human('Philippe', 20, true);
const badPesron = new Human('Enfoire', 30);

console.log(goodPerson.isGood());
console.log(badPesron.isGood());