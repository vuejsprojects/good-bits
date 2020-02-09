
let ar = ['one', 'two', 'three'];
// equivalent to
const eq_ar = {
    '0': 'one',
    '1': 'two',
    '2': 'three',
};

for (let it in ar) {
    console.log(it); // output '0' '1' '2' + possible other prepoerties set on the array and no order guarantee
}

for (let i=0; i < ar.length; i++) {
    console.log(ar[i]); // output 'one`, 'two', 'three'
}

const ar_high = [];
ar_high[1000] = 'stuff'; // 1000 is auto converted to a string '1000'
console.log(ar_high.length); // output 1001

ar = ['one', 'two', 'three', 'quatre'];
delete(ar[2]); 
console.log(ar); // output ["one", "two", …, "quatre"]
// To remove the hole, use splice which compresses the array:  
const rank_to_delete = 1;  
const num_of_items_to_delete = 1;
ar.splice(rank_to_delete, num_of_items_to_delete);  
console.log(ar); // output ["one", …, "quatre"]

console.log(typeof ar); // output object
console.log(ar.constructor === Array); // output true
