//Step 1 : Get the canvas element
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");
ctx.translate(100, 0)
// Load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
let gameOver = new Image();

// src for images
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// variables
// gap between pipes
let gap = 100;
let constant;

//colusion
let bX = 10;
let bY = 150;

let gravity = 1.5;

// initial score
let score = 0;

// audio files

let fly = new Audio();
let scor = new Audio();

fly.src = "sounds/fly.mp3";
scor.src = "sounds/score.mp3";

// on KeyDown

document.addEventListener("keydown", moveUp);
// gravity
function moveUp() {
    bY -= 35;
    fly.play();
}

// pipe coordinates
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
};

// drawing images
function draw() {
    //frameId = window.requestAnimationFrame(draw);

    //1.draw background
    ctx.drawImage(bg, 0, 0);
    //  to drwa all pipes
    for (let i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        // draw pipes
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        // to move pipes to the left
        pipe[i].x--;
        // to create new pipes
        if (pipe[i].x == 105) {
            // adding new pipes into empty arr
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        // detect collision

        if (bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
            && (bY <= pipe[i].y + pipeNorth.height
                || bY + bird.height >= pipe[i].y + constant)
            || bY + bird.height >= cvs.height - fg.height) {
            // // reload the page
            console.log("Game Over")
            window.cancelAnimationFrame(frameId);

        }

        if (pipe[i].x == 5) {
            score++;
            scor.play();


        }

    }
    //    draw ground
    ctx.drawImage(fg, 0, cvs.height - fg.height);
    // draw bird

    ctx.drawImage(bird, bX, bY);
    // incremented my the gravity
    bY += gravity;

    ctx.fillStyle = "red";
    ctx.font = "20px Oswald bold";
    ctx.fillText("Score : " + score, 10, cvs.height - 50);

    //requestAnimationFrame(draw);
    let frameId = requestAnimationFrame(draw)
    // 

}

draw();
























