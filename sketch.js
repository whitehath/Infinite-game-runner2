
var player;
var obs;
var obstacle;

var score = 0;
var scoreIncrease = 0;

var gameState = "play";

var backgroundImg;
var playerBirdImg;
var birdImg;
var dogImg;

var cameraX, cameraY;

var cameraSpeedIncrease = 5;

var playerX, playerY;

var leftside, rightside;

function preload(){
    backgroundImg = loadImage("background.png");
    playerBirdImg = loadImage("playerBird.png");
    birdImg = loadImage("bird.png");
    dogImg = loadImage("dog.png");
}

function setup(){
    createCanvas(1400, 800);

    player = createSprite(500, 400, 15, 15);
    obs = new Group();
}

function draw(){
    backgroundImg.resize(1400, 800);
    background(backgroundImg);

    frameRate(60);

    if(gameState === "play"){
    
    camera.position.x += cameraSpeedIncrease;

    cameraX = camera.position.x;
    cameraY = camera.position.y;
    
    playerX = player.position.x;
    playerY = player.position.y;

    playerBirdImg.resize(110, 110);
    player.addImage(playerBirdImg);
    player.setCollider("circle", 0, 0, 45);
    player.debug = true;

    player.position.x = cameraX;
    
    score += scoreIncrease;
    
    if(frameCount % 240 === 0){
        scoreIncrease += 1;
        cameraSpeedIncrease += .5;
    }
    
    push();
    textSize(18);
    text("Score: " + score, cameraX - displayWidth / 4, cameraY - displayWidth / 6);
    pop();

    if(keyIsDown(UP_ARROW)){
        player.position.y -= 5;     
    }
    if(keyIsDown(DOWN_ARROW)){
        player.position.y += 5;   
    }
    leftside = cameraX - 700;
    rightside = cameraX + 700;

    if(frameCount % 25 === 0){
        obstacle = createSprite(random(rightside, rightside + 100), random(0, 800), 10, 10);
        obstacle.life = 275;
        birdImg.resize(50, 50);
        if(obstacle.position.y <= 600){
        obstacle.addImage(birdImg);
        obstacle.setCollider("circle", 0, 0, 20);
        }else if(obstacle.position.y > 600){
            obstacle.addImage(dogImg);
            obstacle.setCollider("rectangle", 0, 0, 140, 90);
        }
        obstacle.addToGroup(obs);
    }
    }
    if(player.overlap(obs)){
        gameState = "end";
    }
    if(gameState === "end"){
        obs.removeSprites();
        player.remove();
        push();
            textAlign(CENTER, CENTER);
            textSize(60);
            fill(255);
            text("GAME OVER", camera.position.x, camera.position.y);
        pop();

        push();
            textSize(36);
            fill(255);
            text("Score: " + score,camera.position.x - 80, camera.position.y + 50);
        pop();
    }
    drawSprites();
}

 