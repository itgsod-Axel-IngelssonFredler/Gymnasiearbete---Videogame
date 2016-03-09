Game = require("./MainFile");
Tickspeed = Game.tickspeed;
Entities = Game.Entities;
Deltatime = Game.deltaTime;
keyinput = Game.keyinput;

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


function Player(posX,posY,width,height,entities) {
    Entity.call(this,posX,posY,width,height);
    this.color = "green";
    this.firerate = 3;
    this.projectileSpeed = -10;
    var fireCooldown = 0;
     

        this.fire = function() {
            console.log("firing");
            with(this) {
            var particle = new Particle(posX+width/2,posY,1,20);        
            particle.speedY = this.projectileSpeed;
            Entities.push(particle);
            }    
        }


       this.tick = function() {
        fireCooldown -= Tickspeed;

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
               fire();
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
        if(this.posY>=Game.windowHeight) {
            this.deleted = true;
        }
    }

}



exports.Entity = Entity;
exports.Player = Player;
exports.Enemy = Enemy;
exports.Particle = Particle;