/**
 * Created by fredrik.svahn on 20/11/15.
 */

function GameObject(x,y,width,height,color) {
    var xPos = x;
    var yPos = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.color = color;
    var objectWidth = width;
    var objectHeight = height;


    var moveUp = function() {
      console.log("You pressed Left");
    };




    var actions = {37: moveUp()};

    this.tick = function() {
        xPos += this.velocityX;
        yPos += this.velocityY;
    };

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(xPos,yPos,objectWidth,objectHeight);
    };

    this.keyAction = function(keyHash) {
        
    };


}