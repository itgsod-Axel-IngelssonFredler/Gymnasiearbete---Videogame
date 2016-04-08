Game = require('./MainFile');
Weapon = require('./Weapon').Weapon;
Tickspeed = tickspeed;

console.log(Tickspeed);

function Entity(posX, posY, width, height){ //This Entity function defines the entities we display in the game
    this.posX = posX; //The Entity's position on the X axis
    this.posY = posY; //The Entity's position on the Y axis
    this.width = width; //The width of the Entity
    this.height = height; //The height of the Entity
    this.speed = 0; //The speed of the Entity
    this.speedX = 0; //The speed of the Entity on the X axis
    this.speedY = 0; //The speed of the Entity on the Y axis
    this.deleted = false; //Displays the state of the Entity(Deleted/Not Deleted)
    this.id = "Default"; //The ID of the Entity
    this.tick = function(Entities) { //This Function updates the Entity for every "tick"
        this.posX += this.speedX*Tickspeed;
        this.posY += this.speedY*Tickspeed;
        console.log(this.deleted);

    }
}


function Player(posX,posY,width,height) { //This Player function defines the player object we display in the game
    Entity.call(this,posX,posY,width,height); //This sets the Player function to the Entity template
    this.color = "green";
    this.firerate = 6;
    this.projectileSpeed = -10; //The speed of the projectiles
    this.points = 0; //Initializes the points variable
    var shotsPerFire = 1; //How many shots are launched per "click"
    var accuracy = 0.8; //How accurate the shots are
    var particleWidth = 16;
    var particleHeight = 32;
    this.inventory = [new Weapon("img/Bullet_Trace.png",50,-10)]; //Defines what weapons the inventory contains
    this.currentWeapon = this.inventory[0]; //Defines which weapon is being used at the current time
    this.fireCooldown = 0; //

    this.id = "Player"; //Defines the id attached to the player object
        this.fire = function(Entities) { //
            with (this) {
                for (var i = 0; i < this.currentWeapon.shotsPerFire; i++) {

                    var particle = new Particle(currentweapon.posX + currentwaepon.width / 2 - currentweapon.particleWidth / 2, currentweapon.posY - currentweapon.particleHeight, currentweapon.particleWidth, currentweapon.particleHeight, currentweapon.sprite);

                    particle.speedY = this.currentWeapon.speed;
                    particle.id = this.id;
                    //particle.speedX = (Math.random()*(5+5)-5)*(1-accuracy);
                    Entities.push(particle);
                }
            }
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
            this.shooter.points += 250;
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