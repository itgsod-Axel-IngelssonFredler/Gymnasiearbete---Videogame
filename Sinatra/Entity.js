var idCount = 0;

//function addEntity() {
	//idCount+=1;
	//return idCount;
//}

function Entity(id, posX, posY, width, height){
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;

    this.tick = function() {
        this.posX += this.speedX;
        this.posY += this.speedY;
    }
}


function Player(id,posX,posY,width,height) {
    Entity.call(this,id,posX,posY,width,height);
    
}



exports.Entity = Entity;
exports.Player = Player;