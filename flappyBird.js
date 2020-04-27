//Step 1 : Get the canvas element
let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Load images

let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeNorth = new Image();
let pipeSouth = new Image();
let gameOver = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/pipeNorth.png";
pipeSouth.src = "images/pipeSouth.png";

// variables
// gap between pipes
let gap = 85;
let constant;

//colusion
let bX = 10;
let bY = 150;

let gravity = 1.5;

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


    ctx.drawImage(bg, 0, 0);

    for (let i = 0; i < pipe.length; i++) {

        constant = pipeNorth.height + gap;
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + constant);
        // to move pipes
        pipe[i].x--;
        // to create new pipes
        if (pipe[i].x == 105) {
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

    ctx.drawImage(fg, 0, cvs.height - fg.height);

    ctx.drawImage(bird, bX, bY);

    bY += gravity;

    ctx.fillStyle = "red";
    ctx.font = "20px Oswald bold";
    ctx.fillText("Score : " + score, 10, cvs.height - 50);

    requestAnimationFrame(draw);
    // 

}

draw();
























