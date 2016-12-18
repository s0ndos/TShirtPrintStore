/**
 * Created by fbenavid on 2016-12-18.
 */
'use strict';

document.addEventListener('DOMContentLoaded', draw);

function draw() {
    console.log('Function draw');
    var cnv = new Canvas_data('canvas0');
    //loading the cat image in order to put in the canvas
    var img = new Image();
    img.src= 'image/DemoTshirtFront.png';

    img.addEventListener('load', function(){
        //when image is loaded, event is triggered
        console.log('t-shirt image is loaded, put it on the canvas');
        cnv.ctx.drawImage(img,0,0);
    });
}