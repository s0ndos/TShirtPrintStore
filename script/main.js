/**
 * Created by zchen on 2016-12-13.
 */
"use strict";

/* Change the numbers to adjust your resize ratio */
function reSize() {
    var n = $("body").width() / 15;
    $("h1").css('fontSize', n + "pt");
    $("h3").css('fontSize', (n/20) * 4.2 + "pt");
}
$(window).on("resize", reSize);
$(document).ready(reSize);

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');  ga('create', 'UA-70761127-6', 'auto');  ga('send', 'pageview');

$(document).ready(function() {
    $("div.bhoechie-tab-menu>div.list-group>a").click(function(e) {
        e.preventDefault();
        $(this).siblings('a.active').removeClass("active");
        $(this).addClass("active");
        var index = $(this).index();
        $("div.bhoechie-tab>div.bhoechie-tab-content").removeClass("active");
        $("div.bhoechie-tab>div.bhoechie-tab-content").eq(index).addClass("active");
    });

    $("#camera").click(function () {
        $(".p_video").css("display","block");

        var video = document.getElementById("video");
        var btn = document.getElementById("snap");
        var canvas = document.getElementById("picture");
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

        btn.addEventListener("click", function () {
            $(".p2_video").css("display","block");
            console.log(video.width, video.height);
            canvas.getContext('2d').drawImage(video, 0, 0, video.width, video.height);
            var dataURL = canvas.toDataURL('image/png');//Creating a dataUrl with type image/png
            download.href=dataURL;

        });
    });
});




