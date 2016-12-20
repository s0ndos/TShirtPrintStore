/**
 * Created by sabdelat on 2016-12-19.
 */
'use strict';
function loadClipartFeatures() {
    $("#canvas1").css("zIndex","500");
    $("#canvas2").css("zIndex","200");
    console.log("Clipart loaded");
    var canvas = document.getElementById("canvas1");
    var ctx = canvas.getContext("2d");

    var canvasOffset = $("#canvas1").offset();
    console.log(canvasOffset);
    var offsetX = canvasOffset.left;
    var headerHeight = $('header').height();
    var navHeight = $('nav').height();
    var offsetY = canvasOffset.top - headerHeight - navHeight;
    console.log('offsetY', offsetY);
    var start_X;
    var start_Y;
    var is_Down = false;
    //var name;


    var pi2 = Math.PI * 2;
    var resizerRadius = 8;
    var rr = resizerRadius * resizerRadius;
    var draggingResizer = {
        x: 0,
        y: 0
    };
    var imageX = 50;
    var imageY = 50;
    var imageWidth, imageHeight, imageRight, imageBottom;
    var draggingImage = false;
    var start_X;
    var start_Y;


    //here
    var img = new Image();
    img.onload = function () {
        imageWidth = img.width;
        imageHeight = img.height;
        imageRight = imageX + imageWidth;
        imageBottom = imageY + imageHeight
        draw_(true, false);
    }

            img.src = "";

        document.getElementById('circle_ca').addEventListener('click', function () {
            img.src = this.src
            document.getElementById('redButton').addEventListener('click', function(){
                alert('clicked');

            });
        });

        document.getElementById('square_ca').addEventListener('click', function () {
            img.src = this.src

        });

        document.getElementById('star_ca').addEventListener('click', function () {
            img.src = this.src
        });

        document.getElementById('triangle_ca').addEventListener('click', function () {
            img.src = this.src
        });

        document.getElementById('oval_ca').addEventListener('click', function () {
            img.src = this.src
        });

        document.getElementById('chatbox_ca').addEventListener('click', function () {
            img.src = this.src
        });


    function draw_(withAnchors, withBorders) {

        // clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw the image
        ctx.drawImage(img, 0, 0, img.width, img.height, imageX, imageY, imageWidth, imageHeight);

        // optionally draw the draggable anchors
        if (withAnchors) {
            drawDragAnchor(imageX, imageY);
            drawDragAnchor(imageRight, imageY);
            drawDragAnchor(imageRight, imageBottom);
            drawDragAnchor(imageX, imageBottom);
        }

        // optionally draw the connecting anchor lines
        if (withBorders) {
            ctx.beginPath();
            ctx.moveTo(imageX, imageY);
            ctx.lineTo(imageRight, imageY);
            ctx.lineTo(imageRight, imageBottom);
            ctx.lineTo(imageX, imageBottom);
            ctx.closePath();
            ctx.stroke();
        }

    }

    function drawDragAnchor(x, y) {
        ctx.beginPath();
        ctx.arc(x, y, resizerRadius, 0, pi2, false);
        ctx.closePath();
        ctx.fill();
    }

    function anchorHitTest(x, y) {

        var dx, dy;

        // top-left
        dx = x - imageX;
        dy = y - imageY;
        if (dx * dx + dy * dy <= rr) {
            return (0);
        }
        // top-right
        dx = x - imageRight;
        dy = y - imageY;
        if (dx * dx + dy * dy <= rr) {
            return (1);
        }
        // bottom-right
        dx = x - imageRight;
        dy = y - imageBottom;
        if (dx * dx + dy * dy <= rr) {
            return (2);
        }
        // bottom-left
        dx = x - imageX;
        dy = y - imageBottom;
        if (dx * dx + dy * dy <= rr) {
            return (3);
        }
        return (-1);

    }


    function hitImage(x, y) {
         //console.log('imageY',imageY);
           //console.log('y',y);
        console.log('result: ', x > imageX && x < imageX + imageWidth && y > imageY && y < imageY + imageHeight);
        return (x > imageX && x < imageX + imageWidth && y > imageY && y < imageY + imageHeight);
    }


    function handle_MouseDown(e) {
        start_X = parseInt(e. clientX- offsetX);
        start_Y = parseInt(e.clientY - offsetY);
        //console.log("clientY",e.clientY);
        //console.log('offsetY', offsetY);
        draggingResizer = anchorHitTest(start_X, start_Y);
        //console.log(draggingResizer);
        draggingImage = draggingResizer < 0 && hitImage(start_X, start_Y);
        //console.log(hitImage(start_X, start_Y));
        //console.log(draggingImage);
    }

    function handle_MouseUp(e) {
        draggingResizer = -1;
        draggingImage = false;
        draw_(true, false);
    }

    function handle_MouseOut(e) {
        handle_MouseUp(e);
    }

    function handle_MouseMove(e) {
        //console.log(draggingResizer);
        if (draggingResizer > -1) {
            //console.log(draggingResizer > -1);
            var mouseX = parseInt(e.clientX - offsetX);
            var mouseY = parseInt(e.clientY - offsetY);

            // resize the image
            switch (draggingResizer) {
                case 0:
                    //top-left
                    imageX = mouseX;
                    imageWidth = imageRight - mouseX;
                    imageY = mouseY;
                    imageHeight = imageBottom - mouseY;
                    break;
                case 1:
                    //top-right
                    imageY = mouseY;
                    imageWidth = mouseX - imageX;
                    imageHeight = imageBottom - mouseY;
                    break;
                case 2:
                    //bottom-right
                    imageWidth = mouseX - imageX;
                    imageHeight = mouseY - imageY;
                    break;
                case 3:
                    //bottom-left
                    imageX = mouseX;
                    imageWidth = imageRight - mouseX;
                    imageHeight = mouseY - imageY;
                    break;
            }

            if(imageWidth<25){imageWidth=25;}
            if(imageHeight<25){imageHeight=25;}

            // set the image right and bottom
            imageRight = imageX + imageWidth;
            imageBottom = imageY + imageHeight;

            // redraw the image with resizing anchors
            draw_(true, true);

        } else if (draggingImage) {

            var imageClick = false;

            mouseX = parseInt(e.clientX - offsetX);
            mouseY = parseInt(e.clientY - offsetY);

            // move the image by the amount of the latest drag
            var dx = mouseX - start_X;
            var dy = mouseY - start_Y;
            imageX += dx;
            imageY += dy;
            imageRight += dx;
            imageBottom += dy;
            // reset the start_XY for next time
            start_X = mouseX;
            start_Y = mouseY;

            // redraw the image with border
            draw_(false, true);

        }


    }

    $("#canvas1").mousedown(function (e) {
        handle_MouseDown(e);
    });
    $("#canvas1").mousemove(function (e) {
        handle_MouseMove(e);
    });
    $("#canvas1").mouseup(function (e) {
        handle_MouseUp(e);
    });
    $("#canvas1").mouseout(function (e) {
        handle_MouseOut(e);
    });

}