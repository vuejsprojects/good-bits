const closure = (function(conter_name) {
    let var1 = 0;
    const obj = {
        display: function() {
            return conter_name + ' = ' + var1;
        },
        increment: function(inc) {
            return var1 += inc;
        }
    }
    return obj;
})('Mighty counter');

console.log(closure.display()); // Mighty counter = 0
closure.increment(4);
console.log(closure.display()); // Mighty counter = 4
closure.increment(3);
console.log(closure.display()); // Mighty counter = 7
