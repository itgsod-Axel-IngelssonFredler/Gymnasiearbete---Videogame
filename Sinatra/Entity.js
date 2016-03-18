Game = require('./MainFile');
var events = require('events');
console.log(Game)
Tickspeed = tickspeed;

console.log(Tickspeed);

function Entity(posX, posY, width, height){
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.deleted = false;
    this.id = "Default";
    this.tick = function(Entities) {
        this.posX += this.speedX*Tickspeed;
        this.posY += this.speedY*Tickspeed;
        console.log(this.deleted);

    }
}


function Player(posX,posY,width,height) {
    Entity.call(this,posX,posY,width,height);
    this.color = "green";
    this.firerate = 15;
    this.projectileSpeed = -5;
    var fireCooldown = 0;
    var shotsPerFire = 1;
    var accuracy = 0.8;
    var particleWidth = 0;
    var particleHeight = 0;

    this.id = "Player";
        this.fire = function(Entities) {
            with(this) {
            
            for(var i = 0; i < shotsPerFire; i++) {
                var particle = new Particle(posX+width/2-particleWidth/2,posY-particleHeight,particleWidth,particleHeight,"img/Basic_Rocket.png");        
                particle.speedY = this.projectileSpeed;
                particle.speedX = (Math.random()*(5+5)-5)*(1-accuracy);
                Entities.push(particle);
            }
            }
        }    


       this.tick = function(Entities,keyinput) {
        fireCooldown -= 16.67;

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

        if(keyinput.KEY_SPACE==1&&fireCooldown<=0) {
            with(this) {
               fire(Entities);
               fireCooldown = 1000/firerate;
            }
            
        }
        else {
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
    this.testVariable = 0;
    this.id = "Enemy";

    this.tick = function(Entities) {
        with(this) {
        posX += speedX;
        posY += speedY;
        if(this.deleted==true) {
            Entities.splice(Entities.indexOf(this),1);
        }
        if(posX+width>=800||posX<=0) {
            speedX*=-1;
        }
        }
    }

}

function Particle(posX,posY,width,height,imageSrc) {
    this.color = "#FF5000";
    this.src = imageSrc;
    Entity.call(this,posX,posY,width,height);
    this.collisionCheck = function(object) {
        if (this.posX + this.width > object.posX && object.posX + object.width > this.posX &&
            this.posY + this.height > object.posY && object.posY + object.height > this.posY){
            //console.log("Collision!");     
            object.color = "#FFFF00";
        }

            };
    this.tick = function(Entities) {
        this.posY += this.speedY;
        this.posX += this.speedX;
        for(var i = 0; i < Entities.length;i++) {
            if(Entities[i]!=this) {
                this.collisionCheck(Entities[i]);
            }
        }
        if(this.posY<0) {
            this.deleted = true;

        }
    }

}




exports.Entity = Entity;
exports.Player = Player;
exports.Enemy = Enemy;
exports.Particle = Particle;