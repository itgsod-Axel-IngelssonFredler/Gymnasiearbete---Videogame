var idCount = 0;

//function addEntity() {
	//idCount+=1;
	//return idCount;
//}

function Entity(id, posX, posY, width, height, color){
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
    this.speed = 0;
    this.speedX = 0;
    this.speedY = 0;
    this.color = color || "red";
    this.collision = false;
    this.left = this.posX;
    this.right = this.posX+this.width;
    this.up = this.posY;
    this.down = this.posY+this.height;



    this.tick = function() {
        if(!this.collision) {
        this.posX += this.speedX;
        this.posY += this.speedY;
        this.speedY += 0.1;

    }
    else {
        this.speedY = 0;
        this.speedX = 0;  
    }


    }
}


function Player(id,posX,posY,width,height,color) {
    Entity.call(this,id,posX,posY,width,height,color);

}



exports.Entity = Entity;
exports.Player = Player;