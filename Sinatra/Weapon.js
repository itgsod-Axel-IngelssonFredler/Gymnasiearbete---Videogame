function Weapon(sprite, firerate, speed) {
	this.sprite = sprite;
	this.firerate = firerate;
	this.speed = speed;
	this.shotsperfire = 1;
	this.accuracy = 1;
	this.particleWidth = 10;
	this.particleHeight = 10;
}

exports.Weapon = Weapon;