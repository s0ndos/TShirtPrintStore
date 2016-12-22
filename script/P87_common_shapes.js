/**
 * Definition and Implementation of some 2D shapes
 * Goal :
 *  - Revise Javascript Object programming
 *  - Tooling for Canvas drawing and playing
 */

/**
 * Shape is a kind of "abstract" class
 * Methods are here for modeling the heritage
 * See Points_shape for implementation start with a given x,y position
 */
function Shape() {
    throw new Error('Abstract method : Should not be called');
}

/**
 * Static methods of shape
 */

/**
 * Checks if the given value is a valid number for coordinate
 * Undefined (or absent) values are accepted
 * @param z The coordinate to check
 */
Shape.prototype.check_coordinate = function (z) {
    if ('number' !== typeof z) {
        throw new TypeError('Invalid number value for coordinate');
    }
    return z;
};

/**
 * Abstract methods :
 * None of them should not be called in this abstract class
 * Only descendants should call it
 */

/**
 * Returns the absolute value of shape offset in x direction ( = the dimension in Ox direction)
 */
Shape.prototype.get_width = function () {
    throw new Error('Abstract method : Should not be called');
};


/**
 * Returns the absolute value of shape offset in y direction ( = the dimension in Oy direction)
 */
Shape.prototype.get_height = function () {
    throw new Error('Abstract method : Should not be called');
};


/**
 * Returns the smallest dimension of the shape (the min of get_height or get_height)
 */
Shape.prototype.get_size = function () {
    throw new Error('Abstract method : Should not be called');
};

/**
 * Moves shape of a given Ox axis translation
 * @param dx : x coordinate shift
 */
Shape.prototype.move_x_of = function (dx) {
    throw new Error('Abstract method : Should not be called');
};

/**
 * Moves shape of a given Oy axis translation
 * @param dy : y coordinate shift
 */
Shape.prototype.move_y_of = function (dy) {
    throw new Error('Abstract method : Should not be called');
};

/**
 * Moves shape of a given translation (x and y axis)
 * @param dx : x coordinate shift
 * @param dy : y coordinate shift
 */
Shape.prototype.move_of = function (dx ,dy) {
    throw new Error('Abstract method : Should not be called');
};

/**
 * Moves shape to a given Point
 * @param x : number, Final x coordinate of shape
 * @param y : number, Final y coordinate of shape
 */
// Translates the Points_shape to the specified location
Shape.prototype.move_to = function (x, y) {
    throw new Error('Abstract method : Should not be called');
};

/**
 * Get center Points_shape of shape
 */
Shape.prototype.get_center = function () {
    throw new Error('Abstract method : Should not be called');
};

/**
 * Returns true if given point is inside the shape
 * @param x : number, x coordinate of given point
 * @param y : number, y coordinate of given point
 */
Shape.prototype.point_is_in = function (x,y) {
    throw new Error('Abstract method : Should not be called');
};

/**
 * Points_shape() is the constructor of the Points_shape class
 * Points_shape class is the first real implementation of Shape abstraction
 * Points_shape will serve as base for all 2D shapes defined further
 * Points_shape by itself is not a sized shape because if contains just on point
 * Its size related methods (get_width, get_height, get_size)
 * - Don't have a particular meaning (they will return 0)
 * - They will take sense in sized shapes
 * All abstract methods of Shape are implemented in Points_shape
 * @param x : x coordinate of Points_shape
 * @param y : y coordinate of Points_shape
 * @constructor
 */
function Points_shape(x, y) {
    this.coords = [];
    this.add_point(x,y);
    //this.coords.push([Shape.prototype.check_coordinate(x), Shape.prototype.check_coordinate(y)]); // array of coordinates
}

// Makes the heritage link here : Shape is in the prototype chain of Points_shape
Points_shape.prototype = Object.create(Shape.prototype); // Shape is in the prototype chain of Points_shape

// The "constructor" of Points_shape refers to the above Points_shape() function
Points_shape.prototype.constructor = Points_shape;

/**
 * Checks if the given value is a valid Points_shape
 * @param p : Points_shape, The Points_shape object to check
 */
Points_shape.prototype.check_Referenced_shape = function (p) {
    if ( ! (p instanceof Points_shape)) {
        throw new TypeError('Invalid Points_shape object');
    }
    return p;
};

/**
 * Checks if the given index value is valid :
 * Valid positive integer
 * - In the range   0.. this.points.length-1
 * @param index : number, index of the considered point
 */
Points_shape.prototype.check_point_index = function (index) {
    if (('number' !== typeof index ) || ( ! Number.isInteger(index)) || (index < 0) || (index >= this.coords.length)) {
        throw new RangeError('Invalid index value');
    }
    return index;
};

/**
 * Adds a point
 * @param x : number, x coordinate of point to add
 * @param y : number, y coordinate of point to add
 */
Points_shape.prototype.add_point = function (x ,y) {
    this.coords.push([Shape.prototype.check_coordinate(x), Shape.prototype.check_coordinate(y)]); // array of coordinates
    return this;
};

/**
 * Returns a point given its index
 * @param index : number, index of point to get
 * @returns (Point), the point at this
 */
Points_shape.prototype.get_point = function (index) {
    this.check_point_index(index);
    return new Point(this.coords[index][0], this.coords[index][1]);
};

// Gets the x pos of point of shape at given index
Points_shape.prototype.get_x = function (index) {
    this.check_point_index(index);
    return this.coords[index][0];
};

// Gets the y pos of point of shape at given index
Points_shape.prototype.get_y = function (index) {
    this.check_point_index(index);
    return this.coords[index][1];
};

// Gets the smallest x pos of all points of shape
Points_shape.prototype.get_min_x = function () {
    result = this.coords[0][0];
    for (var i = 0; i < this.coords.length; i++) {
        if (this.coords[i][0] < result) {
            result = this.coords[i][0];
        }
    }
    return result;
};

// Gets the biggest x pos of all points of shape
Points_shape.prototype.get_max_x = function () {
    result = this.coords[0][0];
    for (var i = 0; i < this.coords.length; i++) {
        if (this.coords[i][0] > result) {
            result = this.coords[i][0];
        }
    }
    return result;
};

// Gets the smallest y pos of all points of shape
Points_shape.prototype.get_min_y = function () {
    result = this.coords[0][1];
    for (var i = 0; i < this.coords.length; i++) {
        if (this.coords[i][1] < result) {
            result = this.coords[i][1];
        }
    }
    return result;
};

// Gets the biggest y pos of all points of shape
Points_shape.prototype.get_max_y = function () {
    result = this.coords[0][1];
    for (var i = 0; i < this.coords.length; i++) {
        if (this.coords[i][1] > result) {
            result = this.coords[i][1];
        }
    }
    return result;
};


// Gets the x pos of first point of shape
Points_shape.prototype.get_x1 = function () {
    return this.coords[0][0];
};

// Gets the y pos of first point of shape
Points_shape.prototype.get_y1 = function () {
    return this.coords[0][1];
};

// Sets the x pos of point of shape at given index
Points_shape.prototype.set_x = function (index, x) {
    this.check_point_index(index);
    this.coords[index][0] = Shape.prototype.check_coordinate(x);
};

// Sets the x pos of point of shape at given index
Points_shape.prototype.set_y = function (index, y) {
    this.check_point_index(index);
    this.coords[index][1] = Shape.prototype.check_coordinate(y);
};

// x offset of Points_shape is zero
Points_shape.prototype.get_x_offset = function () {
    return 0;
};

/**
 * Generic implementation of get_width (see Shape class)
 * @returns {number}
 */
Points_shape.prototype.get_width = function () {
    return Math.abs(this.get_x_offset());
};

// y offset of Points_shape is zero
Points_shape.prototype.get_y_offset = function () {
    return 0;
};

/**
 * Generic implementation of get_height (see Shape class)
 * @returns {number}
 */
Points_shape.prototype.get_height = function () {
    return Math.abs(this.get_y_offset());
};

/**
 * Generic implementation of get_size (see Shape class)
 * @returns {number}
 */
Points_shape.prototype.get_size = function () {
    return Math.min(this.get_width(), this.get_height());
};

// Implementation of move_x_of method
// See ancestor class Shape for description
Points_shape.prototype.move_x_of = function (dx) {
    Shape.prototype.check_coordinate(dx);
    for (var i = 0; i < this.coords.length ; i++) {
        this.coords[i][0] += dx;
    }
    return this;
};

// Implementation of move_y_of method
// See ancestor class Shape for description
Points_shape.prototype.move_y_of = function (dy) {
    Shape.prototype.check_coordinate(dy);
    for (var i = 0; i < this.coords.length ; i++) {
        this.coords[i][1] += dy;
    }
    return this;
};

// Implementation of move_of method
// See ancestor class Shape for description
Points_shape.prototype.move_of = function (dx ,dy) {
    this.move_x_of(dx);
    this.move_y_of(dy);
    return this;
};

Points_shape.prototype.move_to = function (x, y) {
    Shape.prototype.check_coordinate(x);
    Shape.prototype.check_coordinate(y);
    this.move_of(x - this.get_x(0), y - this.get_y(0));
    return this;
};

/**
 * Center of Points_shape is the Points_shape itself
 * Not useful, this is for heritage coherence purpose
 * @returns {Points_shape}
 */
Points_shape.prototype.get_center = function () {
    return new Points_shape(this.get_x(0), this.get_y(0));
};


/**
 * Point is just another implementation of Points_shape
 * Points_shape already holds anything that is necessary for Point issues
 * This is a particular descendent of Points_shape
 *
 */
Point = function (x, y) {
    Points_shape.call(this, x, y);
    return this;
};

// Makes the heritage link here : Points_shape is in the prototype chain of Point
Point.prototype = Object.create(Points_shape.prototype); // Shape is in the prototype chain of Point

// The "constructor" of Point refers to the above Point() function
Point.prototype.constructor = Point;

/**
 * Defines a rectangle shape and initialise from two Points_shape (points are of this type) instances that can be any corner points
 *
 */
Rectangle = function (x, y, x2, y2) {
    Points_shape.call(this, x, y);
    if (('undefined' !== typeof x2) && ('undefined' !== typeof y2)) {
        this.add_point(x2, y2);
    } else {
        this.add_point(x, y);
    }
    return this;
};

// Makes the heritage link here : Points_shape is in the prototype chain of Rectangle
Rectangle.prototype = Object.create(Points_shape.prototype);

// The "constructor" of Points_shape refers to the above Points_shape() function
Rectangle.prototype.constructor = Rectangle;

// Gets the x pos of the the opposite corner point
Points_shape.prototype.get_x2 = function () {
    return this.get_x(1);
};

// Gets the y pos of the the opposite corner point
Points_shape.prototype.get_y2 = function () {
    return this.get_y(1);
};

// Returns the offset of the rectangle shape in Ox direction
Rectangle.prototype.get_x_offset = function () {
    return this.get_x(1) - this.get_x(0);
};

// Returns the offset of the rectangle shape in Oy direction
Rectangle.prototype.get_y_offset = function () {
    return this.get_y(1) - this.get_y(0);
};

// Sets the offset of the rectangle shape in Ox direction
// It affects the second point x coordinate
Rectangle.prototype.set_x_offset = function (dx) {
    this.set_x(1, this.get_x(0) + dx);
};

// Sets the offset of the rectangle shape in Oy direction
// It affects the second point y coordinate
Rectangle.prototype.set_y_offset = function (dy) {
    this.set_y(1, this.get_y(0) + dy);
};

// Sets the width of the rectangle (Ox direction)
// It affects the second point x coordinate
Rectangle.prototype.set_width = function (w) {
    this.set_x_offset(w);
};

// Sets the height of the rectangle (Oy direction)
// It affects the second point x coordinate
Rectangle.prototype.set_height = function (h) {
    this.set_y_offset(h);
};

// Returns the center Point of the rectangle
Rectangle.prototype.get_center = function () {
    return new Point((this.get_x(1) - this.get_x(0)) / 2, (this.get_y(1) - this.get_y(0)) / 2);
};

/**
 * Returns true if given point is inside the shape
 */
Rectangle.prototype.point_is_in = function (x,y) {
    return (this.get_x1() <= x) && (x <= this.get_x2()) && (this.get_y1() <= y) && (y <= this.get_y2());
};


/**
 * Defines a circle shape and initialises it from its center Point and its ray
 */
Circle = function (x, y, ray) {
    Points_shape.call(this, x, y);
    this.ray = ray;
    return this;
};

// Makes the heritage link here : Points_shape is in the prototype chain of Circle
Circle.prototype = Object.create(Points_shape.prototype);

// The "constructor" of Circle refers to the above Circle() function
Circle.prototype.constructor = Circle;

// Gets the circle ray value
Circle.prototype.get_ray = function () {
    return this.ray;
};

// Gets the circle ray value
Circle.prototype.set_ray = function (r) {
    Shape.prototype.check_coordinate(r);
    return this.ray;
};

/**
 * Defines a triangle shape and initialises it from three corner Referenced_shapes
 */
Triangle = function (x1, y1, x2, y2 , x3, y3) {
    Points_shape.call(this, x1, y1);
    this.add_point(x2, y2);
    this.add_point(x3, y3);
    return this;
};

// Makes the heritage link here : Points_shape is in the prototype chain of Triangle
Triangle.prototype = Object.create(Points_shape.prototype);

// The "constructor" of Triangle refers to the above Triangle() function
Triangle.prototype.constructor = Triangle;

// Gets the x pos of the second point
Triangle.prototype.get_x2 = function () {
    return this.get_x(1);
};

// Gets the y pos of the second point
Triangle.prototype.get_y2 = function () {
    return this.get_y(1);
};

// Gets the x pos of the third point
Triangle.prototype.get_x3 = function () {
    return this.get_x(2);
};

// Gets the y pos of the third point
Triangle.prototype.get_y3 = function () {
    return this.get_y(2);
};

// Returns the center Points_shape of the Triangle
Triangle.prototype.get_center = function () {
    throw Error('To be implemented');
};

/*
// Moves the Triangle shape along x axis of a certain dx offset
Triangle.prototype.moveX = function (dx) {
    if ('number' !== typeof dx) {
        throw new TypeError('Invalid x offset : number expected');
    }
    this.get_x1() += dx;
    this.get_x2() += dx;
    this.get_x3() += dx;
    return this;
};

// Moves the Triangle shape along y axis of a certain dy offset
Triangle.prototype.moveY = function (dy) {
    if ('number' !== typeof dy) {
        throw new TypeError('Invalid y offset : number expected');
    }
    this.get_y1() += dy;
    this.get_y2() += dy;
    this.get_y3() += dy;
    return this;
};

// Moves the Triangle shape of the specified dx and dy offsets
Triangle.prototype.move_of = function (dx, dy) {
    this.moveX(dx);
    this.moveY(dy);
    return this;
};

// Moves the Triangle shape so that p1 will be at the specified location
Triangle.prototype.moveTo = function(x, y) {
    var dx = x - this.get_x1();
    var dy = y - this.get_y1();
    this.move_of(dx,dy);
    return this;
};
*/
