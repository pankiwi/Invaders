const c = document.querySelector("canvas").getContext("2d")
const MAX_X_GAME = c.canvas.width
const MAX_Y_GAME = 390
let star_game = false
let debug = false
let buffer_output_ratio = 1
let bounding_rectangle = c.canvas.getBoundingClientRect();
let player = {
 entity: new PlayerEntity(),
 x: MAX_X_GAME / 2,
 y: 300,
 velx: 0,
 vely: 0,
 speed: 0.5,
 radius_hitBox: 20,
 health: 5,
 MAX_health: 5,
 hasShild: false,
 speedShot: 150,
 MIN_speedShot: 50,
 shots: 1,
 MAX_shots: 4,
 MULTI_shot_level: 1,
 MAX_MULTI_shot_level: 4,
 typeBullet: {
  type: "BasicBullet",
  angleShot: 270,
  radius: 10,
  speed: 2,
  damage: 1,
  MAX_damage: 20
 }
}
let enemysObject = [ new enemy(300,100,20,2,1,1,new IA_Crazy_enemy(100,2),{damage:1,angle:90,randx:0,randy:20},imgs.enemy[0],true,{frameSpeed:20,frames:3,width:20})]
let bulletsObject = []
let particleObject = []

function atBullet(type) {

}

function removeObject(index, array = []) {
 array.splice(index, 1)
}

function game() {
 if (star_game) {
  playerMove()
  player.entity.update()

  enemysObject.forEach((enemy, indexEnemy) => {
   enemy.update()

   if(enemy.x + enemy.radius_hitBox > MAX_Y_GAME){
    removeObject(indexEnemy,enemysObject)
   }
  })

  bulletsObject.forEach((bullet, indexBullet) => {
   bullet.update()

   if (bullet.x + bullet.radius_hitBox < 0) {

    removeObject(indexBullet, bulletsObject)

   }
   if (bullet.x - bullet.radius_hitBox > MAX_X_GAME) {

    removeObject(indexBullet, bulletsObject)

   }

   if (bullet.y + bullet.radius_hitBox < 0) {

    removeObject(indexBullet, bulletsObject)

   }
   if (bullet.y - bullet.radius > MAX_Y_GAME) {

    removeObject(indexBullet, bulletsObject)

   }

   if (bullet.Isenemy) {
    const dist = Math.hypot(bullet.x - player.x, bullet.y - player.y)

    if (dist - player.radius_hitBox - bullet.radius_hitBox < 1) {
     bullet.hit(indexBullet)
    }

   }
   else {
    enemysObject.forEach((enemy, indexEnemy) => {
     const dist = Math.hypot(bullet.x - enemy.x, bullet.y - enemy.y)

     if (dist - enemy.radius_hitBox - bullet.radius_hitBox < 1) {
      bullet.hit(indexBullet, enemy, indexEnemy)
     }
    })
   }



  })
 }
}

function animation() {
 requestAnimationFrame(animation)
 /*clear*/
 c.fillStyle = 'rgb(0,0,0,0.2)'
 c.fillRect(0, 0, c.canvas.width, c.canvas.height)

 game()
 /*draw UI*/

 UIConfig_.drawAllUI()

}

window.onload = () => {
 animation();
}

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

 if (UIConfig_.UIS[1].enable) {
  UIConfig_.UIS[1].enable = false
  setUIPlayer(true)
  star_game = true
 }

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