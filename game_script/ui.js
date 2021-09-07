//backgrpund
UIConfig_.UIS.push(new ScreenUI_(true, () => {

}))
//gameMenu
UIConfig_.UIS.push(new ScreenUI_(true, () => {
 drawTxt(c, c.canvas.width / 2 - 5, c.canvas.height / 2, 400, 100, "lime", "Invasders", "center", 0.5)

 drawTxt(c, c.canvas.width / 2, c.canvas.height / 2, 400, 100, "lime", "Invasders", "center", 1)

 drawTxt(c, 300, 500, 200, 30, "white", "click for star Game", "center", 1)
}))
//statPlayer
UIConfig_.UIS.push(new ScreenUI_(false, () => {
 c.beginPath()
 c.fillStyle = "lime";
 c.fillRect(0, 390, c.canvas.width, c.canvas.height);
 c.fillStyle = "black";
 c.fillRect(0, 393, c.canvas.width, c.canvas.height);
}))
//controls
UIConfig_.UIS.push(new ScreenUI_(false, () => {

 drawButton(c, controller.buttons[0])
 drawButton(c, controller.buttons[1])
 drawButton(c, controller.buttons[2])
 drawButton(c, controller.buttons[3])
}))
//stat
UIConfig_.UIS.push(new ScreenUI_(false, () => {
 c.beginPath()
 c.fillStyle = "lime";
 c.fillRect(270, 390, 350, c.canvas.height);
 c.fillStyle = "black";
 c.fillRect(273, 393, 350, c.canvas.height);
}))

UIConfig_.UIS.push(new ScreenUI_(false, () => {
 c.beginPath()
 
}))


function setUIPlayer(bool) {
 controller.buttons[0].enable = bool
 controller.buttons[1].enable = bool
 controller.buttons[2].enable = bool
 controller.buttons[3].enable = bool
 UIConfig_.UIS[2].enable = bool
 UIConfig_.UIS[3].enable = bool
 UIConfig_.UIS[4].enable = bool

}
