

class bullet {
 constructor(Isenemy = false,x, y, radius_hitBox, speed, angle, damage) {
  this.x = x
  this.y = y
  this.radius_hitBox = radius_hitBox
  this.speed = speed
  this.angle = angle
  this.Isenemy = Isenemy
  this.damage = damage
 }
 hitBox() {
  c.beginPath()
  c.fillStyle = 'white'
  c.arc(this.x, this.y, this.radius_hitBox, 0, Math.PI * 2, false)
  c.fill()
 }
 draw() {
  c.beginPath()
  c.fillStyle = 'lime'
  c.arc(this.x, this.y, this.radius_hitBox, 0, Math.PI * 2, false)
  c.fill()
 }
 updateBullet(){
  let angle = this.angle * (Math.PI/180)
  this.x += Math.cos(angle) * this.speed
  this.y += Math.sin(angle) * this.speed 
 }
 update() {
  this.updateBullet()
  if (debug) {
   this.hitBox()
  }
  this.draw()
 }
 hit(index_bullet,enemy,index_enemy){
  if(this.Isenemy){
   player.entity.hit(this.damage)
  }else{
   enemy.hit(this.damage,index_enemy)
   
  }
  removeObject(index_bullet,bulletsObject)
 }
}

