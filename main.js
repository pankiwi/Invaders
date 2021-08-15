// the code is the property of Frank Poth 03/10/2017

var Button, controller;

// basically a rectangle, but it's purpose here is to be a button:
Button = function(x, y, width, height, color, txt = "", widthTxt = 20, txtColor = color) {

  this.active = false;
  this.color = color;
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;
  this.txt = txt
  this.widthTxt = widthTxt
  this.txtColor = txtColor
}

Button.prototype = {

  // returns true if the specified point lies within the rectangle:
  containsPoint: function(x, y) {

    // if the point is outside of the rectangle return false:
    if (x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.width) {

      return false;

    }

    return true;

  }

};

// handles everything to do with user input:
controller = {

  buttons: [
     new Button(100, 410, 60, 60, "lime", "↑", 20),
     new Button(100, 530, 60, 60, "lime", "↓"),
     new Button(30, 470, 60, 60, "lime", "←"),
     new Button(170, 470, 60, 60, "lime", "→")
    ],

  testButtons: function(target_touches) {

    var button, index0, index1, touch;

    // loop through all buttons:
    for (index0 = this.buttons.length - 1; index0 > -1; --index0) {

      button = this.buttons[index0];
      button.active = false;

      // loop through all touch objects:
      for (index1 = target_touches.length - 1; index1 > -1; --index1) {

        touch = target_touches[index1];

        // make sure the touch coordinates are adjusted for both the canvas offset and the scale ratio of the buffer and output canvases:
        if (button.containsPoint((touch.clientX - bounding_rectangle.left) * buffer_output_ratio, (touch.clientY - bounding_rectangle.top) * buffer_output_ratio)) {

          button.active = true;
          break; // once the button is active, there's no need to check if any other points are inside, so continue

        }

      }

    }

  },

  touchEnd: function(event) {

    // event.preventDefault();
    controller.testButtons(event.targetTouches);

  },

  touchMove: function(event) {

    //    event.preventDefault();
    controller.testButtons(event.targetTouches);

  },

  touchStart: function(event) {

    // event.preventDefault()
    controller.testButtons(event.targetTouches);

  }

};


function drawUi(buttons) {

  var button, index;
  c.fillStyle = "lime";
  c.fillRect(0, 400, c.canvas.width, c.canvas.height);
  c.fillStyle = "black";
  c.fillRect(0, 403, c.canvas.width, c.canvas.height);

  for (index = buttons.length - 1; index > -1; --index) {

    button = buttons[index];
    c.beginPath()
    c.fillStyle = button.color;
    c.fillRect(button.x, button.y, button.width, button.height);
    c.fill()
    c.fillStyle = "black";
    c.fillRect(button.x + 3, button.y + 3, button.width - 6, button.height - 6);
    c.fill()

    c.fillStyle = button.txtColor;
    c.font = "bold " + button.widthTxt + "px" + " Arial";
    c.fillText(button.txt, button.x + button.width / 2 - 6, button.y + button.height / 2 + 3, button.widthTxt);

    if (button.active) {
      c.beginPath()
      c.fillStyle = "black";
      c.fillRect(button.x, button.y, button.width, button.height);
      c.fill()
      c.fillStyle = button.color;
      c.fillRect(button.x + 3, button.y + 3, button.width - 6, button.height - 6);
      c.fill()

      c.fillStyle = "black";
      c.font = "bold " + button.widthTxt + "px" + " Arial";
      c.fillText(button.txt, button.x + button.width / 2 - 6, button.y + button.height / 2 + 3, button.widthTxt);

    }
  }
}


//now my code

//const
const c = document.querySelector("canvas").getContext("2d")

c.canvas.width = 600
c.canvas.height = 600

let buffer_output_ratio = 1

let bounding_rectangle = c.canvas.getBoundingClientRect();
/* coords */
const MAX_X = c.canvas.width
const MAX_Y = 400

let debug = true
//sourcer Imgs

let basicEnemyImg, PlayerImg

PlayerImg = new Image();
PlayerImg.src = "src/player.png"

basicEnemyImg = new Image();
basicEnemyImg.src = "src/basicEnemy.png"

/*
 * Class Player
 */

class PlayerEntity {
  frame = 0
  counterFrame = 0
  counterBullet = 0
  speedShot = 100
  constructor(img, radius, hp) {
    this.img = img
    this.radius = radius
    this.hp = hp
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'white'
    c.arc(player.x, player.y, this.radius, 0, Math.PI * 2, false)
    c.fill()
  }
  draw() {
    c.drawImage(this.img, 0, this.counterFrame * 16, 16, 16, player.x - 20, player.y - 20, 40, 40);
  }
  shot() {
    //bullets.push(new bullet(playerX, playerY, 10, false))
  }
  updateShot() {
    this.counterBullet++
    if (this.counterBullet > this.speedShot) {
      this.shot()
      this.counterBullet = 0
    }
  }
  animator() {
    this.frame++
    switch (this.frame) {
      case 10:
        this.counterFrame++
        break;
      case 20:
        this.counterFrame--
        this.frame = 0
        break;
    }
  }
  update() {
    this.updateShot()
    this.animator()
    if (debug) {
      this.hitBox()
    }
    this.draw()
  }
  hit(DAMAGE) {
    this.hp = this.hp - DAMAGE
    atParticle(10, player.x, player.y, 50, 0, "lime", 0, 6, false, false)
  }
  dead() {
    atParticle(20, player.x, player.y, 100, 0.05, "lime", 0, 10, false, true, 4)
  }
}


//Game
/* Player */
let control = { down: false, up: false, right: false, left: false }

let player = { x: MAX_X / 2, y: 300, entity: new PlayerEntity(PlayerImg, 20, 20) }



let bullets = []
let playerParticles = []
let particles = []
let enemys = []

//fuctions
function drawTxt(x, y, width, color, txt) {
  c.beginPath()
  c.fillStyle = color;
  c.font = "bold " + width + "px" + " Arial";
  c.fillText(txt, x + width / 2 - 6, y + width / 2 + 3, width);

}


function checkKey(key) {
  if (key == 38) {
    control.up = true
  }
  if (key == 40) {
    control.down = true
  }
  if (key == 37) {
    control.left = true
  }
  if (key == 39) {
    control.right = true
  }
}

function atParticle(amount, x, y, time, alfaDegrase, color, gravity, size, isWhile = true, hasAlfa = true, vel = 1, player = false) {
  if (player) {
    for (let i = 0; i < amount; i++) {
      playerParticles.push(new Particle(x, y, time + i, alfaDegrase, color, gravity, size, isWhile, hasAlfa, vel))
    }
  } else {
    for (let i = 0; i < amount; i++) {
      particles.push(new Particle(x, y, time + i, alfaDegrase, color, gravity, size, isWhile, hasAlfa, vel))
    }
  }
}

function animation() {
  requestAnimationFrame(animation)
  /* Draw */
  c.clearRect(0, 0, c.canvas.width, c.canvas.height)

  player.entity.update()


  drawUi(controller.buttons)


  /* Control input */
  if (controller.buttons[0].active) {
    checkKey(38)
  }
  if (controller.buttons[1].active) {
    checkKey(40)
  }
  if (controller.buttons[2].active) {
    checkKey(37)
  }
  if (controller.buttons[3].active) {
    checkKey(39)
  }
  /* input Config */
  if (control.down && !(player.y + player.entity.radius >= MAX_Y)) {
    player.y += 1
  }
  if (control.up && !(player.y - player.entity.radius <= 0)) {
    player.y -= 1
  }
  if (control.left && !(player.x - player.entity.radius <= 0)) {
    player.x -= 1
  }
  if (control.right && !(player.x + player.entity.radius >= MAX_X)) {
    player.x += 1
  }
  /* reset */
  control.down = control.up = control.left = control.right = false

}
//event
c.canvas.addEventListener("touchend", (event) => {
  event.preventDefault()
  controller.touchEnd(event)
}, { passive: false });
c.canvas.addEventListener("touchmove", (event) => {
  event.preventDefault()
  controller.touchMove(event)
}, { passive: false });
c.canvas.addEventListener("touchstart", (event) => {
  event.preventDefault()
  controller.touchMove(event)
}, { passive: false });


document.addEventListener("keydown", (key) => {
  event.preventDefault();

  checkKey(key.which)
})
document.addEventListener("keyup", (key) => {
  event.preventDefault();

  checkKey(key.which)
})


window.onload = () => {
  animation();
  //fps()
}

/* fps 
const fpsTxt = document.getElementById('fpsTxt')


function fps () {
var rAF = requestAnimationFrame;
var prevTime = 0;
var counter = 0;

rAF(fpsRender);

function fpsRender (timestamp) {
  var diff = timestamp - prevTime;

  if (diff > 1000) {

    var fps = 1000 * counter / diff;
    var len = fps.toFixed(1).length;
    if (len === 3) {
      fps = fps.toFixed(2);
    } else if (len === 4) {
      fps = fps.toFixed(1);
    } else {
      fps = fps.toFixed(0);
    }

    fps += ' fps';

    fpsTxt.innerHTML = fps

    prevTime = timestamp;
    counter = 0;
  }

  counter++;
  rAF(fpsRender);
}
}
*/