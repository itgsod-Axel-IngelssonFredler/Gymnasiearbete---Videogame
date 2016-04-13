Game = require('./MainFile');
Weapon = require('./Weapon').Weapon;
Tickspeed = tickspeed;
moveMult = Tickspeed/16.67;
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
        this.posX += this.speedX*moveMult;
        this.posY += this.speedY*moveMult;

    }
}



function Player(posX,posY,width,height) { //This Player function defines the player object we display in the game
    Entity.call(this,posX,posY,width,height); //This sets the Player function to the Entity template
    this.color = "#0F0";
    this.points = 0;

    this.health = 100;
    this.dead = false;
    this.inventory = [new Weapon("img/Bullet_Trace.png",5,-10)]; //Defines what weapons the inventory contains
    this.currentWeapon = this.inventory[0]; //Defines which weapon is being used at the current time
    this.fireCooldown = 0; //

    this.id = "Player"; //Defines the id attached to the player object
        this.fire = function(Entities) { //
            with (this) {
                for (var i = 0; i < this.currentWeapon.shotsperfire; i++) {
                    with(currentWeapon) {
                        var particle = new Particle(this.posX + this.width / 2 - currentWeapon.particleWidth / 2, this.posY - currentWeapon.particleHeight, currentWeapon.particleWidth, currentWeapon.particleHeight, currentWeapon.sprite,this);
                    }

                    //var particle = new Particle(currentWeapon.posX + currentWeapon.width / 2 - currentWeapon.particleWidth / 2, currentWeapon.posY - currentWeapon.particleHeight, currentWeapon.particleWidth, currentWeapon.particleHeight, currentWeapon.sprite);
                    particle.speedY = this.currentWeapon.speed;
                    particle.id = this.id;
                    //particle.speedX = (Math.random()*(5+5)-5)*(1-accuracy);
                    Entities.push(particle);
                }
            }
        }


       this.tick = function(Entities,keyinput) {
        if(this.health<=0) {
                this.dead = true;
        }
        if(this.fireCooldown>=0) {
            this.fireCooldown -= Tickspeed;
        }
        

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

        this.posX += this.speedX*moveMult;
        this.posY += this.speedY*moveMult;
    }

}


function Enemy(posX,posY,width,height) {
    Entity.call(this,posX,posY,width,height);
    this.color = "red";
    this.speedX = 3;
    this.speedY = 0;
    this.testVariable = 0;
    this.id = "Enemy";
    this.health = 100;
    this.currentWeapon = new Weapon("img/Basic_Rocket", 5, 10, 10);
    this.fireCooldown = 0;

    this.tick = function(Entities) {
        this.fireCooldown-=Tickspeed;
        if(this.fireCooldown<=0) {
            this.fire(Entities);
            this.fireCooldown=1000/this.currentWeapon.firerate;
        }
        if (this.health <= 0) {
            this.deleted = true;
        }
        with(this) {
        posX += speedX*moveMult;
        posY += speedY*moveMult;
        if(this.deleted==true) {
            Entities.splice(Entities.indexOf(this),1);
        }
        if(posX+width>=800||posX<=0) {
            speedX*=-1;
        }
        }
    }

    this.fire = function(Entities) {
        var particle = new Particle(this.posX+this.width/2, this.posY+this.height,16,32,"img/Basic_Rocket.png",this);
        particle.id=this.id;
        particle.speedY = this.currentWeapon.speed;
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
            this.posY + this.height > object.posY && object.posY + object.height > this.posY&&(object.id!=this.id)){
            this.deleted = true;
            object.health -= this.shooter.currentWeapon.damage;
            
            if(shooter.id=="Player") {
                this.shooter.points += 50;
            }
            
        }

    };
    this.tick = function(Entities) {
        this.posY += this.speedY*moveMult;
        this.posX += this.speedX*moveMult;
        for(var i = 0; i < Entities.length;i++) {
            if(Entities[i]!=this) {
                this.collisionCheck(Entities[i]);
            }
        }
        if(this.posY+this.height<0||this.posY+this.height>550) {
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