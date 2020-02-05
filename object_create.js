// based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create

const print = console.log

// Shape - superclass
function Shape() {
    this.x = 0;
    this.y = 0;
}

// superclass method
Shape.prototype.move = function (x, y) {
    this.x += x;
    this.y += y;
    console.info('Shape moved.');
};

// Rectangle - subclass - It doesn't inherit the move method from Shape
// because move is defined on Shape prototype not Shape itself
// Note: this will point to the object only if instance object of
//       Rectangle are instantiated with new
function Rectangle() {
    Shape.call(this); // call super constructor.
}

print( Rectangle.prototype === Shape.prototype)  // output false

Rectangle.prototype = Object.create(Shape.prototype);
// They both have their on instance of Shape prototype
// but they don't share it
print( Rectangle.prototype === Shape.prototype)  // output false

// To complete Rectangle.prototype we know that the constructor
// property of the prototype object must point to the object itself
Rectangle.prototype.constructor = Rectangle; 

const rect = new Rectangle();


//
// Mixins technic is used to inherit from several objects
//
function Color() {
    this.color = 'blue'; // default color
    this.decorating = function() {
        print("Painting in ", this.color);
    }
}

const ColoredShape = function() {
    Shape.call(this);
    Color.call(this);
}

// Composing ColoredShape prototype
ColoredShape.prototype = Object.create(Shape.prototype);
// second prototype needs to be assigned
Object.assign(ColoredShape.prototype, Color.prototype);

ColoredShape.prototype.constructor = ColoredShape

const colorShaped = new ColoredShape();
colorShaped.decorating();


//
// Properties object:
// used to add propertie to an obect created with Object.create
//

// Object.create(Object.prototype is equivalent to {}
const obj = Object.create(Object.prototype, {
    greetings: {
        writable: true,
        configurable: true,  // greetings can be deleted
        value: 'Howdy'
    },
    title: {
        get: function() {
            return title;
        },
        set(value) {
            switch(value.toLowerCase()) {
                case 'mr':
                    title = 'Mister';
                    break;
                case 'ms':
                    title = 'Misses';
                    break;
                default:
                    title = 'Yo';
                    break;
            }
        }
    }
})
print(obj.greetings)  // output howdy
obj.title = 'Mr';
print(obj.title);