var santa, santa_running, santa_collided, santa_jumping, santa_dead;
var snowGround, invisibleSnowGround, snowGroundImage;
var snowFlake, snowFlakeGroup, snowFlakeImage;
var northPoleImage, northPole;
var gift, giftsGroup, gift1, gift2, gift3, gift4, gift5, gift6, gift7, gift8, gift9, gift10, gift11, gift12, gift13, gift14, gift15, gift16, gift17, gift18, gift19, gift20;
var star, starImage;
var monster, monster_scare, monsterGroup, monster_stop;
var starScore = 0,
  flag = false,
  starScoreImage, starScoreSprite;
var score = 0,
  monsterStop = true;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, santacard;
var santacardImage, restartImage;
//var for sound
var dieSound, gameBGsound, GiftGrabsound, GameOverSound;

function preload() {
  //santa sprite animation for running,jumping and dead
  santa_running = loadAnimation("assets/Walk (1).png", "assets/Walk (2).png", "assets/Walk (3).png", "assets/Walk (4).png", "assets/Walk (5).png", "assets/Walk (6).png", "assets/Walk (7).png", "assets/Walk (8).png", "assets/Walk (9).png", "assets/Walk (10).png", "assets/Walk (11).png");
  santa_collided = loadAnimation("assets/Dead (1).png", "assets/Dead (2).png", "assets/Dead (3).png", "assets/Dead (4).png", "assets/Dead (5).png", "assets/Dead (6).png", "assets/Dead (7).png", "assets/Dead (8).png", "assets/Dead (9).png", "assets/Dead (10).png", "assets/Dead (11).png", "assets/Dead (12).png", "assets/Dead (13).png", "assets/Dead (14).png", "assets/Dead (15).png", "assets/Dead (16).png");
  santa_jumping = loadAnimation("assets/Jump (1).png", "assets/Jump (2).png", "assets/Jump (3).png", "assets/Jump (4).png", "assets/Jump (5).png", "assets/Jump (6).png", "assets/Jump (7).png", "assets/Jump (8).png", "assets/Jump (9).png", "assets/Jump (10).png", "assets/Jump (11).png", "assets/Jump (12).png", "assets/Jump (13).png", "assets/Jump (14).png", "assets/Jump (15).png", "assets/Jump (16).png");
  santa_dead = loadAnimation("assets/Dead (16).png");

  // background sprite
  snowGroundImage = loadImage("assets/bg12.png");

  //gifts sprites
  gift1 = loadImage("assets/obstacle1.png");
  gift2 = loadImage("assets/obstacle2.png");
  gift3 = loadImage("assets/obstacle3.png");
  gift4 = loadImage("assets/obstacle4.png");
  gift5 = loadImage("assets/obstacle5.png");
  gift6 = loadImage("assets/obstacle6.png");
  gift7 = loadImage("assets/obstacle7.png");
  gift8 = loadImage("assets/obstacle8.png");
  gift9 = loadImage("assets/obstacle9.png");
  gift10 = loadImage("assets/obstacle10.png");
  gift11 = loadImage("assets/obstacle11.png");
  gift12 = loadImage("assets/obstacle12.png");
  gift13 = loadImage("assets/obstacle13.png");
  gift14 = loadImage("assets/obstacle14.png");
  gift15 = loadImage("assets/obstacle15.png");
  gift16 = loadImage("assets/obstacle16.png");
  gift17 = loadImage("assets/obstacle17.png");
  gift18 = loadImage("assets/obstacle18.png");
  gift19 = loadImage("assets/obstacle19.png");
  gift20 = loadImage("assets/obstacle20.png");

  //monster sprite
  monster_scare = loadAnimation("assets/monster12-removebg-preview.png", "assets/monster11-removebg-preview.png", "assets/monster10-removebg-preview.png", "assets/monster9-removebg-preview.png", "assets/monster8-removebg-preview.png", "assets/monster7-removebg-preview.png", "assets/monster5-removebg-preview.png", "assets/monster4-removebg-preview.png", "assets/monster3-removebg-preview.png", "assets/monster2-removebg-preview.png", "assets/monster1-removebg-preview.png");
  monster_stop = loadAnimation("assets/monster1-removebg-preview.png");

  //north pole image
  northPoleImage = loadImage("assets/north-removebg-preview.png");

  //gift image and gift score
  starImage = loadImage("assets/giftScore.png");
  starScoreImage = loadImage("assets/giftScore.png");

  //game over and reset
  santacardImage = loadImage("assets/santacard1.png");
  restartImage = loadImage("assets/restart.png");
  //sound loading
  dieSound = loadSound("sound/snowman.wav");
  gameBGsound = loadSound("sound/santa1.mp3");
  GiftGrabsound = loadSound("sound/gift.wav");
  GameOverSound = loadSound("sound/gameover.aac");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  gameBGsound.play();
  //background sprite
  snowGround = createSprite(windowWidth / 2, windowHeight / 2, windowWidth, windowHeight);
  snowGround.addImage("ground", snowGroundImage);
  snowGround.x = width / 2;
  snowGround.velocityX = -8;

  //invisible collide ground sprite
  invisibleSnowGround = createSprite(windowWidth / 2, windowHeight - 84, windowWidth, 10);
  invisibleSnowGround.visible = false;

  //santa sprite
  santa = createSprite(70, windowHeight - 140, 10, 20);
  santa.addAnimation("running", santa_running);
  santa.addAnimation("jumping", santa_jumping);
  santa.addAnimation("collided", santa_collided);
  santa.addAnimation("dead", santa_dead);

  santa.scale = 0.18;
  //santa.setCollider('circle');
  //santa.debug = true;

  //north pole sprite
  northPole = createSprite(windowWidth - 50, windowHeight - 158, 10, 10);
  northPole.addAnimation("northPole", northPoleImage);
  northPole.scale = 0.7;

  //gift top right sprite
  starScoreSprite = createSprite(windowWidth - 70, 25, 10, 30);
  starScoreSprite.addAnimation("starScore", starScoreImage);
  starScoreSprite.scale = 0.1;

  //groups
  giftsGroup = new Group();
  hideGroup = new Group();
  monsterGroup = new Group();
  santacard = createSprite(600, 250, windowWidth, 700);
  santacard.addImage(santacardImage);
  santacard.scale = 1.1;
  restart = createSprite(600, 350, 20, 20);
  restart.addImage(restartImage);
  restart.scale = 0.2;
  santacard.visible = false;
  restart.visible = false;
}

function draw() {
  if (gameState === PLAY) {
    snowGround.velocityX = -7;
    santa.changeAnimation("running", santa_running);

    if (snowGround.x < 0) {
      snowGround.x = snowGround.width / 2;
    }

    if (keyDown("space")) {
      santa.velocityY = -10;
      santa.changeAnimation("jumping", santa_jumping);
    }

    santa.velocityY = santa.velocityY + 0.8;
    santa.collide(invisibleSnowGround);

    if (monsterStop) {
      //calculating the score as per framecount
      score = score + Math.round(getFrameRate() / 60);
      spawnMonsters();
      spawnGifts();
    }

    if (santa.isTouching(giftsGroup) && flag) {
      gift.visible = false;
      //giftsGroup.setLifetimeEach(-1);
      star.visible = true;
      star.velocityY = -5;
      star.velocityX = 10;
      starScore = starScore + 1;
      flag = false;
      GiftGrabsound.play();
    }

    //check if santa is touching to obstacle
    if (monsterGroup.isTouching(santa)) {
      monsterGroup.destroyEach();
      dieSound.play();
      
      santa.changeAnimation("collided", santa_collided);
      snowGround.setVelocity(0, 0);
      santa.setVelocity(0, 0);

      monsterGroup.setVelocityXEach(0);
      giftsGroup.setVelocityXEach(0);

      //set lifetime of monster and gifts to -1
      monsterGroup.setLifetimeEach(-1);
      giftsGroup.setLifetimeEach(-1);

      monster.changeAnimation("stop", monster_stop);
      monsterStop = false;
      gameState = END;
    }
  } else if (gameState === END) {

    giftsGroup.destroyEach();

    santacard.visible = true;
    restart.visible = true;
    gameBGsound.stop();

    if (mousePressedOver(restart)) {
      reset();
    }
  }

  drawSprites();

  fill("black");
  textSize(16);
  text(starScore + " Gifts", windowWidth - 50, 30);
  text("Score : " + score, windowWidth - 190, 30);
  if (gameState === END) {
   // GameOverSound.play();
    textSize(16);
    if (starScore > 0) {
      text("Congratulations! You have received " + starScore + " Gifts from Santa", 410, 250);
    }
    text("Try Again for more Gifts", 500, 280);

    text("Your Game Score is : " + score, 500, 310);
  }

}

function spawnGifts() {
  if (frameCount % 180 === 0) {
    gift = createSprite(600, windowHeight - 300, 10, 30);
    gift.velocityX = -4;
    star = createSprite(windowWidth / 2, windowHeight / 2, 10, 30);
    star.addImage("star", starImage);
    star.scale = 0.25
    star.visible = false;
    flag = true;
    // gift.lifetime = 200;

    var rand = Math.round(random(1, 20));
    switch (rand) {
      case 1:
        gift.addImage(gift1);
        break;
      case 2:
        gift.addImage(gift2);
        break;
      case 3:
        gift.addImage(gift3);
        break;
      case 4:
        gift.addImage(gift4);
        break;
      case 5:
        gift.addImage(gift5);
        break;
      case 6:
        gift.addImage(gift6);
        break;
      case 7:
        gift.addImage(gift7);
        break;
      case 8:
        gift.addImage(gift8);
        break;
      case 9:
        gift.addImage(gift9);
        break;
      case 10:
        gift.addImage(gift10);
        break;
      case 11:
        gift.addImage(gift11);
        break;
      case 12:
        gift.addImage(gift12);
        break;
      case 13:
        gift.addImage(gift13);
        break;
      case 14:
        gift.addImage(gift14);
        break;
      case 15:
        gift.addImage(gift15);
        break;
      case 16:
        gift.addImage(gift16);
        break;
      case 17:
        gift.addImage(gift17);
        break;
      case 18:
        gift.addImage(gift18);
        break;
      case 19:
        gift.addImage(gift19);
        break;
      case 20:
        gift.addImage(gift20);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the gift           
    gift.scale = 0.5;
    gift.lifetime = 300;
    gift.rotationSpeed = 10;
    gift.depth = santa.depth;
    santa.depth = santa.depth + 1;
    giftsGroup.add(gift);
  }

}

function spawnMonsters() {
  if (frameCount % 110 === 0) {
    monster = createSprite(300, windowHeight - 150, 10, 30);
    monster.addAnimation("scaring", monster_scare);
    monster.addAnimation("stop", monster_stop);
    monster.changeAnimation("scaring", monster_scare);
    monster.velocityX = -3;
    monster.scale = 1.5;
    monster.setCollider('circle', 0, 0, 0)

    monster.depth = santa.depth;
    //monsterStop = true;
    monster.lifetime = 300;
    monsterGroup.add(monster);
  }
}

function reset() {
  gameState = PLAY;
  gameBGsound.play();
  santacard.visible = false;
  restart.visible = false;
  monsterGroup.destroyEach();
  monsterStop = true;
  score = 0;
  starScore = 0;
  console.log("reset")
}