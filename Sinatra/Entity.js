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
        if(this.posY>=550) {
            delete this;
        }
        this.posX += this.speedX;
        this.posY += this.speedY;
    }
}


function Player(posX,posY,width,height,entities) {
    Entity.call(this,posX,posY,width,height);
    this.color = "green";
    this.firing = 0;
    this.firerate = 100;
    this.projectileSpeed = -10;
    this.projectiles = [];



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

        if(keyinput.KEY_SPACE==1) {
            with(this) {
                    var particle = new Particle(posX+width/2,posY,10,10);
                    particle.speedY = projectileSpeed;
                    projectiles.push(particle);  
            }
           

        }
        else {
            try {
                clearInterval(interval);
            } catch(e) {
               
            }
        }

        this.posX += this.speedX;
        this.posY += this.speedY;
    }
    

}

function Enemy(posX,posY,width,height) {
    Entity.call(this,posX,posY,width,height);
    this.color = "red";
    this.speedX = 3;
    this.speedY = 0;

    this.tick = function() {
        with(this) {
        posX += speedX;
        posY += speedY;

        if(posX+width>=800||posX<=0) {
            speedX*=-1;
        }
        }
    }

}

function Particle(posX,posY,width,height) {
    this.deleted = false;
    Entity.call(this,posX,posY,width,height);
    this.tick = function(keyinput) {
        if(this.posY>=550) {
            this.deleted = true;
        }
    }
}



exports.Entity = Entity;
exports.Player = Player;
exports.Enemy = Enemy;
exports.Particle = Particle;