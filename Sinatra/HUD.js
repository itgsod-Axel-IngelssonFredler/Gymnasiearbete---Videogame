function Lifebar(x,y,maxhealth,width,height,color,background) {
	this.posX = x;
	this.posY = y;
	this.maxhealth = maxhealth;
	this.currentHealth = maxhealth;
	this.background = background;
	this.width = width;
	this.height = height;
	this.speedX = 0;
	this.speedY = 0;
	this.color = color;
	with(this) {
		setInterval(function(){currentHealth-=30;currentHealth = clamp(currentHealth,0,maxhealth)},2000);
	}
	
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
	}

	this.tick = function(keyinput) {
		with(this) {
			width = currentHealth/maxhealth*background.width;
		}
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