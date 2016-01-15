function Entity(id, posX, posY, width, height){
    this.id = id;
    this.posX = posX;
    this.posY = posY;
    this.width = width;
    this.height = height;
}


function Player(id,posX,posY,width,height) {
    Entity.call(this,id,posX,posY,width,height);
}



exports.Entity = Entity;
exports.Player = Player;