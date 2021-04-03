var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;       
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleGroundGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.scale = 0.3;
  ghost.addImage("ghost", ghostImg);
}

function draw(){
  background(0);
  if (gameState === "play") {
    if(keyDown("left_arrow")){
      ghost.x = ghost.x - 4;
    }
    
    if(keyDown("right_arrow")){
      ghost.x = ghost.x + 4;
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10;
    }
    
    ghost.velocityY = ghost.velocityY + 0.8
    
    if(tower.y > 400){
      tower.y = 300
    }
    spawnDoors();

    
    if(climbersGroup.isTouching(ghost)){
      ghost.velocityY = 0;
    }
    if(invisibleGroundGroup.isTouching(ghost) || ghost.y > 600){
      ghost.destroy();
      gameState = "end"
    }
    
    drawSprites();
  }
  
  if (gameState === "end"){
   
   
    textSize(30);
    text("Game Over", 230,250)
  }

}

function spawnDoors() {
 
  if (frameCount % 240 === 0) {
    var door = createSprite(200, -50);
    var climber = createSprite(200,10);
    var invisibleGround = createSprite(200,15);
    invisibleGround.width = climber.width;
    invisibleGround.height = 2;
    
    door.x = Math.round(random(120,400));
    climber.x = door.x;
    invisibleGround.x = door.x;
    
    door.addImage(doorImg);
    climber.addImage(climberImg);
    
    door.velocityY = 1;
    climber.velocityY = 1;
    invisibleGround.velocityY = 1;
    
    ghost.depth = door.depth;
    ghost.depth +=1;
   

    door.lifetime = 800;
    climber.lifetime = 800;
    invisibleGround.lifetime = 800;

    
    //add each door to the group
    doorsGroup.add(door);
    invisibleGround.debug =false;
    climbersGroup.add(climber);
    invisibleGroundGroup.add(invisibleGround);
  }
}

