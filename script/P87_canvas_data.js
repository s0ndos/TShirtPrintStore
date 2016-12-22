/**
 * An utility object to get canvas element, dimensions and 2D context from document
 *
 */
function Canvas_data(an_id) {
    this.elem = null;    // The canvas element
    this.rect = null;    // The canvas dimensions (width and height)
    this.ctx = null;     // The canvas "2D" context
    /**
     * Loads a canvas from document
     * If an id is provided, looks for a particular element with that id
     * Otherwise, looks for canvases by tag name. If several found, takes the first one
     * @param an_id : string, a canvas element id
     */
    if (('string' === typeof an_id) && (0 < an_id.length)) {
        if (null === (this.elem = document.getElementById(an_id))) {
            throw new Error('No element with id (' + an_id + ') found in document');
        }
    } else {
        var canvas_list = document.getElementsByTagName('canvas');
        console.log(canvas_list.length + ' canva(s) element(s) found');
        if (0 === canvas_list.length) {
            throw new Error('No canvas found in document');
        }
        this.elem = canvas_list[0];
    }
    // Storing the canvas dimensions in a Rectangle object
    this.rect = new Rectangle(0 , 0, this.elem.width, this.elem.height);
    this.ctx = this.elem.getContext("2d");
    console.log('Canvas loaded with element ' + this.elem + ', dimensions (' + this.rect.get_width() + ',' + this.rect.get_height() + ')');
    return this;
}

// The "constructor" of Canvas_data refers to the above Canvas_data() function
Canvas_data.prototype.constructor = Canvas_data;

/**
 * Returns the width of the canvas_data
 */
Canvas_data.prototype.get_width = function () {
    return this.rect.get_width();
};

/**
 * Returns the height of the canvas_data
 */
Canvas_data.prototype.get_height = function () {
    return this.rect.get_height();
};

/**
 * Sets the width of the canvas_data
 */
Canvas_data.prototype.set_width = function (width) {
    this.elem.width = width;
    this.rect.set_width(width);
};

/**
 * Sets the height of the canvas_data
 */
Canvas_data.prototype.set_height = function (height) {
    this.elem.height = height;
    this.rect.set_height(height);
};

/**
 * Get center of the canvas area
 */
Canvas_data.prototype.get_center = function () {
    return this.rect.get_center();
};

const TARGET_POINT_RAY = 5;
const TARGET_CIRCLE_RAY = 15;

/**
 * Draws a target like reference point at given position in order to evidence that position
 */
Canvas_data.prototype.draw_target_like_point = function (p, color) {
    this.ctx.save();
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.arc(p.get_x1(), p.get_y1(), TARGET_POINT_RAY, 0, 2 * Math.PI);
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.beginPath();
    this.ctx.arc(p.get_x1(), p.get_y1(), TARGET_CIRCLE_RAY, 0, 2 * Math.PI);
    this.ctx.strokeStyle = color;
    this.ctx.draw();
    this.ctx.restore();
    return this;
};


/**
 * Draws a dotted line in order to evidence a direction
 */
Canvas_data.prototype.draw_direction_line = function (pos1, pos2, color) {
    this.ctx.save();
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(pos1.x, pos1.y);
    this.ctx.lineTo(pos2.x, pos2.y);
    this.ctx.setLineDash([5, 5]); // dashed line
    this.ctx.strokeStyle = color;
    this.ctx.draw();
    this.ctx.restore();
    return this;
};

/**
 * Draws a dotted line in order to evidence a direction
 */
Canvas_data.prototype.draw_axis = function (length, color, line_width) {
    this.ctx.save();
    this.ctx.lineWidth = 2;//('undefined' == typeof line_width) ? 5 : line_width;
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(length, 0);
    this.ctx.setLineDash([5, 5]); // dashed line
    this.ctx.strokeStyle = color;
    this.ctx.draw();
    this.ctx.beginPath();
    this.ctx.moveTo(0, 0);
    this.ctx.lineTo(0,length);
    this.ctx.setLineDash([5, 5]); // dashed line
    this.ctx.strokeStyle = color;
    this.ctx.draw();
    this.ctx.restore();
    return this;
};
