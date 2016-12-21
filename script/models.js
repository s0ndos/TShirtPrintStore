/**
 * Created by fbenavid on 2016-12-18.
 */
'use strict';

document.addEventListener('DOMContentLoaded', draw);
console.log('model.js');
function draw() {
    console.log('Function draw');
    var cnv = new Canvas_data('canvas0');
    //loading the cat image in order to put in the canvas
    var img = new Image();
    img.src = 'image/DemoTshirtFront.png';
    var color = 'white'; //initial shirt color
    var shirtType = 'DemoTshirt';
    img.addEventListener('load', function () {
        //when image is loaded, event is triggered
        console.log('t-shirt image is loaded, put it on the canvas');
        cnv.ctx.drawImage(img, 0, 0);
        cnv.ctx.save();
    });


    document.getElementById('red').addEventListener('click', colorChange);
    document.getElementById('blue').addEventListener('click', colorChange);
    document.getElementById('green').addEventListener('click', colorChange);
    document.getElementById('yellow').addEventListener('click', colorChange);
    document.getElementById('hotPink').addEventListener('click', colorChange);
    document.getElementById('aqua').addEventListener('click', colorChange);
    document.getElementById('white').addEventListener('click', colorChange);

    document.getElementById('frontBack').addEventListener('click',frontBackChange);

    /*
     * Changing shirt colors
     * */
    function colorChange() {
        /*clearing rectangle*/
        cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

        /*redrawing initial img*/
        cnv.ctx.drawImage(img, 0, 0);
        // Defining the rectangular area of pixels to extract (full canvas)
        var extract_rect = new Rectangle(0, 0);
        extract_rect.set_width(img.width);
        extract_rect.set_height(img.height);

        // Extraction of pixels data
        var imgData = cnv.ctx.getImageData(extract_rect.get_x1(), extract_rect.get_y1(), extract_rect.get_width(), extract_rect.get_height());

        // The length of the data is 4 times the number of pixels, each pixels takes 4 bytes of data
        console.log('Nb of pixels extracted : ', imgData.data.length / 4);

        // Backup the pixel data somewhere
        var pixel_backup = [];
        for (var i = 0; i <= imgData.data.length - 4; i++) {
            pixel_backup.push(imgData.data[i]);
        }

        // Manipulate the pixels
        // If the pixel is close to white, change it to transparent
        // Parse each pixel one by one and change its rgba components
        // Here, the i control variable of the loop is the index of the red component of each pixel

        for (i = 0; i <= imgData.data.length - 4; i += 4) {

            if (this.id == 'red') {
                imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
                imgData.data[i + 1] = 0; // Remove Green
                imgData.data[i + 2] = 0; // Remove blue
                color = 'red';
            }
            else if (this.id == 'green') {
                imgData.data[i + 0] = 0; // Remove red
                imgData.data[i + 1] = pixel_backup[i + 2]; // Restore green
                imgData.data[i + 2] = 0; // Remove Blue
                color = 'green';
            }
            else if (this.id == 'blue') {
                imgData.data[i + 0] = 0; // Remove red
                imgData.data[i + 1] = 0; // Remove green
                imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                color = 'blue';
            }
            else if (this.id == 'yellow') {
                imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
                imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //yellow
                imgData.data[i + 2] = 0; // Remove Blue
                color = 'yellow';
            }
            else if (this.id == 'aqua') {
                imgData.data[i + 0] = 0; // Remove red
                imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //aqua
                imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                color = 'aqua';
            }
            else if (this.id == 'hotPink') {
                imgData.data[i + 0] = pixel_backup[i + 0]; // Remove red
                imgData.data[i + 1] = 0; // Remove green                     //hotPink
                imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                color = 'hotPink';
            }
            else {
                imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
                imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green
                imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                color = 'white';
            }

            imgData.data[i + 3] = pixel_backup[i + 3]; // Restore alpha
        }

        cnv.ctx.putImageData(imgData, 0, 0);
        console.log('After putting pixels back : ', imgData.data.length / 4);
    }

    function frontBackChange() {
        /*function will be called with 'frontBack' button, 'this' will refer to it in the current context*/

        //changing the message of the button
        if (this.innerHTML.trim().toLowerCase() == 'front') {
            this.innerHTML = 'Back';
        } else {
            this.innerHTML = 'Front';
        }

        //storing shirt selection buttons
        var shirtSelectors = document.getElementsByClassName('shirtSelection');
        //changing their thumbnails
        for (var i = 0; i < shirtSelectors.length; i++) {
            shirtSelectors[i].innerHTML = '<img src="image/' + shirtSelectors[i].id + this.innerHTML + '.png" width="50px">'
        }

        /*clearing rectangle*/
        cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

        /*loading new image*/
        img = new Image();
        img.src = 'image/' + shirtType + this.innerHTML.trim() + '.png';

        console.log(img.src);

        //when image is loaded, event is triggered
        img.addEventListener('load', function () {
            //when image is loaded, event is triggered
            console.log('t-shirt image is loaded, put it on the canvas');
            cnv.ctx.drawImage(img, 0, 0);
            cnv.ctx.save();
        });

        // if (color != 'white') {
        //     // Defining the rectangular area of pixels to extract (full canvas)
        //     var extract_rect = new Rectangle(0, 0);
        //     extract_rect.set_width(img.width);
        //     extract_rect.set_height(img.height);
        //
        //     // Extraction of pixels data
        //     var imgData = cnv.ctx.getImageData(extract_rect.get_x1(), extract_rect.get_y1(), extract_rect.get_width(), extract_rect.get_height());
        //
        //     /*clearing rectangle*/
        //     cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());
        //
        //     // The length of the data is 4 times the number of pixels, each pixels takes 4 bytes of data
        //     console.log('Nb of pixels extracted : ', imgData.data.length / 4);
        //
        //     // Backup the pixel data somewhere
        //     var pixel_backup = [];
        //     for (var i = 0; i <= imgData.data.length - 4; i++) {
        //         pixel_backup.push(imgData.data[i]);
        //     }
        //
        //     // Manipulate the pixels
        //     // If the pixel is close to white, change it to transparent
        //     // Parse each pixel one by one and change its rgba components
        //     // Here, the i control variable of the loop is the index of the red component of each pixel
        //
        //     for (i = 0; i <= imgData.data.length - 4; i += 4) {
        //
        //         if (color == 'red') {
        //             imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
        //             imgData.data[i + 1] = 0; // Remove Green
        //             imgData.data[i + 2] = 0; // Remove blue
        //             color = 'red';
        //         }
        //         else if (color == 'green') {
        //             imgData.data[i + 0] = 0; // Remove red
        //             imgData.data[i + 1] = pixel_backup[i + 2]; // Restore green
        //             imgData.data[i + 2] = 0; // Remove Blue
        //             color = 'green';
        //         }
        //         else if (color == 'blue') {
        //             imgData.data[i + 0] = 0; // Remove red
        //             imgData.data[i + 1] = 0; // Remove green
        //             imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
        //             color = 'blue';
        //         }
        //         else if (color == 'yellow') {
        //             imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
        //             imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //yellow
        //             imgData.data[i + 2] = 0; // Remove Blue
        //             color = 'yellow';
        //         }
        //         else if (color == 'aqua') {
        //             imgData.data[i + 0] = 0; // Remove red
        //             imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //aqua
        //             imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
        //             color = 'aqua';
        //         }
        //         else if (color == 'hotPink') {
        //             imgData.data[i + 0] = pixel_backup[i + 0]; // Remove red
        //             imgData.data[i + 1] = 0; // Remove green                     //hotPink
        //             imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
        //             color = 'hotPink';
        //         }
        //
        //         imgData.data[i + 3] = pixel_backup[i + 3]; // Restore alpha
        //     }
        //
        //     cnv.ctx.putImageData(imgData, 0, 0);
        //     console.log(color);
        //     console.log('After putting pixels back : ', imgData.data.length / 4);
        // }
    }
}

