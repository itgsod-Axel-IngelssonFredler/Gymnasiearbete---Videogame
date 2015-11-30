/**
 * Created by fredrik.svahn on 20/11/15.
 */

function GameObject(x,y,width,height,color) {
    this.xPos = x;
    this.yPos = y;
    this.velocityX = 0;
    this.velocityY = 0;
    this.color = color;
    this.objectWidth = width;
    this.objectHeight = height;
    this.moveLeft = 0;
    this.moveUp = 0;
    this.moveRight = 0;
    this.moveDown = 0;
    this.speed = 1;
    this.id = "";


    this.tick = function() {
        if((this.moveLeft == 1 && this.moveRight == 1) || (this.moveLeft ==0 && this.moveRight == 0)) {
            this.velocityX = 0;
        }
        else if(this.moveLeft == 1) {
            this.velocityX = -1*this.speed*deltaTime/5;
        }
        else if(this.moveRight == 1) {
            this.velocityX = this.speed*deltaTime/5;
        }

        if((this.moveUp == 1 && this.moveDown == 1) || (this.moveUp == 0 && this.moveDown == 0)) {
            this.velocityY = 0;
        }
        else if(this.moveUp == 1) {
            this.velocityY = -1*this.speed*deltaTime/5;
        }
        else if(this.moveDown == 1) {
            this.velocityY = this.speed*deltaTime/5;
        }

        this.xPos += this.velocityX;
        this.yPos += this.velocityY;
    };

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.xPos,this.yPos,this.objectWidth,this.objectHeight);
    };


}