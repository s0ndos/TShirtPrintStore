/**
 * Created by msi on 2016/12/18.
 */
"use strict";

/**
 *Upload Picture
 */
function Upload_Picture() {
    var files_input=document.getElementById("files_input");
    var output_file_list=document.getElementById('output_file_list');
    var canvas0=document.getElementById('canvas0');
    //Check API work
    if(!window.File){
        throw new Error('No file API support');
    }
    //Upload picture
    files_input.addEventListener('change',function(){
        //Get img and remove button
        for (var i = 0; i < this.files.length ; i++) {
            var file = this.files[i]; // simgle file description
            if (img_is_valid(file)) {
                //Create li div remove submit canvas image
                var new_li = document.createElement('li');
                var new_div = document.createElement('div');
                var new_remove = document.createElement('button');
                var new_submit=document.createElement('button');
                var new_canvas = document.createElement('canvas');
                var new_image = new Image;
                //remove and submit innerHTML
                new_remove.innerHTML="Remove";
                new_submit.innerHTML="Submit";
                //appending li to ul,div to li
                output_file_list.appendChild(new_li);
                new_li.appendChild(new_div);
                // appending canvas, remove ,submit to div
                new_div.appendChild(new_canvas);
                new_div.appendChild(new_remove);
                new_div.appendChild(new_submit);

                //button Style
                button_style(new_remove);
                button_hover(new_remove);
                button_style(new_submit);
                button_hover(new_submit);
                // Start image load by calling any of the two read_and_draw function
                read_and_filereader(file,new_image);
                //Get Before submit  Canvas crc
                var dataURL=canvas0.toDataURL('image/png');
                // Making use a closure to trap the right canvas and image instances
                new_image.addEventListener('load', function () {
                    var canvas = new_canvas;
                    var img = new_image;
                    return function () {
                        draw_on_canvas(canvas,img);
                    }
                }());
                //Remove picture
                new_remove.addEventListener('click',function(){
                    var canvas = new_canvas;
                    var img = new_image;
                    var src=dataURL;
                    return function () {
                        remove_canvas(img,new_canvas,src);
                    }
                }());
                new_remove.addEventListener('click',remove_list);
                //Submit picture to Canvas0
                new_submit.addEventListener('click',function () {
                    var canvas=new_canvas;
                    return function () {
                        putinto_clothes(canvas);
                    }
                }());
            }else{
                alert("Error!The file is not img.(If your file is img, we just provide .png, .jpg, .jpeg and .bmp)");
            }
        }

    });
    //Check file type
    function img_is_valid(file){
        console.log(file.type);
        return('image'===file.type.split('/')[0]&&('png'===file.type.split('/')[1]||'jpg'===file.type.split('/')[1]||'jpeg'===file.type.split('/')[1]||'bmp'===file.type.split('/')[1]));
    }

    /**
     * Reading file and displaying content using FileReader object
     * @param file (File), file description
     * @param image (Image), valid image object
     */
    function read_and_filereader(file, image) {
        // Instanciate a FileReader object
        var reader = new FileReader();
        // Listen for the load
        reader.addEventListener('load', function () {
            image.src = this.result; // result property of the reader
        });
        // Triggering lecture
        reader.readAsDataURL(file);
    }

    /**
     * Reading file and displaying content using DataURLS
     */
    function read_and_draw_dataurl(file, image) {
        // Releasing data URL when image is loaded
        image.addEventListener('load', function () {
            window.URL.revokeObjectURL(this.src);
        });
        // Triggering the load
        image.src = window.URL.createObjectURL(file); // creating a data URL from file description
    }

    /**
     * Drawing a valid image object content onto a canvas
     * image should be loaded here
     */
    function draw_on_canvas(canvas, image) {
        // Giving canvas the image dimension

        canvas.width = image.width;
        canvas.height = image.height;

        var ctx = canvas.getContext('2d');
        // Drawing
        ctx.drawImage(image, 0 ,0);
    }

    /**
     * Button Style
     * @param button
     */
    function button_style(button) {
        $(button).css({
            "color": "black",
            "margin-right":5+"px"
        });
    }

    function button_hover(button) {
        $(button).hover(
            function(){
                $(button).css({
                    "color": "blue"
                })
            },
            function () {
                button_style(button);
            });
    }

    /**
     * Remove button
     */
    function remove_list() {
        //Remove list li
        document.getElementById("output_file_list").removeChild(this.parentNode.parentNode);

    }
    function remove_canvas(image,canvas,src) {
        //Get img
        var dataURL=canvas.toDataURL('image/png');
        var remove_img=new Image;
        var return_img=new Image;
        remove_img.src=dataURL;
        //Get Clothes canvas
        var canvas0=document.getElementById('canvas0');
        //Remove the picture
        var ctx=canvas0.getContext('2d');
        ctx.clearRect(0,0,remove_img.width,remove_img.height);
        //return before submit
        return_img.src=src;
        ctx.drawImage(return_img,0,0);

    }

    /**
     * Submit button
     * Put picture into Canvas0
     */
    function putinto_clothes(canvas) {
       var dataURL=canvas.toDataURL('image/png');
       var Img=new Image;
       Img.src=dataURL;
       var canvas0=document.getElementById('canvas0');
       var ctx=canvas0.getContext('2d');
       ctx.drawImage(Img,0,0);
    }
}