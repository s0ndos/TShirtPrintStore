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
                var new_remove = document.createElement('a');
                var new_submit=document.createElement('button');
                var new_canvas = document.createElement('canvas');
                var new_image = new Image;
                //remove and submit innerHTML
                new_remove.innerHTML="X";
                new_remove.href="JavaScript:";
                new_submit.innerHTML="Submit";
                //appending li to ul,div to li
                output_file_list.appendChild(new_li);
                new_li.appendChild(new_div);
                // appending canvas, remove ,submit to div
                new_div.appendChild(new_canvas);
                new_div.appendChild(new_remove);
                new_div.appendChild(new_submit);
                //Remove Style
                remove_style(new_remove);
                remove_hover(new_remove);
                // Start image load by calling any of the two read_and_draw function
                read_and_filereader(file,new_image);
                // Making use a closure to trap the right canvas and image instances
                new_image.addEventListener('load', function () {
                    var canvas = new_canvas;
                    var img = new_image;
                    return function () {
                        draw_on_canvas(canvas,img,new_remove);
                    }
                }());
                //Remove picture
                new_remove.addEventListener('click',remove_canvas);
                //Submit picture to Canvas0
                new_submit.addEventListener('click',putinto_clothes);
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
     * Remove button
     */
    function remove_canvas() {
        document.getElementById("output_file_list").removeChild(this.parentNode.parentNode);
    }
    function remove_style(remove) {
        $(remove).css({
            "position": "absolute",
            "left":0+"px",
            "z-index": 5,
            "text-decoration": "none",
            "color": "black"
        });
    }

    function remove_hover(remove) {
        $(remove).hover(
            function(){
                $(remove).css({
                    "position": "absolute",
                    "left": 0 + "px",
                    "z-index": 5,
                    "text-decoration": "none",
                    "color": "blue"
                })
            },
            function () {
                remove_style(remove);
            });
    }

    /**
     * Submit button
     * Put picture into Canvas0
     */
    function putinto_clothes() {
       var dataURL=new_canvas.toDataURL('image/png');
       console.log(dataURL);
    }
}