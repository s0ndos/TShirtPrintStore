/**
 * Created by gpnissar on 2015-02-01.
 */
/**
 * Fournit une valeur pour les propriétés de couleur du Canvas (FillStyle et StokeStyle)
 * @param greyScaleOnly : Pour avoir une couleur en gris seulement (grey scale)
 * @returns {string}
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


// Petite translation des coordonnées : événement -> pos dans canvas
function eventToCanvasXY(canvas_element, evt) {
    //return {x : event.layerX - canvas.offsetLeft, y : event.layerY - canvas.offsetTop};
    var rect = canvas_element.getBoundingClientRect();
    return new Point(evt.clientX - rect.left, evt.clientY - rect.top);
}

/**
 * Fournit la représentation datetime (exemple : 2015-02-25) d'un objet date
 * @param date
 * @returns {string}
 */
function dateToYYYY_MM_DD(date) {
    function pad(num) {
        num = num + '';
        return num.length < 2 ? '0' + num : num;
    }
    return date.getFullYear() + '-' +
        pad(date.getMonth() + 1) + '-' +
        pad(date.getDate());
}
