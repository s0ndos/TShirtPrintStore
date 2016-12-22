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

});

document.getElementById("cameratab").addEventListener("click",Take_Photo);
document.getElementById("picturetab").addEventListener("click",Upload_Picture);

// $("#clipartTab").click(loadClipartFeatures());
//
// $("#textTab").click(loadCTextFeatures());
document.getElementById("clipartTab").addEventListener("click",loadClipartFeatures);
document.getElementById("textTab").addEventListener("click",loadCTextFeatures);
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
        cnv.width=img.width;
        cnv.height=img.height;
        console.log(cnv.height,img.height);
        cnv.ctx.drawImage(img,0,0);
    });
}




