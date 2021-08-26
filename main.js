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

//uI

function drawButton(buttons) {
 var button, index;

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

function drawTxt(x, y, width, widthTxt, color, txt) {
 c.beginPath()
 c.fillStyle = color;
 c.font = "bold " + widthTxt + "px" + " Arial";
 c.fillText(txt, x + width / 2 - 6, y + width / 2 + 3, width);

}

function drawUi() {
 c.beginPath()
 c.fillStyle = "lime";
 c.fillRect(0, 400, c.canvas.width, c.canvas.height);
 c.fillStyle = "black";
 c.fillRect(0, 403, c.canvas.width, c.canvas.height);
 drawButton(controller.buttons)
 c.fillStyle = "lime";
 c.fillRect(270, 400, 350, c.canvas.height);
 c.fillStyle = "black";
 c.fillRect(273, 403, 350, c.canvas.height);
 drawTxt(245, 405, 80, 40, "lime", "Health:")
 drawTxt(245, 455, 80, 40, "lime", "Points:")
 drawTxt(335, 455, 80, 40, "lime", points)
 
 let hp = player.entity.hp
 let Extrahp = player.entity.ExtraHp
 let maxhp = player.entity.MAX_HP

 for (let i = 0; i < maxhp; i++) {
  c.beginPath()
  c.fillStyle = "lime";
  c.fillRect(365 + i * 25, 419, 20 + 2, 30 + 2);
  c.fillStyle = "black";
  c.fillRect(366 + i * 25, 420, 20, 30);
 }

 for (let i = 0; i < hp; i++) {
  c.beginPath()
  c.fillStyle = "lime";
  c.fillRect(371 + i * 25, 427, 10, 16);
 }

 for (let i = 0; i < Extrahp; i++) {
  c.beginPath()
  c.fillStyle = "lime";
  c.fillRect(368 + i * 25, 422, 16, 26);
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
let points = 0
let debug = false
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
 invensility = 0
 inv = 0
 frame = 0
 counterFrame = 0
 counterBullet = 0
 speedShot = 100
 speedChargerShoot = 1
 speed = 0.5
 constructor(img, radius, hp) {
  this.img = img
  this.radius = radius
  this.hp = hp
  this.MAX_HP = hp
  this.ExtraHp = 0
  this.MAX_SPEED = 1.5
  this.MAX_DAMAGE = 30
 }
 hitBox() {
  c.beginPath()
  c.fillStyle = 'white'
  c.arc(player.x, player.y, this.radius, 0, Math.PI * 2, false)
  c.fill()
 }
 draw() {
  if (this.ExtraHp != 0) {
   c.beginPath()
   c.fillStyle = 'lime'
   c.arc(player.x, player.y, this.radius + 6, 0, Math.PI * 2, false)
   c.fill()
   c.beginPath()
   c.fillStyle = 'black'
   c.arc(player.x, player.y, this.radius + 4, 0, Math.PI * 2, false)
   c.fill()
  }
  c.drawImage(this.img, 0, this.counterFrame * 16, 16, 16, player.x - 20, player.y - 20, 40, 40);
 }
 shot() {
  bullets.push(new bullet(player.x, player.y - this.radius, player.bullet.width, false, player.bullet.damge, 0, player.bullet.speed))
 }
 updateShot() {
  this.counterBullet += this.speedChargerShoot
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
  if (this.invensility > 0) {
   this.inv = ++this.inv % 30
  }
  this.updateShot()
  this.animator()
  if (debug) {
   this.hitBox()
  }
  if (!(this.inv >= 5 && !this.invensility == 0)) {
   this.draw()
  } else {
   this.invensility--
  }
  
 }
 hit(DAMAGE) {
  if (!this.invensility >= 1) {
   this.invensility = 50
   if (this.ExtraHp <= 0) {
    this.hp = this.hp - DAMAGE
   } else {
    this.ExtraHp = this.ExtraHp - DAMAGE
   }
   if (this.ExtraHp <= 0) this.ExtraHp = 0
   if (this.hp <= 0) {
    this.dead()
   }
   //   atParticle(10, player.x, player.y, 50, 0, "lime", 0, 6, false, false)
  }
 }
 dead() {
   atParticle(20, player.x, player.y,200, 0, "lime",0, 10, false, false, {velx :1, vely : 1})
 }
 setSpeed(NUMBER_) {
  this.speed = NUMBER_
 }
 setSpeedChargerShot(NUMBER_) {
  this.speedChargerShoot = NUMBER_
 }
 addHealth(type, NUMBER_) {
  if (type == "sh") {
   this.ExtraHp = this.ExtraHp + NUMBER_ > this.MAX_HP ? this.MAX_HP : this.ExtraHp + NUMBER_
  }
  if (type == "ht") {
   this.ExtraHp = this.hp + NUMBER_ > this.MAX_HP ? this.MAX_HP : this.hp + NUMBER_
  }
 }
}

/* Bullet */
class bullet {
 velx = 0
 vely = 0
 constructor(x, y, radius, isEnemy = false, damage = 1, speedx = 0, speedy = 0, color = "lime") {
  this.x = x
  this.y = y
  this.radius = radius
  this.isEnemy = isEnemy
  this.damage = damage
  this.speedx = speedx
  this.speedy = speedy
  this.color = color
 }
 hitBox() {
  c.beginPath()
  c.fillStyle = 'white'
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fill()
 }
 draw() {
  let x, y
  x = this.x - this.radius / 1.5
  y = this.y - this.radius / 1.5
  c.beginPath()
  c.fillStyle = this.color
  if (this.radius >= 10) {
   c.fillRect(x, y, this.radius * 1.4, this.radius * 1.4)
  }
  c.fillRect(x + this.radius / 6, y - this.radius / 5, this.radius * 1, this.radius * 1.8)
  c.fillRect(x - this.radius / 5, y + this.radius / 6, this.radius * 1.8, this.radius * 1)
  c.fill()
 }
 move() {
  this.x += this.speedx
  this.y += this.speedy
 }
 update() {
  this.move()
  if (debug) {
   this.hitBox()
  }
  this.draw()
 }

 hitBullet(indexBullet, Isplayer = false, enemy) {
  if (Isplayer) {
   bullets.splice(indexBullet, 1)
   player.entity.hit(this.damage)
  } else {
   bullets.splice(indexBullet, 1)
   enemy.hit(this.damage)
  }
 }
}
/* Enemy */


class enemy {
 constructor(x, y, radius, hp) {
  this.x = x
  this.y = y
  this.radius = radius
  this.hp = hp
 }
 hitBox() {
  c.beginPath()
  c.fillStyle = 'white'
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fill()
 }
 draw() {
  c.beginPath()
  c.fillStyle = 'red'
  c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
  c.fill()
 }
 update() {
  if (debug) {
   this.hitBox()
  }
  this.draw()
 }
 hit(DAMAGE) {
  this.hp = this.hp - DAMAGE
  atParticle(5, this.x, this.y,40, 0, "red",0, 5, false, false, {velx :1, vely : 1})
 }
 dead() {
  particles.push(new point_entity(this.x, this.y, 20, 5))
   atParticle(10, this.x, this.y,50, 0, "red",0, 8, false, false, {velx :3, vely : 3})
 }
}


class basicEnemy extends enemy {
 f = 0
 frame = 0
 counterFrame = 0
 counterMove = 0
 counterShot = 0
 constructor(x = 0, y = 0, radius = 1, hp = 1, animation = { hasAnimation: false, spriteWidth: 40, img: null, frames: 3, speedAnimationFrame: 10 }, moveEnemy = { continuosMove: false, velx: 1, vely: 1, TimeLapseMove: 100, velTimeLapse: 1 }, BulletEnemy = { hasBullet: true, radius: 5, velx: 0, vely: 1, shots: 1, damage: 1, width: 1, ShotTime: 50, velShotReload: 1 }) {
  super(x, y, radius, hp)
  this.animation = animation
  this.moveEnemy = moveEnemy
  this.BulletEnemy = BulletEnemy
 }
 draw() {
  if (this.animation.hasAnimation) {
   c.drawImage(this.animation.img, 0, this.frame * 16, 16, 16, this.x - 20, this.y - 20, this.animation.spriteWidth, this.animation.spriteWidth);
  } else {
   c.drawImage(this.animation.img, 0, 16, 16, 16, this.x - 20, this.y - 20, this.animation.spriteWidth, this.animation.spriteWidth);
  }
 }
 animator() {
  this.counterFrame++
  this.f = ++this.f % this.animation.speedAnimationFrame + 1
  if (this.f == this.animation.speedAnimationFrame) {
   this.frame = ++this.frame % this.animation.frames
  }
 }
 move() {
  if (this.moveEnemy.continuosMove) {
   this.x = this.x + this.moveEnemy.velx
   this.y = this.y + this.moveEnemy.vely
  } else {
   this.counterMove = (this.counterMove + this.moveEnemy.velTimeLapse) % this.moveEnemy.TimeLapseMove + 1
   if (this.counterMove == this.moveEnemy.TimeLapseMove) {
    this.x = this.x + this.moveEnemy.velx
    this.y = this.y + this.moveEnemy.vely
   }
  }
 }
 shot() {
  for (let i = 0; i < this.BulletEnemy.shots; i++) {
   bullets.push(new bullet(this.x, this.y, this.BulletEnemy.radius, true, this.BulletEnemy.damage, this.BulletEnemy.velx, this.BulletEnemy.vely, "red"))
  }
 }
 updateShot() {
  this.counterShot = (this.counterShot + this.BulletEnemy.velShotReload) % this.BulletEnemy.ShotTime + 1
  if (this.counterShot == this.BulletEnemy.ShotTime) {
   this.shot()
   this.counterShot = 0
  }
 }
 update() {
  this.updateShot()
  this.move()

  if (this.animation.hasAnimation) {
   this.animator()
  }
  super.update()
 }
 hit(DAMAGE_) {
  super.hit(DAMAGE_)

 }
}
/* Effect */

class Particle {
 alfa;
 velx;
 vely
 constructor(x, y, time = 0, alfaDegrase = 0.15, color = "white", gravity = 0, size = "20", isWhile = true, hasAlfa = true, vel = { velx: 0, vely: 0 }) {
  this.centerX = x;
  this.centerY = y;
  this.x = x;
  this.y = y;
  this.timer = time
  this.time = time;
  this.alfaDegrase = alfaDegrase;
  this.color = color;
  this.gravity = gravity;
  this.size = size
  this.isWhile = isWhile
  this.hasAlfa = hasAlfa
  this.vel = vel
  this.reset(this.centerX, this.centerY);
 }
 reset(x, y) {
  this.x = x;
  this.y = y;
  this.velx = Math.random() * this.vel.velx - this.vel.velx / 2; // -0.5 , 0.5
  this.vely = Math.random() * this.vel.vely - this.vel.vely / 2; // -0.5 , 0.5
  this.time = this.timer
  this.alfa = 1;
 }
 draw() {
  c.save();
  c.globalAlpha = this.alfa;
  c.fillStyle = this.color;
  c.fillRect(this.x, this.y, this.size, this.size);
  c.restore();
 }
 update() {
  this.draw();
  this.x = this.x + this.velx;
  this.y = this.y + this.vely + this.gravity;
  if (this.time <= 0) {
   this.alfa = this.alfa - this.alfaDegrase <= 0 ? 0 : this.alfa - this.alfaDegrase

   if (this.alfa <= 0 && this.isWhile) {
    this.reset(this.centerX, this.centerY);
   }
  }
  else {
   this.time = this.time - 1
  }

 }
 updateXY(x, y) {
  this.centerX = x
  this.centerY = y
 }
}

class txt_entity extends Particle {
 constructor(x, y, size, txt = "") {
  super(x, y,60,0, "lime",0.2, size, false, false)
  this.txt = txt

 }
 draw() {
  c.save()
  c.globalAlpha = this.alfa
  c.fillStyle = this.color;

  c.font = "bold " + this.size + "px" + " Arial";
  c.fillText(this.txt, this.x + this.size / 2 - 6, this.y + this.size / 2 + 3, this.size);
  c.restore()
 }
}

class point_entity extends txt_entity {
 constructor(x, y, size, point = 1) {
  super(x, y, size, "+" + point)
  this.point = point
  points = points + point

 }
 
}

//Game
/* Player */
let control = { down: false, up: false, right: false, left: false }

let player = { x: MAX_X / 2, y: 300, entity: new PlayerEntity(PlayerImg, 20, 8), velx: 0, vely: 0, bullet: { damge: 1, speed: -2, type: null, color: "lime", width: 5 } }



let bullets = []
let playerParticles = []
let particles = []
let enemys = [new enemy(200, 200, 20, 2)]
let raound = 1
//fuctions

function spawEnemy(){
 
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

function atParticle(amount = 1, x = 1, y = 1, time = 0, alfaDegrase = 0, color = "white", gravity = 0, size = 20, isWhile = true, hasAlfa = true, vel = {velx:0,vely:0}, player = false) {
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

 /* Bullet */

 bullets.forEach((bullet, index) => {


  bullet.update()
  /* Unpaw */
  if (bullet.x + bullet.radius < 0) {

   bullets.splice(index, 1)

  }
  if (bullet.x - bullet.radius > MAX_X) {

   bullets.splice(index, 1)

  }

  if (bullet.y + bullet.radius < 0) {

   bullets.splice(index, 1)

  }
  if (bullet.y - bullet.radius > MAX_Y) {

   bullets.splice(index, 1)

  }
  if (bullet.isEnemy) {
   const dist = Math.hypot(bullet.x - player.x, bullet.y - player.y)

   if (dist - player.entity.radius - bullet.radius < 1) {
    bullet.hitBullet(index, true)
   }
  } else {

   enemys.forEach((enemy, indexEnemy) => {
    const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y)

    if (dist - enemy.radius - bullet.radius < 1) {
     bullet.hitBullet(index, false, enemy)
    }
   })
  }
 })
 enemys.forEach((enemy, index) => {
  enemy.update()
  if (enemy.hp <= 0) {
   enemy.dead()
   enemys.splice(index, 1)
  }

  const dist = Math.hypot(enemy.x - player.x, enemy.y - player.y)

  if (dist - enemy.radius - player.entity.radius < 0.00001) {
   player.entity.hit(1)

  }
 })
 particles.forEach((particle, index) => {
  particle.update()
  if (!particle.isWhile && particle.hasAlfa) {
   if (particle.time <= 0 && particle.alfa <= 0) {
    particles.splice(index, 1)
   }
  }
  if (!particle.isWhile && !particle.hasAlfa) {
   if( particle.time <= 0){
  particles.splice(index, 1)
   }
  }
 })
 drawUi()

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
 if (control.down) {
  player.vely += player.entity.speed
 }
 if (control.up) {
  player.vely -= player.entity.speed
 }
 if (control.left) {
  player.velx -= player.entity.speed
 }
 if (control.right) {
  player.velx += player.entity.speed
 }

 // simulate friction:
 player.velx *= 0.9;
 player.vely *= 0.9;
 //move
 player.x += player.velx;
 player.y += player.vely;

 //mirror check

 if (player.x + player.entity.radius < 0) {
  player.x = MAX_X
 } else if (player.x - player.entity.radius > MAX_X) {
  player.x = 0
 }

 if (player.y + player.entity.radius < 0) {
  player.y = MAX_Y
 } else if (player.y - player.entity.radius > MAX_Y) {
  player.y = 0
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

}

function fpsCon() {
 var rAF = requestAnimationFrame;
 var prevTime = 0;
 var counter = 0;

 rAF(fpsRender);

 function fpsRender(timestamp) {
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

   console.log(fps)

   prevTime = timestamp;
   counter = 0;
  }

  counter++;
  rAF(fpsRender);
 }
}