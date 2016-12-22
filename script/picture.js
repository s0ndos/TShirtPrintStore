/**
 * Created by msi on 2016/12/18.
 */
"use strict";

/**
 *Upload Picture
 */
function Upload_Picture() {
    console.log('picture');
    var files_input=document.getElementById("files_input");
    var output_file_list=document.getElementById('output_file_list');
    var canvas0=document.getElementById('canvas0');
    var ctx=canvas0.getContext("2d");

    //Get clothes url
    var dataURL=canvas0.toDataURL('image/png');
    var picturelist=[];
    //Check API work
    if(!window.File){
        throw new Error('No file API support');
    }
    //Upload picture
    files_input.addEventListener('change',function(){
        //clear list
        var pnode= document.getElementById("output_file_list");
        var childs=pnode.childNodes;
        for(var i=childs.length-1;i>=0;i--){
            pnode.removeChild(childs.item(i));
        }
        //Get img and remove button
        for (var i = 0; i < this.files.length ; i++) {
            var file = this.files[i]; // simgle file description
            if (img_is_valid(file)) {
                //Create li div remove submit canvas image
                var new_li = document.createElement('li');
                var new_div = document.createElement('div');
                var new_remove = document.createElement('button');
                var new_select=document.createElement('button');
                var new_select_submit=document.createElement('button');
                var new_submit=document.createElement('button');
                var new_canvas = document.createElement('canvas');
                new_canvas.id = 'canvas_'+i;
                var new_image = new Image;
                var sel;
                var cnv;
                //put canvas into list[]
                picturelist[i]=new_canvas;
                //button innerHTML
                new_remove.innerHTML="Remove";
                new_submit.innerHTML="Submit";
                new_select.innerHTML="Select";
                new_select_submit.innerHTML="Select Submit";
                //appending li to ul,div to li
                output_file_list.appendChild(new_li);
                new_li.appendChild(new_div);
                // appending canvas, remove ,submit to div
                new_div.appendChild(new_canvas);
                new_div.appendChild(new_remove);
                new_div.appendChild(new_select);
                new_div.appendChild(new_submit);
                new_div.appendChild(new_select_submit);
                //button Style
                button_style(new_remove);
                button_hover(new_remove);
                button_style(new_select);
                button_hover(new_select);
                button_style(new_submit);
                button_hover(new_submit);
                button_style(new_select_submit);
                button_hover(new_select_submit);
                $(new_select_submit).css("display","none");
                // Start image load by calling any of the two read_and_draw function
                read_and_filereader(file,new_image);

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
                //Select a part of picture
                new_select.addEventListener('click',function () {
                    var div=new_div;
                    var canvas=new_canvas;
                    var button=new_select_submit;
                    return function () {
                        $(button).css("display","inline-block");
                        cnv=new Canvas_data(canvas.id);
                        sel=new Lasso(cnv.elem);
                        cnv.ctx.strokeStyle = '#777';
                        cnv.ctx.lineWidth = sel.lineWidth;
                        if (sel.MODE_OFF == sel.mode) {
                            sel.mode = sel.MODE_DISPLAYING;
                            sel.draw();
                        } else {
                            sel.mode = sel.MODE_OFF;
                            sel.clear();
                        }

                    }

                }(),false);
                //Select submit
                new_select_submit.addEventListener('click',function () {
                    var copyCanvas = document.createElement('canvas');
                    copyCanvas.width = sel.backupData.width;
                    copyCanvas.height = sel.backupData.height;
                    copyCanvas.getContext('2d').putImageData(sel.backupData, 0, 0);
                    var image=new Image;
                    var clothes=new Image;
                    clothes.src=dataURL;
                    image.src=copyCanvas.toDataURL("image/png");
                    ctx.clearRect(0,0,canvas0.width,canvas0.height);
                    ctx.drawImage(clothes,0,0);
                    ctx.drawImage(image,110,150,120,150);
                });
                //Submit picture to Canvas0
                new_submit.addEventListener('click',function () {
                    var canvas=new_canvas;
                    var url=dataURL;
                    return function () {
                        putinto_clothes(canvas,url);
                    }
                }());

            }else{
                alert("Error!The file is not img.(If your file is img, we just provide .png, .jpg, .jpeg and .bmp)");
            }
        }

    });
    
    function selectsubmit(div,sel) {
        var new_select_submit=document.createElement('button');
        new_select_submit.innerHTML="Select Submit";
        div.appendChild(new_select_submit);
        new_select_submit.addEventListener('click', function () {
            var copyCanvas = document.createElement('canvas');
            copyCanvas.width = sel.imgData.width;
            copyCanvas.height = sel.imgData.height;
            copyCanvas.getContext('2d').putImageData(sel.imgData, 0, 0);
            var select=new Image;
            select.src=copyCanvas.toDataURL("image/png");

            var canvas0=document.getElementById('canvas0');
            var ctx=canvas0.getContext('2d');
            ctx.drawImage(select,0,0);
        }, false);
    }
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

        var ctx = canvas.getContext('2d');
        // Drawing
        ctx.drawImage(image, 0 ,0,canvas.width,canvas.height);
    }

    /**
     * Button Style
     * @param button
     */
    function button_style(button) {
        $(button).css({
            "color": "black",
            "margin-right":5+"px",
            "margin-bottom":5+"px"
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
        ctx.clearRect(0,0,canvas0.width,canvas0.height);
        //return before submit
        return_img.src=src;
        ctx.drawImage(return_img,0,0);
    }
    /**
     *Lasso
     */
    function Lasso_picture(canvas) {
        //Lasso
        console.log("canvas",canvas);

    }
    /**
     * Submit button
     * Put picture into Canvas0
     */
    function putinto_clothes(canvas,url) {

       var dataURL=canvas.toDataURL('image/png');
       var Img=new Image;
       Img.src=dataURL;
        var clothes=new Image;
        clothes.src=url;
       var canvas0=document.getElementById('canvas0');
       var ctx=canvas0.getContext('2d');
        ctx.clearRect(0,0,canvas0.width,canvas0.height);
       ctx.drawImage(clothes,0,0);
       ctx.drawImage(Img,110,150,120,150);
    }



}