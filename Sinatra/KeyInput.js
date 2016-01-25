
function KeyInput() {
	this.KEY_LEFT = 0;
	this.KEY_RIGHT = 0;
	this.KEY_UP = 0;
	this.KEY_DOWN = 0;


	this.moveObject = function(object) {
		if(this.KEY_LEFT==1) {
			object.speedX = -object.speed;
		}
		else if(this.KEY_RIGHT) {
			object.speedX = object.speed;
		}
		else {
			object.speedX = 0;
		}

		if(this.KEY_UP==1) {
			object.speedY = -object.speed;
		}
		else if(this.KEY_DOWN) {
			object.speedY = object.speed;
		}
		else {
			object.speedY = 0;
		}

		object.posX += object.speedX;
		object.posY += object.speedY;
	}

}


exports.KeyInput = KeyInput
