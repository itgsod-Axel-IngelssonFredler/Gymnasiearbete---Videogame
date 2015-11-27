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
    this.speed = 5;




    var actions = {37: "this.moveLeft", 38: "this.moveUp", 39: "this.moveRight", 40: "this.moveDown"};





    this.tick = function() {
        if((this.moveLeft == 1 && this.moveRight == 1) || (this.moveLeft ==0 && this.moveRight == 0)) {
            this.velocityX = 0;
        }
        else if(this.moveLeft == 1) {
            this.velocityX = -1*this.speed;
        }
        else if(this.moveRight == 1) {
            this.velocityX = this.speed;
        }

        if((this.moveUp == 1 && this.moveDown == 1) || (this.moveUp == 0 && this.moveDown == 0)) {
            this.velocityY = 0;
        }
        else if(this.moveUp == 1) {
            this.velocityY = -1*this.speed;
        }
        else if(this.moveDown == 1) {
            this.velocityY = this.speed;
        }

        this.xPos += this.velocityX;
        this.yPos += this.velocityY;
    };

    this.draw = function(context) {
        context.fillStyle = this.color;
        context.fillRect(this.xPos,this.yPos,this.objectWidth,this.objectHeight);
    };

    this.keyAction = function(keyHash) {
        for(var key in actions) {
            if(keyHash.hasOwnProperty(key) && keyHash[key] == 1) {
                eval(actions[key]+"=1");
            }
            else if (keyHash.hasOwnProperty(key) && keyHash[key] == 0) {
                eval(actions[key]+"=0")
            }
        }
    };


}