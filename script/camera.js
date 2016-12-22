/**
 * Created by msi on 2016/12/18.
 */
"use strict";
/**
 *Take Photo
 */
function Take_Photo() {
    console.log('Function take_photo');

    var video = document.getElementById("video");
    var snap = document.getElementById("snap");
    var canvas = document.getElementById("photo");
    var download=document.getElementById("download");
    var submit = document.getElementById("v_submit");
    var remove=document.getElementById("v_remove");
    var select=document.getElementById("v_select");
    var s_submit=document.getElementById("v_s_submit");

    //Lasso element
    var cnv=new Canvas_data("photo");
    var sel =new Lasso(cnv.elem);
    cnv.ctx.strokeStyle='#777';
    cnv.ctx.lineWidth=sel.lineWidth;
    //Main Canvas
    var canvas0=document.getElementById("canvas0");
    var ctx=canvas0.getContext('2d');
    var clothes=new Image;
    clothes.src=canvas0.toDataURL("image/png");
    //Set button style
    button_style(snap);
    button_style(submit);
    button_style(remove);
    button_style(download);
    button_style(s_submit);
    button_style(select);
    //Set button hover style
    button_hover(snap);
    button_hover(submit);
    button_hover(remove);
    button_hover(download);
    button_style(select);
    button_style(s_submit);
    navigator.getMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;
    if (!navigator.getMedia) {
        throw new Error('No camera API support(GetUserMedia).Try update.');
    }

    video.addEventListener('canplay', function (eV) {
        console.log('Canplay event');
        video.width = 335;
        video.height = 251.25;
        //Later,for snapshot when will use canvas with the right size
        canvas.width =video.width;
        canvas.height =video.height;
    });
    navigator.getMedia(
        {
            //First parameter are the media options you want
            video: true/*,
         audio:true*/
        },
        //Second parameter
        function (stream) {
            var vendorURL = window.URL || window.webkitURL;
            //Linking the video player to a local stream URL
            video.src = vendorURL.createObjectURL(stream);
            video.play();//Plays the video
        },
        function (error) {
            console.log('Error loading camera stream');
        }
    );
    //Get Photo
    snap.addEventListener("click", function () {
        $(".p2_video").css("display","inline-block");
        console.log(video.width, video.height);
        canvas.getContext('2d').drawImage(video, 0, 0, video.width, video.height);
        var dataURL = canvas.toDataURL('image/png');//Creating a dataUrl with type image/png
        //Get Photo URL
        download.href=dataURL;

    });
    //Put video to Canvas0
    submit.addEventListener("click",function () {
        var dataURL = canvas.toDataURL('image/png');
        var image=new Image;
        ctx.clearRect(0,0,canvas0.width,canvas0.height);
        image.src=dataURL;
        ctx.drawImage(clothes,0,0);
        ctx.drawImage(image,120,180,100,120);

    });
    //Remove video image
    remove.addEventListener("click",function () {
        ctx.clearRect(0,0,canvas0.width,canvas0.height);
        ctx.drawImage(clothes,0,0);
    });
    //Select
    select.addEventListener("click",function () {
        if (sel.MODE_OFF == sel.mode) {
            sel.mode = sel.MODE_DISPLAYING;
            sel.draw();
        } else {
            sel.mode = sel.MODE_OFF;
            sel.clear();
        }
    },false);
    
    s_submit.addEventListener('click',function () {
        var copyCanvas = document.createElement('canvas');
        console.log(sel.backupData);
        copyCanvas.width = sel.backupData.width;
        copyCanvas.height = sel.backupData.height;
        copyCanvas.getContext('2d').putImageData(sel.backupData, 0, 0);

        var image=new Image;
        image.src=copyCanvas.toDataURL("image/png");
        ctx.drawImage(image,110,150,120,150);
    },false);
    //button style
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


}