/**
 * Created by msi on 2016/12/18.
 */
"use strict";
/**
 *Take Photo
 */
function Take_Photo() {
    var video = document.getElementById("video");
    var btn = document.getElementById("snap");
    var canvas = document.getElementById("photo");
    var download=document.getElementById("download");
    navigator.getMedia = navigator.getUserMedia
        || navigator.webkitGetUserMedia
        || navigator.mozGetUserMedia
        || navigator.msGetUserMedia;
    if (!navigator.getMedia) {
        throw new Error('No camera API support(GetUserMedia).Try update.');
    }

    video.addEventListener('canplay', function (eV) {
        console.log('Canplay event');
        video.width = 200;
        video.height = 150;
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
    btn.addEventListener("click", function () {
        $(".p2_video").css("display","block");
        console.log(video.width, video.height);
        canvas.getContext('2d').drawImage(video, 0, 0, video.width, video.height);
        var dataURL = canvas.toDataURL('image/png');//Creating a dataUrl with type image/png
        //Get Photo URL
        download.href=dataURL;

    });
}