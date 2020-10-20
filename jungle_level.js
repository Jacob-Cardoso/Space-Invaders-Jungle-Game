var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var score = 0
var enemySpeed = 1;
var bullets = [];
var enemies = [];
var canvasHeight = canvas.height;
var canvasWidth = canvas.width;
var lives = 3;
var rPressed = false;
var speed = 1.;
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;



//Changes enemy speed according to score.
function difficulty() {

  if (score == 5) {

    soldierP.speed = soldierP.speed * 10

  }

  if (score == 10) {

    soldierP.speed = soldierP.speed * 10

  }

  if (score == 15) {

    soldierP.speed = soldierP.speed * 10

  }

  if (score == 20) {

    soldierP.speed = soldierP.speed * 10

  }

  if (score == 25) {

    soldierP.speed = soldierP.speed * 2

  }


}
//Displays Score And Lives
function display() {
  ctx.font = "50px White";
  ctx.fillStyle = 'White';
  var scoreStr = "Score : " + score;
  ctx.fillText(scoreStr, 10, 50);
  ctx.font = "50px Arial";
  ctx.fillStyle = "White";
  var livesStr = "Lives : " + lives;
  ctx.fillText(livesStr, 1100, 50)

}

var arrow_keys_handler = function (e) {
  switch (e.keyCode) {
    case 37: case 39: case 38: case 40: // Arrow keys
    case 32: e.preventDefault(); break; // Space
    default: break; // do not block other keys
  }
};

window.addEventListener("keydown", arrow_keys_handler, false);
//Collison
function collision(rect1, rect2) {

  if (rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.height + rect1.y > rect2.y) {
    return true
  }
  else {
    return false

  }


}

//Checks for explosion and draws the explosion image.
var explosion = {

  x: 0,
  y: 0,
  visible: false,

  showExplosion: function (x, y) {
    this.x = x;
    this.y = y;
    this.visible = true;
    var _this = this;

    setTimeout(function () {

      _this.visible = false;


    }, 2000)

  },
  draw: function () {
    if (this.visible) {
      drawImage(ctx, explosionImage, this.x, this.y, soldierP.height, soldierP.width, 0);
    }
  }


}
//Object for the tank.
var tank = {
  x: canvasWidth / 2,
  y: canvasHeight - 200,
  height: 150,
  width: 100,
  logPosition: function () {
    console.log(this.x, this.y)
  }

}

//Bullet Object.
var bulletProto = {
  x: tank.x,
  y: tank.y,
  speed: 3,
  width: 50,
  height: 70,
  ready: false,
  image: new Image(),
  visible: true,
  init: function () {
    var _this = this;
    this.image.src = "Jungle_images/tank-bullet.png"
    this.image.onload = function () {
      _this.ready = true;
    }
  },
  draw: function () {
    if (this.ready && this.visible) {
      drawImage(ctx, this.image, this.x, this.y, this.width, this.height, 0)
    }
  },
  shoot: function () {
    this.x = tank.x + tank.width / 2 - 26.2;
    this.y = tank.y - 50;
    this.visible = true;
    this.animate();

  },
  animate: function () {
    var _this = this;
    this.y -= speed;

    enemies.forEach(function (enemy) {
      if (collision(_this, enemy)) {
        score += 1;
        enemy.visible = false;
        explosion.showExplosion(enemy.x, enemy.y);

      }
    })

    if (this.y > 0) {
      setTimeout(
        function () {
          _this.animate()
        }, 2);
    }
    else {
      this.visible = false;
    }
  }

}
//Object For Soldier (Enemy)
var soldierP = {
  x: canvasWidth / 2,
  y: 50,
  speed: 5,
  width: 100,
  height: 115,
  ready: false,
  image: new Image(),
  visible: true,
  init: function () {
    var _this = this;
    this.image.src = "Jungle_images/Soldier.png"
    this.image.onload = function () {
      _this.ready = true;
    }
  },
  draw: function () {
    if (this.ready && this.visible) {
      drawImage(ctx, this.image, this.x, this.y, this.width, this.height, 0)
    }
  },
  spawn: function () {
    this.x = this.width + (Math.random() * (canvasWidth - this.width * 2));
    this.y = 0;
    this.visible = true;
    this.animate();
  },
  animate: function () {

    if (rPressed) {
      return;
    }

    var _this = this;
    this.y += speed;

    if (collision(this, tank) && this.visible) {
      if (lives == 0) {
        return;
      }
      lives -= 1;
      this.visible = false;
      explosion.showExplosion(tank.x, tank.y);
      return;
    }

    //check all enemies for collision and hide
    // Increment score by 1

    if (this.y < canvasHeight) {
      setTimeout(
        function () {
          _this.animate()
        }, 2);
    }
    else {
      this.visible = false;
    }
  }

}

bulletProto.init();
soldierP.init();

setInterval(createEnemy, 1000)


//Load in all the images.
var tankReady = false;

var tankImage = new Image();
tankImage.onload = function () {
  tankReady = true;
}

tankImage.src = "Jungle_images/Tank.png";


var backgroundReady = false;
var backgroundImage = new Image();

backgroundImage.onload = function () {
  backgroundReady = true;
}

backgroundImage.src = "Jungle_images/Jungle.png";


var explosionImage = new Image();

explosionImage.src = "Jungle_images/explosion.png";



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//Checks for keys being pressed.
function keyDownHandler(e) {
  if (e.keyCode == 39 || e.keyCode == 68) {
    rightPressed = true;
  } else if (e.keyCode == 37 || e.keyCode == 65) {
    leftPressed = true;
  } else if (e.keyCode == 38 || e.keyCode == 87) {
    upPressed = true;
  } else if (e.keyCode == 40 || e.keyCode == 83) {
    downPressed = true;
  }
  else if (e.keyCode == 32) {
    spacePressed = true;
  }
  else if (e.keyCode == 82) {
    rPressed = true;
  }

}
//Checks for keys not being pressed.
function keyUpHandler(e) {
  if (e.keyCode == 39 || e.keyCode == 68) {
    rightPressed = false;
  } else if (e.keyCode == 37 || e.keyCode == 65) {
    leftPressed = false;
  } else if (e.keyCode == 38 || e.keyCode == 87) {
    upPressed = false;
  } else if (e.keyCode == 40 || e.keyCode == 83) {
    downPressed = false;
  }
  else if (e.keyCode == 32) {
    spacePressed = false;
    createbullet();
    createEnemy();
  }

}

function createbullet() {
  var newbullet = { ...bulletProto };
  newbullet.shoot();

  bullets.push(newbullet);

}



function createEnemy() {
  if (enemies.length < 4) {
    var newEnemy = { ...soldierP };
    newEnemy.spawn();
    enemies.push(newEnemy);
  }
}

//Resets the game.
function reset() {

  score = 0;
  lives = 3;


  bullets = [];
  bullets.forEach(function (bullet) {

    bullet.visible = false;

  })

  enemies = [];
  enemies.forEach(function (enemy) {

    enemy.visible = false;

  })


  rightPressed = false;
  leftPressed = false;
  upPressed = false;
  downPressed = false;
  spacePressed = false;
  rPressed = false;
  explosion.visible = false;
}
function draw() {

  if (rPressed) {
    reset();
  }


  ctx.clearRect(0, 0, canvas.width, canvas.height);


  var dx = 0;
  var dy = 0;

  if (backgroundReady) {
    drawImage(ctx, backgroundImage, 0, 0, canvasWidth, canvasHeight)
  }


  display();

  if (lives == 0) {

    ctx.font = "75 Arial";
    ctx.fillStyle = "White";
    ctx.fillText("You Died Press R To Restart", 100, 300);
  }
  else {

    if (tankReady) {
      drawImage(ctx, tankImage, tank.x, tank.y, tank.width, tank.height)
    }
    //cleanup array
    bullets = bullets.filter(
      function (bullet) {
        return bullet.visible;
      }
    )

    explosion.draw();

    //draw all bullets in array
    //bullet.draw();

    bullets.forEach(function (bullet) {
      bullet.draw();
    });

    enemies = enemies.filter(
      function (enemy) {
        return enemy.visible;
      }
    )

    enemies.forEach(function (enemy) {
      enemy.draw();

    })

    if (rightPressed && (tank.x <= (canvasWidth - tank.width))) {
      dx = speed;
    } else if (leftPressed && (tank.x >= 0)) {
      dx = -speed;
    } else if (upPressed && (tank.y >= 0)) {
      dy = -speed;
    }
    else if (downPressed && (tank.y <= (canvasHeight - tank.height))) {
      dy = speed;
    }

    tank.x += dx;
    tank.y += dy;

  }

  difficulty();

  setTimeout(draw, 5);

}

function drawImage(ctx, image, x, y, w, h) {
  ctx.save();
  ctx.translate(x + w / 2, y + h / 2);
  ctx.translate(-x - w / 2, -y - h / 2);
  ctx.drawImage(image, x, y, w, h);
  ctx.restore();
}

