var PLAY = 1;
var END = 0;
var gameState = PLAY;

var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var cactusGroup, ouch1, ouch2, ouch3, ouch4, ouch5, OUCHEEEE;
var cactus
var score;
var HAPPY,HAPPYIMAGE
var SADNESS,SADNESSIMAGE
var leapSound,whymeSound,thelightSound

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  ouch1= loadImage("ouch1.png");
  ouch2= loadImage("ouch2.png");
  ouch3= loadImage("ouch3.png");
  ouch4= loadImage("ouch4.png");
  ouch5= loadImage("ouch5.png");
  OUCHEEEE= loadImage("OUCHEEEE.png");
  
  HAPPYIMAGE=loadImage("restart.png")
  SADNESSIMAGE=loadImage("gameOver.png")
  leapSound=loadSound("jump.mp3")
  whymeSound=loadSound("die.mp3")
  thelightSound=loadSound("checkPoint.mp3")
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  cactusGroup = createGroup();
  cloudsGroup = createGroup();
  
  console.log("Hello" + 5);
  
  trex.setCollider("circle",0,0,56.5)
  trex.debug = false
  HAPPY=createSprite(300,140)
  HAPPY.addImage(HAPPYIMAGE)
  HAPPY.scale=0.5
  
  SADNESS=createSprite(300,100)
  SADNESS.addImage(SADNESSIMAGE)
  SADNESS.scale=0.5
  
  score = 0
}

function draw() {
  background("pink");
  text("Score: "+ score, 500,50);
  
  
  
  
  if(gameState === PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -(4+score/100);
    console.log(ground.velocityX)
    HAPPY.visible=false
    SADNESS.visible=false
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space")&& trex.y >=150) {
        trex.velocityY = -13;
      leapSound.play();
    }
    if(score % 100===0 && score>0){
      thelightSound.play();
    }
    trex.velocityY = trex.velocityY + 0.8
  
    spawnClouds();

    spawnObstacles();
    
    if(cactusGroup.isTouching(trex)){
        gameState = END;
      whymeSound.play();
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     
     cactusGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     cactusGroup.setLifetimeEach(-1)
     cloudsGroup.setLifetimeEach(-1)
     trex.changeAnimation("collided",trex_collided)
     SADNESS.visible=true
     HAPPY.visible=true
     if(mousePressedOver(HAPPY)){
      rebirth(); 
     }
   }
  trex.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   cactus = createSprite(400,165,10,40);
   cactus.velocityX = -(6+score/125);
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: cactus.addImage(ouch1);
              break;
      case 2: cactus.addImage(ouch2);
              break;
      case 3: cactus.addImage(ouch3);
              break;
      case 4: cactus.addImage(ouch4);
              break;
      case 5: cactus.addImage(ouch5);
              break;
      case 6: cactus.addImage(OUCHEEEE);
              break;
      default: break;
    }      
    cactus.scale = 0.5;
    cactus.lifetime =70;
    cactusGroup.add(cactus);
 }
}

function spawnClouds() {
   if (frameCount % 60 === 0) {
     cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   cloudsGroup.add(cloud);
    }
}

function rebirth(){
  gameState=PLAY
cactusGroup.destroyEach()
cloudsGroup.destroyEach()
trex.changeAnimation("running",trex_running)
score=0
}