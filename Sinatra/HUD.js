function Lifebar(x,y,maxhealth,width,height) {
	this.posX = x;
	this.posY = y;
	this.maxhealth = maxhealth;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;

	this.tick = function(keyinput) {

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