class PlayerEntity {
 dead = false
 cB = 0
 constructor() {}
 hitBox() {
  c.beginPath()
  c.fillStyle = 'white'
  c.arc(player.x, player.y, player.radius_hitBox, 0, Math.PI * 2, false)
  c.fill()
 }
 draw() {
  c.beginPath()
  c.arc(player.x, player.y, player.radius_hitBox, 0, Math.PI * 2, false)
  c.fillStyle = "lime"
  c.fill()
 }
 shot() {
  this.bullet(player.x,player.y - player.radius_hitBox)
 }
 updateShot() {
  this.cB += 1
  if (this.cB >= player.speedShot) {
   this.shot()
   this.cB = 0
  }
 }
 update() {
  this.updateShot()
  if (debug) {
   this.hitBox()
  }
  this.draw()
 }
 bullet(x,y){
  switch(player.typeBullet.type){
   //Isenemy = false,x, y, radius_hitBox, speed, angle, damage
   case "BasicBullet":
    bulletsObject.push( new bullet(false,x,y,player.typeBullet.radius,player.typeBullet.speed,player.typeBullet.angleShot,player.typeBullet.damage))
    break;
  }
 }
 hit(damage){
  Sound_source_.playSound("hit",1)
  if(player.hasShild){
   player.hasShild = false
  }else{
   player.health = player.health - damage
   if(player.health <= 0){
    this.dead = true
   }
  }
 }
}

class EntityTst {
 fc = 0
 frame = 0
 constructor(x,y,img, Hasanimation = true,animation = {frameSpeed: 20,frames: 3,width:20}){
  this.x = x
  this.y = y
  this.img = img
  this.Hasanimation = Hasanimation
  this.animation = animation
 }
 update(){
  this.fc = ++this.fc % this.animation.frameSpeed + 1
  if (this.fc == this.animation.frameSpeed) {
   this.frame = ++this.frame % this.animation.frames
  }
  if(this.Hasanimation){
   c.drawImage(this.img, 0, this.frame * 16, 16, 16, this.x - 20, this.y - 20, this.animation.width, this.animation.width);
  }else{
  c.drawImage(this.img, 0, 16, 16, 16, this.x - 20, this.y - 20,20,20);
  }
 }
}

 
class enemy {
 fc = 0
 frame = 0
 constructor(x, y, radius_hitBox, hp, speed,damageToch, IA,bulletCustom = {damage: 1,angle:90,speed:1,radius:10,randx :0, randy: 0},img, Hasanimation = true,animation = {frameSpeed: 20,frames: 3,width:20}) {
  this.x = x
  this.y = y
  this.radius_hitBox = radius_hitBox
  this.hp = hp
  this.speed = speed
  this.damageToch = damageToch
  this.IA = IA
  this.bulletCustom = bulletCustom
  this.img = img
  this.Hasanimation = Hasanimation
  this.animation = animation
 }
 hitBox() {
  c.beginPath()
  c.fillStyle = 'white'
  c.arc(this.x, this.y, this.radius_hitBox, 0, Math.PI * 2, false)
  c.fill()
 }
 draw() {
  if (this.Hasanimation) {
   c.drawImage(this.img, 0, this.frame * 16, 16, 16, this.x - 20, this.y - 20, this.animation.width, this.animation.width);
  } else {
   c.drawImage(this.img, 0, 16, 16, 16, this.x - 20, this.y - 20, this.animation.width, this.animation.width);
  }
 }
 shot() {
  bulletsObject.push( new bullet(true,this.x + (this.bulletCustom.randx),this.y + (this.bulletCustom.randy),this.bulletCustom.radius,this.bulletCustom.speed,this.bulletCustom.angle,this.bulletCustom.damage))
  console.log("a")
 }
 animationFrame(){
  this.fc = ++this.fc % this.animation.frameSpeed + 1
  if (this.fc == this.animation.frameSpeed) {
   this.frame = ++this.frame % this.animation.frames
  }
 }
 IAController() {
  let nd = this.IA.nueron(this)
  switch (nd.direction) {
   case "u":
    this.y -= this.speed
    break
   case "d":
    this.y += this.speed
    break
   case "r":
    this.x -= this.speed
    break
   case "l":
    this.x += this.speed
    break
  }
  if (nd.shot) {
   this.shot()
  }
 }
 update() {
  this.animationFrame()
  this.IAController()
  if (debug) {
   this.hitBox()
  }
  this.draw()
 }
 hit(damage, index_enemy){
  this.hp = this.hp - damage
  if(this.hp <= 0){
   this.dead(index_enemy)
  }
 }
 dead(index_enemy) {
  Sound_source_.playSound("dead",0)
  removeObject(index_enemy, enemysObject)
 }
}

class enemy_bomb extends enemy {
 //x, y, radius_hitBox, hp, speed,damageToch, IA,bulletCustom = {damage: 1,angle:90,speed:1,radius:10},img, Hasanimation = true,animation = {randx = 20, randy = 0,width = 20,frameSpeed: 20,frames: 3}
 constructor(x,y,radius_hitBox,hp,speed,damageToch,bulletCustom = {damage: 1,angle:90,speed:1,radius:10,randx: 20, randy: 0},img,Hasanimation,animation = {frameSpeed: 20,frames: 3},bullets){
  
  super(x,y,radius_hitBox,hp,speed,damageToch,new IA_Bomb(),bulletCustom,img,Hasanimation,animation)
  
  this.bullets = bullets
  
 }
 shot(){}
 dead(index_enemy) {
  Sound_source_.playSound("shot",1)
  removeObject(index_enemy, enemysObject)
  for(let i = 0; i < this.bullets;i++){
   bulletsObject.push( new bullet(true,this.x + (this.bulletCustom.randx),this.y + (this.bulletCustom.randy),this.bulletCustom.radius,this.bulletCustom.speed,this.bulletCustom.angle * i,this.bulletCustom.damage))
  }
 }
}