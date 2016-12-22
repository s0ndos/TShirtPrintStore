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
        /*clearing rectangle*/
        cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

        //when image is loaded, event is triggered
        console.log('t-shirt image is loaded, put it on the canvas');
        cnv.ctx.drawImage(img, 0, 0);

        if (color != 'white') { //recolor img
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

                if (color == 'red') {
                    imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
                    imgData.data[i + 1] = 0; // Remove Green
                    imgData.data[i + 2] = 0; // Remove blue
                }
                else if (color == 'green') {
                    imgData.data[i + 0] = 0; // Remove red
                    imgData.data[i + 1] = pixel_backup[i + 2]; // Restore green
                    imgData.data[i + 2] = 0; // Remove Blue
                }
                else if (color == 'blue') {
                    imgData.data[i + 0] = 0; // Remove red
                    imgData.data[i + 1] = 0; // Remove green
                    imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                }
                else if (color == 'yellow') {
                    imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
                    imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //yellow
                    imgData.data[i + 2] = 0; // Remove Blue
                }
                else if (color == 'aqua') {
                    imgData.data[i + 0] = 0; // Remove red
                    imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //aqua
                    imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                }
                else if (color == 'hotPink') {
                    imgData.data[i + 0] = pixel_backup[i + 0]; // Remove red
                    imgData.data[i + 1] = 0; // Remove green                     //hotPink
                    imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                }

                imgData.data[i + 3] = pixel_backup[i + 3]; // Restore alpha
            }

            cnv.ctx.putImageData(imgData, 0, 0);
            console.log('After putting pixels back : ', imgData.data.length / 4);
        }

    });


    document.getElementById('red').addEventListener('click', colorChange);
    document.getElementById('blue').addEventListener('click', colorChange);
    document.getElementById('green').addEventListener('click', colorChange);
    document.getElementById('yellow').addEventListener('click', colorChange);
    document.getElementById('hotPink').addEventListener('click', colorChange);
    document.getElementById('aqua').addEventListener('click', colorChange);
    document.getElementById('white').addEventListener('click', colorChange);

    document.getElementById('frontBack').addEventListener('click', frontBackChange);

    /*
     * Changing shirt colors
     * */
    function colorChange() {
        img.src = 'image/' + shirtType + document.getElementById('frontBack').innerHTML.trim() + '.png'; //reload img

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

        /*loading new image*/
        img = new Image();
        img.src = 'image/' + shirtType + this.innerHTML.trim() + '.png';

        console.log(img.src);

        //when image is loaded, event is triggered
        img.addEventListener('load', function () {
            /*clearing rectangle*/
            cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

            //when image is loaded, event is triggered
            console.log('t-shirt image is loaded, put it on the canvas');
            cnv.ctx.drawImage(img, 0, 0);
            if (color != 'white') { //recolor img
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

                    if (color == 'red') {
                        imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
                        imgData.data[i + 1] = 0; // Remove Green
                        imgData.data[i + 2] = 0; // Remove blue
                    }
                    else if (color == 'green') {
                        imgData.data[i + 0] = 0; // Remove red
                        imgData.data[i + 1] = pixel_backup[i + 2]; // Restore green
                        imgData.data[i + 2] = 0; // Remove Blue
                    }
                    else if (color == 'blue') {
                        imgData.data[i + 0] = 0; // Remove red
                        imgData.data[i + 1] = 0; // Remove green
                        imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                    }
                    else if (color == 'yellow') {
                        imgData.data[i + 0] = pixel_backup[i + 0]; // Restore red
                        imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //yellow
                        imgData.data[i + 2] = 0; // Remove Blue
                    }
                    else if (color == 'aqua') {
                        imgData.data[i + 0] = 0; // Remove red
                        imgData.data[i + 1] = pixel_backup[i + 1]; // Restore green  //aqua
                        imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                    }
                    else if (color == 'hotPink') {
                        imgData.data[i + 0] = pixel_backup[i + 0]; // Remove red
                        imgData.data[i + 1] = 0; // Remove green                     //hotPink
                        imgData.data[i + 2] = pixel_backup[i + 2]; // Restore Blue
                    }

                    imgData.data[i + 3] = pixel_backup[i + 3]; // Restore alpha
                }

                cnv.ctx.putImageData(imgData, 0, 0);
                console.log('After putting pixels back : ', imgData.data.length / 4);
            }
        });
    }


    for (var i = 0; i < document.getElementsByClassName('shirtSelection').length; i++) {
        document.getElementsByClassName('shirtSelection')[i].addEventListener('click', changeShirt);
    }


    function changeShirt() {
        console.log('in changeShirt function')

        shirtType = this.id;
        img.src = 'image/' + shirtType + document.getElementById('frontBack').innerHTML.trim() + '.png';
        // img.addEventListener('load', function () {
        //     //when image is loaded, event is triggered
        //     console.log('t-shirt image is loaded, put it on the canvas');
        //     cnv.ctx.drawImage(img, 0, 0);
        // });
    }

    for (var i = 0; i < document.getElementById('shirtSize').getElementsByTagName('input').length; i++) {
        document.getElementById('shirtSize').getElementsByTagName('input')[i].addEventListener('change', changeSize);
    }

    function changeSize() {
        console.log('in changeSize function');


        if(this.value == 'xs') {
            cnv.ctx.restore(); //go back to default preferences
            cnv.ctx.save();//store them

            /*clearing rectangle*/
            cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

            cnv.ctx.scale(0.75, 0.95);//rescale img
            cnv.ctx.translate(cnv.get_width() * 0.15, cnv.get_height() * 0.05);//move to center
            img.src = 'image/' + shirtType + document.getElementById('frontBack').innerHTML.trim() + '.png'; //reload img
        }else if(this.value == 's') {
            cnv.ctx.restore(); //go back to default preferences
            cnv.ctx.save();//store them

            /*clearing rectangle*/
            cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

            cnv.ctx.scale(0.9, 1);//rescale img
            cnv.ctx.translate(cnv.get_width() * 0.05, 0);//move to center
            img.src = 'image/' + shirtType + document.getElementById('frontBack').innerHTML.trim() + '.png'; //reload img
        } else if(this.value == 'l') {
            cnv.ctx.restore(); //go back to default preferences
            cnv.ctx.save();//store them

            /*clearing rectangle*/
            cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

            cnv.ctx.scale(1.15, 1.1);//rescale img
            cnv.ctx.translate(-cnv.get_width() * 0.06, 0);//move to center
            img.src = 'image/' + shirtType + document.getElementById('frontBack').innerHTML.trim() + '.png'; //reload img
        } else if(this.value == 'xl') {
            cnv.ctx.restore(); //go back to default preferences
            cnv.ctx.save();//store them

            /*clearing rectangle*/
            cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

            cnv.ctx.scale(1.25, 1.2);//rescale img
            cnv.ctx.translate(-cnv.get_width() * 0.1, -cnv.get_height() * 0.05);//move to center
            img.src = 'image/' + shirtType + document.getElementById('frontBack').innerHTML.trim() + '.png'; //reload img
        } else  {
            cnv.ctx.restore(); //go back to default preferences
            cnv.ctx.save();//store them

            /*clearing rectangle*/
            cnv.ctx.clearRect(0, 0, cnv.get_width(), cnv.get_height());

            img.src = 'image/' + shirtType + document.getElementById('frontBack').innerHTML.trim() + '.png'; //reload img
        }
    }
    /*function hexToRgb(hex) {
     var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
     return result ? {
     r: parseInt(result[1], 16),
     g: parseInt(result[2], 16),
     b: parseInt(result[3], 16)
     } : null;
     }*/
}

