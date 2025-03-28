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

let rocket = {
    x : rocketX,
    y : rocketY,
    width : rocketWidth,
    height : rocketHeight
}

//asteroids
//asteroids
let asteroidArray = [];
let asteroid1Width = 70;
let asteroid1Height = 74;
let asteroid1X = boardWidth;
//let asteroidY = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
let asteroid1Y = 0;


let asteroid2Width =70.4;
let asteroid2Height = 67.2;
let asteroid2X = boardWidth;
//let asteroidY = Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
let asteroid2Y = 0;

let asteroid1Img;
let asteroid2Img;

//physics
let keyPressed = false;
let clickPressed = false;
let touchPressed = false;

let velocityX = -3;
let velocityY = 0;
let gravity = .2;

//stats
let gameOver = false;
let score = 0;

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

    //asteroids
    asteroid1Img = new Image();
    asteroid1Img.src = "./assets/asteroid1.png";
    asteroid2Img = new Image();
    asteroid2Img.src = "./assets/asteroid2.png";

    requestAnimationFrame(update);
    setInterval(placeAsteroids, 800);

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


    //asteroids
    for (let i = 0; i < asteroidArray.length; i++){
        let asteroid = asteroidArray[i];
        asteroid.x += velocityX;
        context.drawImage(asteroid.img, asteroid.x, asteroid.y, asteroid.width, asteroid.height);

        if (!asteroid.passed && rocket.x > asteroid.x + asteroid.width){
            score += .5;
            asteroid.passed = true;
        }
    }


    //clear asteroids
    while (asteroidArray.length > 0 && asteroidArray[0].x < -asteroidWidth){
        asteroidArray.shift();
    }

}

function placeAsteroids(){
    if (gameOver){
        return;
    }

    let asteroidRandom = Math.random();

    if (asteroidRandom < .5){
        let randomAsteroid1Y = Math.floor(Math.random() * (boardHeight-asteroid1Height));
        

        let asteroid = {
            img : asteroid1Img,
            x : asteroid1X,
            y : randomAsteroid1Y,
            width : asteroid1Width,
            height : asteroid1Height,
            passed : false
        }
    
        asteroidArray.push(asteroid);
    }

    else{
        let randomAsteroid2Y = Math.floor(Math.random() * (boardHeight-asteroid2Height));

        let asteroid = {
            img : asteroid2Img,
            x : asteroid2X,
            y : randomAsteroid2Y,
            width : asteroid2Width,
            height : asteroid2Height,
            passed : false
        }
    
        asteroidArray.push(asteroid);
    }
}