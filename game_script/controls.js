let control = { down: false, up: false, right: false, left: false }
//enable, x, y, width, height, color, txt = "", widthTxt = 20, txtColor = color, out = function() {}
controller.buttons.push( new Button(false,100, 400, 60, 60, "lime", "↑"))
controller.buttons.push( new Button(false,100, 530, 60, 60, "lime", "↓"))
controller.buttons.push( new Button(false,30, 465, 60, 60, "lime", "←"))
controller.buttons.push( new Button(false,170, 465, 60, 60, "lime", "→"))

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

function playerMove(){
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
  player.vely += player.speed
 }
 if (control.up) {
  player.vely -= player.speed
 }
 if (control.left) {
  player.velx -= player.speed
 }
 if (control.right) {
  player.velx += player.speed
 }

 // simulate friction:
 player.velx *= 0.9;
 player.vely *= 0.9;
 //move
 player.x += player.velx;
 player.y += player.vely;

 //mirror check

 if (player.x + player.radius_hitBox < 0) {
  player.x = MAX_X_GAME
 } else if (player.x - player.radius_hitBox > MAX_X_GAME) {
  player.x = 0
 }

 if (player.y + player.radius_hitBox < 0) {
  player.y = MAX_Y_GAME
 } else if (player.y - player.radius_hitBox > MAX_Y_GAME) {
  player.y = 0
 }

 /* reset */
 control.down = control.up = control.left = control.right = false

}