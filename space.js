//board
let board;
let boardWidth = 360;
let boardHeight = 640;
let context;

//rocket
let rocketWidth = 34*2;
let rocketHeight = 24*2;
let rocketX = boardWidth/20;
let rocketY = (boardHeight - rocketHeight)/2;
let rocketImg;

//physics
let keyPressed = false;
let clickPressed = false;
let touchPressed = false;

let velocityY = 0;
let gravity = .2;

let rocket = {
    x : rocketX,
    y : rocketY,
    width : rocketWidth,
    height : rocketHeight
}

//stats
let gameOver = false

window.onload = function() {
    //context
    board = document.getElementById("board");
    board.height = boardHeight;
    board.width = boardWidth;
    context = board.getContext("2d");

    //rocket
    rocketImg = new Image();
    rocketImg.src = "./assets/rocket.png"
    rocketImg.onload = function() {
        context.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);
    }

    requestAnimationFrame(update);

    document.addEventListener("keydown", function(e){
        keyPressed = true;
    });
    document.addEventListener("keyup", function(e){
        keyPressed = false;
    });

    document.addEventListener("mousedown", function(e){
        clickPressed = true;
    });
    document.addEventListener("mouseup", function(e){
        clickPressed = false;
    });

    document.addEventListener("touchstart", function(e){
        touchPressed = true;
    });
    document.addEventListener("touchend", function(e){
        e.preventDefault();
        touchPressed = false;
    });

    
}

function update(){
    requestAnimationFrame(update);

    context.clearRect(0, 0, board.width, board.height);

    //rocket
    if(!(keyPressed || clickPressed || touchPressed)){
        velocityY += gravity;
        velocityY = Math.min(10, velocityY)
    }
    else{
        velocityY -= .5;
        velocityY = Math.max(-10, velocityY);
    }

    rocket.y += velocityY;

    if (rocket.y < 0){
        rocket.y = 0;
        velocityY = 0;
    }

    context.drawImage(rocketImg, rocket.x, rocket.y, rocket.width, rocket.height);

}