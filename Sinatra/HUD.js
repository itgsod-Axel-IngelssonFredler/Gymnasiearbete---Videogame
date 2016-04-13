function Lifebar(x,y,width,height,color,object,background) {
	this.posX = x;
	this.posY = y;
	this.parent = object;
	this.maxhealth = this.parent.health;
	this.background = background;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.color = color;
	this.clamp = function(value, min, max) {
		if(value<min) {
			return 0;
		}
		else if(value >=max) {
			return max;
		}
		else {
			return value;
		}
	};
	this.tick = function(keyinput) {
		this.currentHealth = this.parent.health;
		this.width = this.currentHealth/this.maxhealth*this.background.width;
	}
}


function Extralives(x,y,amount,width,height) {
	this.posX = x;
	this.posY = y;
	this.width = width;
	this.height = height;
}

function Score(x,y,width,height) {
	this.posX = x;
	this.posY = y;
	this.width = width;
	this.height = height;
}



exports.Lifebar = Lifebar;
exports.Extralives = Extralives;
exports.Score = Score;