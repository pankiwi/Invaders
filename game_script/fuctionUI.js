// the code is the property of Frank Poth 03/10/2017


var Button, controller;

// basically a rectangle, but it's purpose here is to be a button:
Button = function(enable, x, y, width, height, color, txt = "", widthTxt = 20, txtColor = color, out = function() {}) {

 this.active = false;
 this.enable = enable
 this.color = color;
 this.height = height;
 this.width = width;
 this.x = x;
 this.y = y;
 this.txt = txt
 this.widthTxt = widthTxt
 this.txtColor = txtColor
 this.out = out
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

 buttons: [],

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
    if (button.containsPoint((touch.clientX - bounding_rectangle.left) * buffer_output_ratio, (touch.clientY - bounding_rectangle.top) * buffer_output_ratio) && button.enable) {

     button.active = true;
     if(button.out()){
      button.out();
     }
     
     
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
//drawScreen by me

var ScreenUI_, UIConfig_

ScreenUI_ = function(enable = false, Draw = function() {}) {
 this.draw = Draw
 this.enable = enable
}

UIConfig_ = {
 UIS: [],
 drawAllUI: function() {
  this.UIS.forEach((ui, index) => {
   if (ui.enable) {
    ui.draw()
   }
  })
 }
}
//futions
function drawButton(c, button) {
 c.beginPath()
 c.fillStyle = button.color;
 c.fillRect(button.x, button.y, button.width, button.height);
 c.fill()
 c.fillStyle = "black";
 c.fillRect(button.x + 3, button.y + 3, button.width - 6, button.height - 6);
 c.fill()

 c.fillStyle = button.txtColor;
 c.textAlign = "center"
 c.font = "bold " + button.widthTxt + "px" + " bit";
 c.fillText(button.txt, button.x + button.width/2, button.y + button.height/2, button.widthTxt);

 if (button.active) {
  c.beginPath()
  c.fillStyle = "black";
  c.fillRect(button.x, button.y, button.width, button.height);
  c.fill()
  c.fillStyle = button.color;
  c.fillRect(button.x + 3, button.y + 3, button.width - 6, button.height - 6);
  c.fill()

  c.fillStyle = "black";
  c.font = "bold " + button.widthTxt + "px bit";
  c.textAlign = "center"
  c.fillText(button.txt, button.x + button.width/2, button.y + button.height/2, button.widthTxt);

 }
}

function drawTxt(c, x, y, width, widthTxt, color, txt, pos, alfa) {
 c.beginPath()
 c.fillStyle = color;
 c.font = widthTxt + "px bit";
 c.globalAlpha = alfa
 c.textAlign = pos
 c.fillText(txt, x, y, width);
}