const NAME = Symbol();
const person = {
  [NAME]: 'Flavio'
}

person[NAME] //'Flavio';

const RUN = Symbol('Some description');
person[RUN] = () => 'Person is running';
console.log(person[RUN]()) //'Person is running';
console.log('person as two symbol properties:\n', Object.getOwnPropertySymbols(person));