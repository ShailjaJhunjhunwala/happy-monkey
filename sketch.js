var backgroundImage,ground;
var player, player_running;
var invisibleGround,ground_img;

var FoodGroup, bananaImage;
var obstaclesGroup, obstacle_img;

var gameOver;
var score=0;
var gameState,


function preload(){
  backgroundImage=loadImage("jungle2.jpg");
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png",
  "Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  

  bananaImage = loadImage("Banana.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  var PLAY = 0
  var END = 1
  var gameState = PLAY

  ground=createSprite(0,0,800,400);
  ground.addImage(backgroundImage);
  ground.scale=1.5;
  //ground.x=background.width/2;
  ground.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.1;
  
  invisibleGround = createSprite(400,350,800,10);
  invisibleGround.visible=false;
  
  FoodGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
}

function draw() {
  
  background(255);
  
    if(gameState === PLAY){
      if(ground.x<0) {
        ground.x=ground.width/2;
      }
      if(ground.x<100){
        ground.x=ground.width/2;
      }
      spawnFood();
      spawnObstacles();
      if(FoodGroup.isTouching(player)){
        FoodGroup.destroyEach();
      score = score + 2;
      }
      switch(score){
          case 10: player.scale=0.12;
                  break;
          case 20: player.scale=0.14;
                  break;
          case 30: player.scale=0.16;
                  break;
          case 40: player.scale=0.18;
                  break;
          default: break;
      }
      if(keyDown("space") ) {
        player.velocityY = -12;
      }
      if(obstaclesGroup.isTouching(player)){ 
        score=score-2;
        gameState = END
      }
    }
    if(gameState === END){
      
      ground.velocityX = 0
      FoodGroup.setVelocityXEach(0)
      obstaclesGroup.setVelocityXEach(0)
    }

    player.velocityY = player.velocityY + 0.8;

    player.collide(invisibleGround);
   
  
   
 
    
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: "+ score, 500,50);
}

function spawnFood() {
  if (frameCount % 80 === 0) {
    var banana = createSprite(600,250,40,10);
    banana.y = random(120,200);    
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 300;
    player.depth = banana.depth + 1;
    FoodGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);    
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    obstaclesGroup.add(obstacle);
  }
}


  
