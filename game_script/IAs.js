class IA {
 constructor(shotSpeed = 100, ContiniosMove = false, lapseMove = 100) {
  this.shotSpeed = shotSpeed
  this.ContiniosMove = ContiniosMove
  this.lapseMove = lapseMove
  this.cS = shotSpeed
  this.cl = lapseMove
 }
 nueron(enemy) {
  let out = { direction: "", shot: true }

  this.cS -= 1
  if (!this.ContiniosMove) {
   this.cl -= 1
   if (this.cl <= 0) {
    this.cl = this.lapseMove
    out.direction = "d"
   }
  } else {
   out.direction = "d"
  }
  if (this.cS <= 0) {
   this.cS = this.shotSpeed
   out.shot = true
  } else {
   out.shot = false
  }
  if (enemy.x)
   return out
 }
}

class IA_Bomb extends IA{
 constructor(){
  super(0,true,0)
 }
 nueron(){
  let out = { direction: "d", shot: true }
  return out
 }
}

class IA_BasicEnemy extends IA {
 last_direccion = ''
 cI = 50
 constructor(shotSpeed = 100, lapseMove = 10, IAlevel) {
  super(shotSpeed, false, lapseMove)
  this.IAlevel = IAlevel
 }
 nueron(enemy) {
  let out = { direction: "", shot: true }
  let directions = ["d", "r", "l"]
  this.cS -= 1
  this.cI -= 1 * this.IAlevel
  this.cl -= 1
  if (this.cI <= 0) {
   this.cI = 50
   this.last_direccion = directions[Math.floor(Math.random() * directions.length)]
  }
  if (this.cl <= 0) {
   out.direction = this.last_direccion
   this.cl = this.lapseMove
  }
  if (this.cS <= 0) {
   out.shot = true
   this.cS = this.shotSpeed
  } else {
   out.shot = false
  }
  if (enemy.x + enemy.radius_hitBox >= MAX_X_GAME) {
   this.last_direccion = "r"
  }
  if (enemy.x - enemy.radius_hitBox <= 0) {
   this.last_direccion = "l"
  }
  return out
 }
}

class IA_Crazy_enemy extends IA {
 last_direccion = ''
 cI = 50
 constructor(shotSpeed = 100, IAlevel) {
  super(shotSpeed, true)
  this.IAlevel = IAlevel
 }
 nueron(enemy) {
  let out = { direction: "", shot: true }
  let directions = ["d", "r", "l"]
  this.cS -= 1
  this.cI -= 1 * this.IAlevel * 2
  if (this.cI <= 0) {
   this.cI = 50
   this.last_direccion = directions[Math.floor(Math.random() * directions.length)]
  }

  if (this.cS <= 0) {
   out.shot = true
   this.cS = this.shotSpeed
  } else {
   out.shot = false
  }
  if (enemy.x + enemy.radius_hitBox >= MAX_X_GAME) {
   this.last_direccion = "r"
  }
  if (enemy.x - enemy.radius_hitBox <= 0) {
   this.last_direccion = "l"
  }
  out.direction = this.last_direccion
  return out
 }
}
class IA_sniper extends IA {
 last_direccion = ''
 next_direccion = ''
 constructor(shotSpeed = 100, IAlevel = 1, start_direction = "r") {
  super(shotSpeed, true)
  this.IAlevel = IAlevel
  this.next_direccion = start_direction
 }
 nueron(enemy) {
  let out = { direction: "", shot: true }
  let directions = ["d", "r", "l"]
  let changeDown = Math.random() * this.IAlevel >= 1 ? true : false
  this.cS -= 1

  if (this.cS <= 0) {
   out.shot = true
   this.cS = this.shotSpeed
  } else {
   out.shot = false
  }

  this.last_direccion = this.next_direccion

  if (enemy.x + enemy.radius_hitBox >= MAX_X_GAME) {
   if (changeDown) {
    this.last_direccion = "d"
   } else {
    this.next_direccion = "r"
   }
  }
  if (enemy.x - enemy.radius_hitBox <= 0) {
   if (changeDown) {
    this.last_direccion = "d"
   } else {
    this.next_direccion = "l"
   }
  }

  out.direction = this.last_direccion
  return out
 }
}

class IA_sekker extends IA {
 last_direccion = ''
 next_direccion = ''
 constructor(shotSpeed = 100, IAlevel = 1) {
  super(shotSpeed, true)
  this.IAlevel = IAlevel
 }
 nueron(enemy) {
  let out = { direction: "", shot: true }
  let directions = ["d", "r", "l"]
  let changeDown = Math.random() * this.IAlevel >= 1 ? true : false
  this.cS -= 1

  if (this.cS <= 0 && Math.sqrt(Math.pow(enemy.x - player.x, 2)) < player.radius_hitBox) {
   out.shot = true
   this.cS = this.shotSpeed
  } else {
   out.shot = false
  }
  this.last_direccion = this.next_direccion
  if (!(Math.sqrt(Math.pow(enemy.x - player.x, 2)) < player.radius_hitBox)) {
   if (enemy.x > player.x) {
    this.next_direccion = "r"
   } else
   if (enemy.x < player.x) {
    this.next_direccion = "l"
   }
  } else {
   this.next_direccion = ""
  }
  out.direction = this.last_direccion


  return out
 }
}