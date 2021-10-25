var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skybg, waterbg,shipimg, helicopterimg, bombimg,gameOverimg,sharkimg;
var water, ship,ship_moving, helicopter, bomb,shark;
var helicopterGroup, bombGroup,sharkGroup;
var score = 0;



function preload(){
  skybg = loadImage("skybg.jpg");
  waterbg = loadImage("waterbg.png");
  ship_moving= loadAnimation("ship.png","ship2.png");
  helicopterimg = loadImage("helicopter.png");
  bombimg = loadImage("bomb.png");
  gameOverimg = loadImage("gameOver.png");
  sharkimg = loadImage("shark.png");
}

function setup() {
  createCanvas(800, 450);
  
  //creating water ground
  water = createSprite(200,300,800,450);
  water.addImage(waterbg);
  

  //creating ship
  ship =  createSprite(50,200,20,20);
  ship.addAnimation("ship",ship_moving);
  
  //creating helicopter 

  helicopter = createSprite(600,100,50,70);
  helicopter.addImage(helicopterimg);
  helicopter.velocityX = -3;
  helicopter.scale = 0.4;

  // creating shark

  shark = createSprite(600,400,50,70);
  shark.addImage(sharkimg);
  shark.velocityX =- 4;
  shark.scale = 0.2;

  helicopterGroup = new Group();
  
  bombGroup = new Group();

  sharkGroup = new Group();

  gameOver = createSprite(300,300,10,10);
  gameOver.addImage(gameOverimg);

 

}

function draw() {
  background(skybg);
  fill("yellow")
  textSize(15);
  text("SURVIVAL TIME: "+ score, 600,30);

    
  //for infinite background 
  if(water.position.x < 300){
  water.position.x = 400;
  }
  
  //gameState play
  if(gameState === PLAY){

    ship.x = World.mouseX;
   
    gameOver.visible = false;
    //increase score
    score = score + Math.round(frameCount/300);
    
    //Call user defined function
    spawnBomb();
    spawnHelicopter();
    spwanShark();

    
    if(bombGroup.isTouching(ship)){
      ship.addImage(shipimg2);
        gameState = END;
    }
    
  }
  
  //gameState end
  else if(gameState === END){
  
   //water velocity becomes zero
   water.velocityX=0;

   ship.destroy();

   //destroy Helicopter group
   helicopterGroup.destroyEach();

   //destroy bomb group
    bombGroup.destroyEach();

  // destroy shark group
  sharkGroup.destroyEach();

    gameOver.visible = true;

  }
    
  drawSprites();
}


function spawnHelicopter(){
  if(frameCount%200 === 0){
    helicopter = createSprite(200,50);
    helicopter.addImage("helicopter",helicopterimg);

    helicopter.x = Math.round(random(40,800));
    helicopter.setVelocity(-7,0);
    
    helicopter.scale = 0.5;
    
    helicopterGroup.add(helicopter);
  
  }
}

function spawnBomb(){
 // create bombs at random position
 if(frameCount%200 === 0){
   var bomb = createSprite(Math.round(random(40,600),10,10));
   bomb.addImage(bombimg);
   bomb.scale = 0.1;
   bomb.setVelocity(0,7);
   bomb.lifetime = 200;
   bombGroup.add(bomb);

 }

}

function spwanShark(){
  // create shark at random position
  if(frameCount%200 === 0){
    var shark = createSprite(600,400);
    shark.addImage("shark",sharkimg);
    shark.scale = 0.2;
    shark.x = Math.round(random(600,800));
    shark.setVelocity(-5,0);

    shark.depth = ship.depth;
    ship.depth = ship.depth+1;
    shark.lifetime = 200;
    sharkGroup.add(shark);


 
  }
 
 }
 




