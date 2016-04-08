Game = require('./MainFile');
Weapon = require('./Weapon').Weapon;
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
    this.firerate = 6;
    this.id = "player";
    this.points = 0;
    var fireCooldown = 0;
    var shotsPerFire = 1;
    var accuracy = 0.8;
    var particleWidth = 16;
    var particleHeight = 32;
    this.inventory = [new Weapon("img/Bullet_Trace.png",10,-2,0.35)];
    this.currentWeapon = this.inventory[0];
    this.fireCooldown = 0;

    this.id = "Player";
        this.fire = function(Entities) {
                with(this.currentWeapon) {
                      var particle = new Particle(this.posX+this.width/2-particleWidth/2,this.posY-particleHeight,particleWidth,particleHeight,sprite,this);
                }
              
                particle.damage = this.currentWeapon.damage;
                particle.speedY = this.currentWeapon.speed;
                particle.id = this.id;
                //particle.speedX = (Math.random()*(5+5)-5)*(1-accuracy);
                Entities.push(particle);
        }    


       this.tick = function(Entities,keyinput) {
        this.fireCooldown -= 16.67;

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

        if(keyinput.KEY_SPACE==1&&this.fireCooldown<=0) {
            with(this) {
               fire(Entities);
               fireCooldown = 1000/currentWeapon.firerate;
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
    this.id = "enemy";
    this.health = 100;
    this.fireCooldown = 0;

    this.tick = function(Entities) {
        this.fireCooldown-=16.67;
        if(this.fireCooldown<=0) {
            this.fire(Entities);
            this.fireCooldown=1000;
        }
        if (this.health <= 0) {
            this.deleted = true;
        }
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

    this.fire = function(Entities) {
        var particle = new Particle("img/Basic_Rocket.png",this.posX+this.width/2, this.posY+this.height,16,32);
        particle.id=this.id;
        particle.rotation = 180;
        Entities.push(particle);
    }

}

function Particle(posX,posY,width,height,imageSrc,shooter) {
    this.color = "#FF5000";
    this.src = imageSrc;
    this.width = width;
    this.height = height;
    this.damage = 0;
    this.shooter = shooter;
    Entity.call(this,posX,posY,width,height);
    this.rotation = 0;
    this.collisionCheck = function(object) {
        if (this.posX + this.width > object.posX && object.posX + object.width > this.posX &&
            this.posY + this.height > object.posY && object.posY + object.height > this.posY&&(object.id!=this.id&&(object.class!=Player||object.class!=Enemy))){
            console.log("Collision!");
            this.deleted = true;
            object.health -= this.damage;
            this.shooter.points += 250
            console.log(Player.points);
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
        if(this.posY+this.height<0) {
            this.deleted = true;

        }

        if(this.deleted==true) {
            Entities.splice(Entities.indexOf(this),1);
        }
    }

}




exports.Entity = Entity;
exports.Player = Player;
exports.Enemy = Enemy;
exports.Particle = Particle;