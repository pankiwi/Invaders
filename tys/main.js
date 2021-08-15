//Canvas
const canvas = document.getElementById("main")

const c = canvas.getContext("2d")

const MAX_X = canvas.width
const MAX_Y = canvas.height

let debug = true

let playerX = MAX_X / 2
let playerY = 460

let basicEnemyImg, PlayerImg

PlayerImg = new Image();
PlayerImg.src = "src/player.png"

basicEnemyImg = new Image();
basicEnemyImg.src = "src/basicEnemy.png"

class Player {
  frame = 0
  counterFrame = 0
  counterBullet = 0
  speedShot = 100
  constructor(img, radiohit, hp) {
    this.img = img
    this.radiohit = radiohit
    this.hp = hp
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'white'
    c.arc(playerX, playerY, this.radiohit, 0, Math.PI * 2, false)
    c.fill()
  }
  draw() {
    c.drawImage(this.img, 0, this.counterFrame * 16, 16, 16, playerX - 20, playerY - 20, 40, 40);
  }
  shot() {
    bullets.push(new bullet(playerX, playerY, 10, false))
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
    atParticle(10, playerX, playerY, 50, 0, "lime", 0, 6, false, false)
  }
  dead() {
    atParticle(20, playerX, playerY, 100, 0.05, "lime", 0, 10, false, true, 4)
  }
}

class bullet {
  constructor(x, y, radiohit, isEnemy = false, vel = 1, damage = 1, Extra = null) {
    this.x = x
    this.y = y
    this.radiohit = radiohit
    this.isEnemy = isEnemy
    this.vel = vel
    this.damage = damage
  }
  draw() {

    c.beginPath()
    c.fillStyle = 'white'
    c.arc(this.x, this.y, this.radiohit, 0, Math.PI * 2, false)
    c.fill()
  }
  updateframe() {
    if (!this.isEnemy) {
      this.y = this.y - this.vel
    } else {
      this.y = this.y + this.vel
    }
  }
  update() {
    this.updateframe()
    this.draw()
  }
}

class enemy {
  constructor(x, y, radiohit, hp) {
    this.x = x
    this.y = y
    this.radiohit = radiohit
    this.hp = hp
  }
  hitBox() {
    c.beginPath()
    c.fillStyle = 'white'
    c.arc(this.x, this.y, this.radiohit, 0, Math.PI * 2, false)
    c.fill()
  }
  draw() {

  }
  update() {
    if (debug) {
      this.hitBox()
    }
    this.draw()
  }
  hit(DAMAGE) {
    this.hp = this.hp - DAMAGE
    atParticle(10, this.x, this.y, 50, 0, "red", 0, 6, false, false, 2)
  }
  dead() {
    atParticle(10, this.x, this.y, 100, 0.05, "red", 0, 10, false, true, 3)
  }
}

class basicEnemy extends enemy {
  frame = 0
  counterFrame = 0
  counterBullet = 0
  counterMove = 0
  constructor(x, y, img, radiohit, hp, shotTime = 50, shots = 1, speed = 50) {
    super(x, y, radiohit, hp)
    this.img = img
    this.shotTime = shotTime
    this.shots = shots
    this.speed = speed
  }
  draw() {
    c.drawImage(this.img, 0, this.counterFrame * 16, 16, 16, this.x - 20, this.y - 20, 40, 40);
  }
  animator() {
    this.frame++
    switch (this.frame) {
      case 10:
        this.counterFrame++
        break;
      case 20:
        this.counterFrame++
        break;
        case 30:
          this.counterFrame = 0
          this.frame = 0
        break;
        
    }
  }
  shot() {
    for (let i = 0; i < this.shots; i++) {
      bullets.push(new bullet(this.x, this.y + (this.radiohit * 3 * i), 10, true))
    }
  }
  updateShot() {
    this.counterBullet++
    if (this.counterBullet >= this.shotTime) {
      this.shot()
      this.counterBullet = 0
    }
  }
  move() {
    this.counterMove++
    if(this.counterMove >= this.speed){
    this.y = this.y + 10
    this.counterMove = 0
    }
  }
  update() {
    this.updateShot()
    this.move()
    this.animator()
    super.update()
  }
}
class Particle {
  alfa;
  velx;
  vely
  constructor(x, y, time, alfaDegrase, color, gravity, size, isWhile = true, hasAlfa = true, vel = 1) {
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
    this.vel = vel
    this.reset(this.centerX, this.centerY);
  }
  reset(x, y) {
    this.x = x;
    this.y = y;
    this.velx = Math.random() * this.vel - this.vel / 2; // -0.5 , 0.5
    this.vely = Math.random() * this.vel - this.vel / 2; // -0.5 , 0.5
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
      this.alfa = this.alfa - this.alfaDegrase;

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

let bullets = []
let playerParticles = []
let particles = []
let enemys = [new basicEnemy(MAX_X / 2, 100, basicEnemyImg, 20, 2, 300, 2)]

const player = new Player(PlayerImg, 20, 3)

function particlePlayer(amount) {
  for (let i = 0; i < amount; i++) {
    playerParticles.push(new Particle(playerX, playerY, i, 0.05, "lime", 4, 3, true, true))
  }
}

function atParticle(amount, x, y, time, alfaDegrase, color, gravity, size, isWhile = true, hasAlfa = true, vel = 1) {
  for (let i = 0; i < amount; i++) {
    particles.push(new Particle(x, y, time + i, alfaDegrase, color, gravity, size, isWhile, hasAlfa, vel))
  }
}
particlePlayer(20)





function animation() {

  requestAnimationFrame(animation)

  c.clearRect(0, 0, canvas.width, canvas.height)
  mensaje(particles.length)
  playerParticles.forEach((particle, index) => {
    particle.update()
    particle.updateXY(playerX, playerY)

  })
  player.update()


  bullets.forEach((bullet, index) => {
    bullet.update()
    if (!bullet.isEnemy && bullet.y <= 0 - bullet.radiohit) {
      bullets.splice(index, 1)
    }
    if (bullet.isEnemy && bullet.y >= MAX_X) {
      bullets.splice(index, 1)
    }

    const dist = Math.hypot(bullet.x - playerX, bullet.y - playerY)

    if (dist - player.radiohit - bullet.radiohit < 1 && bullet.isEnemy) {
      bullets.splice(index, 1)
      player.hit(bullet.damage)
      if (player.hp <= 0) {
        player.dead()
        alert("your hare dead")
      }
    }
  })
  enemys.forEach((enemy, index) => {
    enemy.update()
    bullets.forEach((bullet, indexBullet) => {
      const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y)

      if (dist - enemy.radiohit - bullet.radiohit < 1 && !bullet.isEnemy) {
        bullets.splice(indexBullet, 1)
        enemy.hit(bullet.damage)
        if (enemy.hp <= 0) {
          enemy.dead()
          enemys.splice(index, 1)
          console.log(enemy.hp + "/" + bullet.damage)
        }
      }
    })
  })
  particles.forEach((particle, index) => {
    particle.update()
    if (!particle.isWhile && particle.hasAlfa && particle.time <= 0 && particle.alfa <= 0) {
      particles.splice(index, 1)
    }
    if (!particle.isWhile && !particle.hasAlfa && particle.time <= 0) {
      particles.splice(index, 1)
    }
  })

}

function mensaje(cadena) {
  var lon = (MAX_X - (50 * MAX_Y)) / 2;
  c.fillStyle = "white";
  c.font = "bold 75px Arial";
  c.fillText(cadena, MAX_X / 3, MAX_Y / 3, 200);
}

function playerMove(keyId = 0) {
  if (keyId == 39 && !(playerX + player.radiohit >= MAX_X)) {
    playerX += 10
  }
  if (keyId == 37 && !(playerX - player.radiohit <= 0)) {
    playerX -= 10
  }
  if (keyId == 38 && !(playerY - player.radiohit <= 0)) {
    playerY -= 10
  }
  if (keyId == 40 && !(playerY + player.radiohit >= MAX_Y)) {
    playerY += 10
  }
}

window.onload = () => {
  animation()
}

document.addEventListener("keydown", e => {
  playerMove(e.which)
});
document.addEventListener("keyup", e => {
  playerMove(e.which)
});