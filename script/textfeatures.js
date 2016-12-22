/**
 * Created by sabdelat on 2016-12-17.
 */
'use strict';
function loadCTextFeatures() {
    $("#colors_sketch").css("zIndex","100");
    $("#canvas1").css("zIndex","200");
    $("#canvas2").css("zIndex","500");
    console.log('text.js loaded');
        /*drag and drop text*/
        // canvas related variables
        var canvas = document.getElementById("canvas2");
        var ctx = canvas.getContext("2d");

        // variables used to get mouse position on the canvas
        var $canvas = $("#canvas2");
        var canvasOffset = $canvas.offset();
        var offsetX = canvasOffset.left;
        var offsetY = canvasOffset.top;
        var scrollX = $canvas.scrollLeft();
        var scrollY = $canvas.scrollTop();

        // variables to save last mouse position
        // used to see how far the user dragged the mouse
        // and then move the text by that distance
        var startX;
        var startY;

        // an array to hold text objects
        var texts = [];

        // this var will hold the index of the hit-selected text
        var selectedText = -1;

        // clear the canvas & redraw all texts
        function draw() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (var i = 0; i < texts.length; i++) {
                var text = texts[i];
                ctx.fillText(text.text, text.x, text.y);
            }
        }

        // test if x,y is inside the bounding box of texts[textIndex]
        function textHittest(x, y, textIndex) {
            var text = texts[textIndex];
            return (x >= text.x && x <= text.x + text.width && y >= text.y - text.height && y <= text.y);
        }

        // handle mousedown events
        // iterate through texts[] and see if the user
        // mousedown'ed on one of them
        // If yes, set the selectedText to the index of that text
        function handleMouseDown(e) {
            e.preventDefault();
            startX = parseInt(e.clientX - offsetX);
            startY = parseInt(e.clientY - offsetY);
            // Put your mousedown stuff here
            for (var i = 0; i < texts.length; i++) {
                //if (textHittest(startX, startY, i)) {
                selectedText = i;
                //}
            }
        }

        // done dragging
        function handleMouseUp(e) {
            e.preventDefault();
            selectedText = -1;
        }

        // also done dragging
        function handleMouseOut(e) {
            e.preventDefault();
            selectedText = -1;
        }

        // handle mousemove events
        // calc how far the mouse has been dragged since
        // the last mousemove event and move the selected text
        // by that distance
        function handleMouseMove(e) {
            if (selectedText < 0) {
                return;
            }
            var mouseX = parseInt(e.clientX - offsetX);
            var mouseY = parseInt(e.clientY - offsetY);

            // Put your mousemove stuff here
            var dx = mouseX - startX;
            var dy = mouseY - startY;
            startX = mouseX;
            startY = mouseY;


            var text = texts[selectedText];
            text.x += dx;
            text.y += dy;
            draw();

        }

        // listen for mouse events
        $("#canvas2").mousedown(function (e) {
            handleMouseDown(e);
        });
        $("#canvas2").mousemove(function (e) {
            handleMouseMove(e);
        });
        $("#canvas2").mouseup(function (e) {
            handleMouseUp(e);
        });
        $("#canvas2 ").mouseout(function (e) {
            handleMouseOut(e);
        });

        $("#textPreviewBtn").click(function () {
            // calc the y coordinate for this text on the canvas
            var y = texts.length * 20 + 20;

            // get the text from the input element
            var text = {
                text: $("#theText").val(),
                x: 20,
                y: y
            };


            ctx.font = document.getElementById('sel2').value + "px " + document.getElementById('sel1').value;
            console.log(document.getElementById('sel2').value + "px " + document.getElementById('sel1').value);
            ctx.fillStyle = document.getElementById("myColor").value;
            console.log(ctx.fillStyle);
            text.width = ctx.measureText(text.text).width;
            text.height = 16;

            // put this new text in the texts array
            texts.push(text);

            // redraw everything
            draw();

        });

        document.getElementById('texttrash').addEventListener('click', function(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        });
}