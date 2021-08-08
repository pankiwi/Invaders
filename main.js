//Canvas
const canvas = document.getElementById("main")
canvas.width = 600
canvas.height = 500
const c = canvas.getContext("2d")

const MAX_X = canvas.width
const MAX_Y = canvas.height

const size_box = 10

let playerX = MAX_X / 2
let playerY = 460

let basicEnemyImg, PlayerImg

PlayerImg = new Image();
PlayerImg.src = "src/player.png"

basicEnemyImg = new Image();
basicEnemyImg.src = "src/enemy.png"

class Player {
  counterBullet = 0
  speedShot = 100
  constructor(img, radiohit, hp) {
    this.img = img
    this.radiohit = radiohit
    this.hp = hp
  }
  draw() {
//    c.drawImage(this.img, 0, this.counterFrame * 16, 16, 16, playerX-20, playerY-20, 40, 40);
    c.beginPath()
    c.fillStyle = 'white'
    c.arc(playerX, playerY, this.radiohit, 0, Math.PI * 2, false)
    c.fill()
  }
  shot(){
    bullets.push(new bullet(playerX , playerY , 10,false))
  }
  updateframe() {
    this.counterBullet++
    
    if(this.counterBullet > this.speedShot){
      this.shot()
      this.counterBullet = 0
    }
  }
  update() {
    this.updateframe()
    this.draw()
    
  }
}

class bullet {
  constructor( x, y, radiohit, isEnemy = false, vel = 1, damage = 1, Extra = null) {
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
    c.arc(this.x , this.y, this.radiohit, 0, Math.PI * 2, false)
    c.fill()
  }
  updateframe() {
    if(!this.isEnemy){
      this.y = this.y - this.vel
    }else{
      this.y = this.y + this.vel
    }
  }
  update() {
    this.updateframe()
    this.draw()
  }
}

class enemy {
  constructor( x, y, radiohit, hp) {
    this.x = x
    this.y = y
    this.radiohit = radiohit
    this.hp = hp
  }
  draw() {

    c.beginPath()
    c.fillStyle = 'white'
    c.arc(this.x , this.y, this.radiohit, 0, Math.PI * 2, false)
    c.fill()
  }
  updateframe() {
    
  }
  update() {
    this.updateframe()
    this.draw()
  }
  hit(DAMAGE){
    this.hp = this.hp - DAMAGE
  }
}


const player = new Player(PlayerImg,20, 5)

let bullets = []

let enemys = [ new enemy(MAX_X/2, 100,20,2)]

function animation() {
  
  requestAnimationFrame(animation)
  try{
  c.clearRect(0, 0, canvas.width, canvas.height)
  player.update()
  
  
  bullets.forEach( (bullet, index) => {
    bullet.update()
    if(!bullet.isEnemy && bullet.y <= 0 - bullet.radiohit){
      bullets.splice(index,1)
    }
    if (bullet.isEnemy && bullet.y >= MAX_X ) {
      bullets.splice(index, 1)
    }
  })
  enemys.forEach( (enemy, index) => {
    enemy.update()
    bullets.forEach((bullet, indexBullet) => {
      const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y)
      
      if(dist - enemy.radiohit - bullet.radiohit < 1){
        bullets.splice(indexBullet, 1)
        enemy.hit(bullet.damage)
        if(enemy.hp <= 0){
        enemys.splice(index, 1)
        console.log(enemy.hp + "/" + bullet.damage)
        }
      }
    })
  })
 
 }catch(e){
   mensaje(e)
 } 
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

