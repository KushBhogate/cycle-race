var Play=0;
var Start=1;
var End=2;
var gameState=Start;
var score;
var deaths;

var roadImage;
var road;
var invisibleland;
var jake4,Jake1,Jake2;
var ohnosound,yaysound,gamesound,coinsound,moneybag,moneybagImg,treasure,treasureImg,gold,goldImg;
var bomb,knifeman,swordman,bombImg,knifemanImg,swordmanImg;
var tryagain,tryagainImg,sadback,sadbackImg;
var winnerback,winner,winnerbackImg,winnerImg,crown,crownImg;
var ins,insImg;


function preload(){
  //pre-load images
   roadImage=loadImage("path.png");
   jakerunning = loadAnimation("Jake1.png", "jake4.PNG", "Jake2.png");
   coinsound=loadSound("coin.mpeg");
   ohnosound=loadSound("ohno.mpeg");
   yaysound=loadSound("yay2.mpeg");
   gamesound=loadSound("gamesound.mpeg");
   moneybagImg=loadImage("moneybag.png");
   treasureImg=loadImage("treasure.png");
   goldImg=loadImage("gold.png");
   bombImg=loadImage("bomb.png");
   swordmanImg=loadImage("swordman.png");
   knifemanImg=loadImage("knifeman.png");
   tryagainImg=loadImage("tryagain.gif");
   sadbackImg=loadImage("sadback2.jpg");
   winnerImg=loadImage("winner2.png");
   winnerbackImg=loadImage("winnerback.jpg");
   crownImg=loadImage("crown.png");
   insImg=loadImage("ins.png");
}

function setup(){
  createCanvas(600,600);
  //create sprites here
  
     goldGroup = new Group();
     moneyBagGroup = new Group();
     treasureGroup = new Group();
     bombGroup =new Group();
    jakeGroup =new Group();
    swordmanGroup =new Group();
    knifemanGroup = new Group();
  
    jake= createSprite(2700,500,20,50);
    jake.addAnimation("running", jakerunning);
    jake.scale = 0.8;
    jakeGroup.add(jake);
  
    road = createSprite(300,200,200,200);
    road.addImage("road",roadImage);
    road.scale = 1.7;
  
    road2 = createSprite(300,200,200,200);
    road2.addImage("road",roadImage);
    road2.scale = 1.7;
  
    jake= createSprite(270,500,20,50);
    jake.addAnimation("running", jakerunning);
    jake.scale = 0.8;
    jakeGroup.add(jake);
  
    invisibleland=createSprite(10,300,100,600);
    invisibleland2=createSprite(603,300,100,600);
    invisibleland.visible=false;
    invisibleland2.visible=false;

    edges= createEdgeSprites();
  
    score=0;
    deaths="";
  
    sadback= createSprite(350,300,20,50);
    sadback.addAnimation("running", sadbackImg);
    sadback.scale =3.2;
    sadback.visible=false;
  
    tryagain= createSprite(180,300,20,50);
    tryagain.addAnimation("running", tryagainImg);
    tryagain.scale = 1;
    tryagain.visible=false;
  
    winnerback= createSprite(300,300,20,50);
    winnerback.addAnimation("running", winnerbackImg);
    winnerback.scale =1.2;
    winnerback.visible=false;
  
    crown= createSprite(305,220,20,50);
    crown.addAnimation("running", crownImg);
    crown.scale =0.24;
    crown.visible=false;

    winner= createSprite(300,370,20,50);
    winner.addAnimation("running", winnerImg);
    winner.scale =1.2;
    winner.visible=false;
  
    ins = createSprite(345,300,20,50);
    ins.addAnimation("running", insImg);
    ins.scale =0.32;
    ins.visible=false;
  
    jake.setCollider("circle",0,0,30);
  
  }

function draw() {
  
  background("skyblue");
  
  jake.velocityX=0;
  jake.velocityY=0;
  
  if(gameState==Start)
     {
       ins.visible=true;
     }
  
  if(keyWentDown("space"))
     {
       gameState=Play;
     }
  
  if(gameState==Play)
    {
      // gamesound.play()
       ins.visible=false; 

      if(keyDown("right"))
         {
           jake.velocityX=5;
         }
      if(keyDown("left"))
         {
           jake.velocityX=-5;
         }
  
    road.velocityY=10;
    road2.velocityY=10;


    if(bombGroup.isTouching(jake))
    {
      
      bombGroup.destroyEach();
      ohnosound.play()
      deaths=deaths+" ☠";
    }
       
    if(swordmanGroup.isTouching(jake))
    {

      swordmanGroup.destroyEach();
      ohnosound.play()
      deaths=deaths+" ☠";
    }
       
    if(knifemanGroup.isTouching(jake))
      {

        knifemanGroup.destroyEach();
        ohnosound.play()
        deaths=deaths+" ☠";
      }
       
    if(goldGroup.isTouching(jake))
      {
        goldGroup.destroyEach();
        yaysound.play()
        score=score+50;
      }
       
       
    if(treasureGroup.isTouching(jake))
      {
        treasureGroup.destroyEach();
        yaysound.play()
        score=score+100;
      }
       
    if(moneyBagGroup.isTouching(jake))
      {
        moneyBagGroup.destroyEach();
        yaysound.play()
        score=score+100;
      }
      
    if(score>1500)
       {
         score=1500;
       }
       
    if(deaths>" ☠ ☠ ☠ ☠ ☠")
       {
         deaths=" ☠ ☠ ☠ ☠ ☠";
       }
       
       
   if(road.y>600)
      {
        road.y=200;
      }  
  
   jake.collide(invisibleland);
   jake.collide(invisibleland2);
   jake.collide(edges[3]);
   jake.collide(edges[2]);
   jake.collide(edges[1]);
   jake.collide(edges[0]);
       
        
    createmoneyBag();
    creategold();
    createtreasure();
    createbomb();
    createswordman();
    createknifeman();
       
  }
  
drawSprites();
  
  if(gameState==Play)
   {
     textSize(25);
     fill("white");
     text("Treasure:"+score+" $",90,20);
     text("Deaths: "+deaths,280,20);
    }
  
  if ((deaths==" ☠ ☠ ☠ ☠ ☠")||(score==1500))
      { 
      gameState=End;
      }

  if((deaths==" ☠ ☠ ☠ ☠ ☠")&&(gameState==End))
     {
        road.velocityY=0;
        road2.velocityY=0;
        jake.velocitX=0;
        jake.velocityY=0;
        goldGroup.destroyEach();
        moneyBagGroup.destroyEach();
        treasureGroup.destroyEach();
        bombGroup.destroyEach();
        swordmanGroup.destroyEach();
        knifemanGroup.destroyEach();
        sadback.visible=true;
        tryagain.visible=true;
        ins.visible=false;
     }
  
  if((score==1500)&&(gameState==End))
     {
    
        road.velocityY=0;
        road2.velocityY=0;
        jake.velocitX=0;
        jake.velocityY=0;
        goldGroup.destroyEach();
        moneyBagGroup.destroyEach();
        treasureGroup.destroyEach();
        bombGroup.destroyEach();
        swordmanGroup.destroyEach();
        knifemanGroup.destroyEach();
        winnerback.visible=true;
        crown.visible=true;
        winner.visible=true;
        ins.visible=false;
     }
  
  if(keyDown("s")&&(gameState==End))
     {
        coinsound.stop()
        gameState=Start;
        jake.x=270;
        jake.velocitX=0;
        jake.velocityY=0;
        score=0;
        deaths="";
        sadback.visible=false;
        tryagain.visible=false;
        winnerback.visible=false;
        crown.visible=false;
        winner.visible=false;
       
     }
  

}



function createmoneyBag() {
  if (frameCount % 110 == 0) 
  {
    moneyBag=createSprite(450,60,40,10); 
    moneyBag.x=Math.round(random(100,520));
    moneyBag.addImage(moneybagImg);
    moneyBag.scale=0.10;
    moneyBag.velocityY = 4.4;
    moneyBag.lifetime = 170;
    moneyBagGroup.add(moneyBag);
  }
  }


function creategold() {
  if (frameCount % 159 == 0) 
  {
    gold=createSprite(450,60,40,10); 
    gold.x=Math.round(random(100,520));
    gold.addImage(goldImg);
    gold.scale=0.14;
    gold.velocityY = 6;
    gold.lifetime = 200;
    goldGroup.add(gold);
  }
}

function createtreasure() {
  if (frameCount % 167 == 0) 
  {
    treasure=createSprite(450,60,40,10); 
    treasure.x=Math.round(random(100,520));
    treasure.addImage(treasureImg);
    treasure.scale=0.14;
    treasure.velocityY = 4;
    treasure.lifetime = 170;
    treasureGroup.add(treasure);
  }
}

function createbomb() {
  if (frameCount % 200 == 0)
  {
    bomb=createSprite(450,60,40,10); 
    bomb.x=Math.round(random(100,520));
    bomb.addImage(bombImg);
    bomb.scale=0.14;
    bomb.velocityY = 7;
    bomb.lifetime = 170;
    bombGroup.add(bomb);
  }
}


function createswordman() {
  if (frameCount % 275 == 0) 
  {
     swordman=createSprite(450,120,40,10); 
     swordman.x=Math.round(random(100,520));
     swordman.addImage(swordmanImg);
     swordman.scale=0.14;
     swordman.velocityY = 3;
     swordman.lifetime = 170;
     swordmanGroup.add(swordman);
  }
}


function createknifeman() {
  if (frameCount % 240 == 0) 
  {
    knifeman=createSprite(450,120,40,10); 
    knifeman.x=Math.round(random(100,520));
    knifeman.addImage(knifemanImg);
    knifeman.scale=0.14;
    knifeman.velocityY = 5;
    knifeman.lifetime = 170;
    knifemanGroup.add(knifeman);
  }
}