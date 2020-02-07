// exporter
// https://www.freecodecamp.org/news/javascript-modules-a-beginner-s-guide-783f7d7a5fcc/
/* 
const some_costant = "I want to be imported";

export default some_costant;
 */
function myModule() {
    this.hello = function () {
        return 'hello!';
    }

    this.goodbye = function () {
        return 'goodbye!';
    }
}

module.exports = myModule;