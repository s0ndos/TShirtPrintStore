/**
 * Created by gpnissar on 2015-02-01.
 */
/**
 * Provides a random color value that can be used as color 
 * for the canvas properties fillStyle and stokeStyle
 * @param greyScaleOnly : To obtain a gray scale color only
 * @returns {string} The produced color as an hexadecimal css color
 */
function get_random_color(greyScaleOnly) {
    greyScaleOnly = typeof greyScaleOnly === "boolean" ? greyScaleOnly : false;
    var hexRes = '000000'; //La valeur hexa du résultat
    if (greyScaleOnly) {
        var greyValue = Math.floor(Math.random()*256).toString(16);
        hexRes  = greyValue + greyValue + greyValue;
    } else {
        hexRes  = Math.floor(Math.random()*16777215).toString(16);
    }
    return '#' + hexRes;
}

// / Petite translation des coordonnées : événement -> pos dans canvas

/**
 * Calculates the coordinates in the canvas coordinate system 
 * of the position of a mouse interaction event on the surface of canvas
 * @param canvas_element : Object, The canvas element
 * @param evt : Object, The mouse event
 * @returns {Point} : Point object, The coordinates of the mouse interaction
 */
function eventToCanvasXY(canvas_element, evt) {
    //return {x : event.layerX - canvas.offsetLeft, y : event.layerY - canvas.offsetTop};
    var rect = canvas_element.getBoundingClientRect();
    return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
}

/**
 * Produces the datetime representation (exemple: '2015-02-25') of a Javascript Date object
 * @param date: Date, the Javascript date
 * @returns {string}, the provided string
 */
function dateToYYYY_MM_DD(date, withTime) {
    if ('undefined' === typeof withTime) {
        withTime = false;
    }
    function pad(num) {
        return num.toString().length < 2 ? '0' + num : num.toString();
    }
    var result = date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate());
    if (withTime) {
        result += ' '
            + pad(date.getHours()) + ':' +
            + pad(date.getMinutes()) + ':' +
            + pad(date.getSeconds());
    }
    return result;
}

