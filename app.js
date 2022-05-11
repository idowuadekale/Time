//window EventListener
window.addEventListener("DOMContentLoaded", function(e) {
    console.log("The page is loaded.");
});


function myFunction() {
    alert("You are going to Idowu Adekale Github");
}

var myVar = setInterval(myTimer, 1000);

function myTimer() {
    var d = new Date();
    document.getElementById("link").innerHTML = d.toLocaleTimeString();
}

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var radius = canvas.height / 2;
ctx.translate(radius, radius);
radius = radius * 0.90
setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
}

function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();
    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#aaa');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#aaa');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#000';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    var ang;
    var num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for (num = 1; num < 13; num++) {
        ang = num * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.85);
        ctx.rotate(-ang);
        ctx.fillText(num.toString(), 0, 0);
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.85);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
        (minute * Math.PI / (6 * 60)) +
        (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    //minute
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    // second
    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
}

function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
}

//Beginning of the code to create a cursor in a circle 

let mouseX = 0;
let mouseY = 0;
let posX = 0;
let posY = 0;
let alpha = 1;

const circle = document.querySelector(".circle");

addEventListener("mousemove", ({ clientX, clientY }) => {
    mouseX = clientX;
    mouseY = clientY;
    // arbitrary high value so that it takes a moment until it actually fades out.
    alpha = 5;
});

let prev = 0;
requestAnimationFrame(function render(now) {
    requestAnimationFrame(render);

    // expecting a 16ms frame interval, 
    // check how the current update interval compared to that
    const factor = (now - prev) / 16;
    prev = now;

    // how quickly to follow the cursor
    const speed = .125;

    // adjusted for differences in update interval.
    posX += factor * speed * (mouseX - posX);
    posY += factor * speed * (mouseY - posY);
    // fade out
    alpha *= Math.pow(.95, factor);

    circle.style.transform = `translate(${posX}px, ${posY}px)`;

    let opacity = Math.min(1, alpha);

    // round the value to closest 1/255 step
    // opacity ain't more precise and that way we don't set 
    // "new values" that compute to the same opacity.
    circle.style.opacity = Math.round(opacity * 255) / 255;
});

//Ending of the code to create a cursor in a circle