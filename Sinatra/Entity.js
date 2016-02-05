var idCount = 0;

//function addEntity() {
	//idCount+=1;
	//return idCount;
//}

function Entity(posX, posY, width, height){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;

    this.tick = function(keyinput) {
    }
}


function Player(posX,posY,width,height) {
    Entity.call(this,posX,posY,width,height);
    this.color = "green";

       this.tick = function(keyinput) {
        if(keyinput.KEY_LEFT==1) {
            this.speedX = -this.speed;
        }
        else if(keyinput.KEY_RIGHT) {
            this.speedX = this.speed;
        }
        else {
            this.speedX = 0;
        }

        if(keyinput.KEY_UP==1) {
            this.speedY = -this.speed;
        }
        else if(keyinput.KEY_DOWN) {
            this.speedY = this.speed;
        }
        else {
            this.speedY = 0;
        }

        this.posX += this.speedX;
        this.posY += this.speedY;
    }
    
}

function Enemy(posX,posY,width,height) {
    Entity.call(this,posX,posY,width,height);
    this.color = "red";
}

function Particle(posX,posY,width,height) {
    Entity.call(this,posX,posY,width,height);

}



exports.Entity = Entity;
exports.Player = Player;
exports.Enemy = Enemy;