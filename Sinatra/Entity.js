Game = require("./MainFile");
Tickspeed = Game.tickspeed;

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

    this.tick = function() {
        this.posX += this.speedX;
        this.posY += this.speedY;
    }
}


function Player(posX,posY,width,height) {
    Entity.call(this,posX,posY,width,height);
    this.color = "green";
    this.firerate = 1000;
    this.projectileSpeed = -40;
    var fireCooldown = 0;
    var firing = 1;
     

        this.fire = function(Entities) {
            with(this) {
            var particleWidth = 10;
            var particleHeight = 20;
            var accuracy = 0.9;
            var particle = new Particle(posX+width/2-particleWidth/2,posY-particleHeight,particleWidth,particleHeight);        
            particle.speedY = this.projectileSpeed;
            particle.speedX = Math.random(1-accuracy)*2-Math.random(1-accuracy)*2;
            Entities.push(particle);
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
    this.color = "#FF00FF";
    Entity.call(this,posX,posY,width,height);

    this.tick = function() {
        this.posY += parseInt(this.speedY);
        this.posX += parseInt(this.speedX);
        if(this.posY>=Game.windowHeight) {
            this.deleted = true;
        }
    }

}



exports.Entity = Entity;
exports.Player = Player;
exports.Enemy = Enemy;
exports.Particle = Particle;