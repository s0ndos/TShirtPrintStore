/**
 * Created by sabdelat on 2016-12-19.
 */
'use strict';
function loadClipartFeatures() {
    console.log("Clipart loaded");
        var canvas = document.getElementById("canvas1");
        var ctx = canvas.getContext("2d");

        var canvasOffset = $("#canvas1").offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;

        var startX_;
        var startY_;
        var isDown = false;
        var name;


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
        var startX_;
        var startY_;


        var img = new Image();
        img.onload = function () {
            imageWidth = img.width;
            imageHeight = img.height;
            imageRight = imageX + imageWidth;
            imageBottom = imageY + imageHeight
            draw(true, false);
        }

        img.src = "";

        document.getElementById('circle_ca').addEventListener('click', function () {
            img.src = this.src

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


        function draw(withAnchors, withBorders) {

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
            // alert('testhitimage');
            return (x > imageX && x < imageX + imageWidth && y > imageY && y < imageY + imageHeight);
        }


        function handleMouseDown(e) {
            // alert('testmousedown');
            startX_ = parseInt(e.clientX - offsetX);
            startY_ = parseInt(e.clientY - offsetY);
            draggingResizer = anchorHitTest(startX_, startY_);
            draggingImage = draggingResizer < 0 && hitImage(startX_, startY_);
        }

        function handleMouseUp(e) {
            draggingResizer = -1;
            draggingImage = false;
            draw(true, false);
        }

        function handleMouseOut(e) {
            handleMouseUp(e);
        }

        function handleMouseMove(e) {
            console.log(draggingResizer);
            if (draggingResizer > -1) {
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

                if (imageWidth < 25) {
                    imageWidth = 25;
                }
                if (imageHeight < 25) {
                    imageHeight = 25;
                }

                // set the image right and bottom
                imageRight = imageX + imageWidth;
                imageBottom = imageY + imageHeight;

                // redraw the image with resizing anchors
                draw(true, true);

            } else if (draggingImage) {

                var imageClick = false;

                mouseX = parseInt(e.clientX - offsetX);
                mouseY = parseInt(e.clientY - offsetY);

                // move the image by the amount of the latest drag
                var dx = mouseX - startX_;
                var dy = mouseY - startY_;
                imageX += dx;
                imageY += dy;
                imageRight += dx;
                imageBottom += dy;
                // reset the startX_Y for next time
                startX_ = mouseX;
                startY_ = mouseY;

                // redraw the image with border
                draw(false, true);

            }


        }

        $("#canvas1").mousedown(function (e) {
            handleMouseDown(e);
        });
        $("#canvas1").mousemove(function (e) {
            handleMouseMove(e);
        });
        $("#canvas1").mouseup(function (e) {
            handleMouseUp(e);
        });
        $("#canvas1").mouseout(function (e) {
            handleMouseOut(e);
        });

}