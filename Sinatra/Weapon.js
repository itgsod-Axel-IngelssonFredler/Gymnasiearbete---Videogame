function Weapon(sprite, firerate, speed, damage) {
	this.sprite = sprite;
	this.firerate = firerate;
	this.speed = speed;
	this.shotsperfire = 1;
	this.accuracy = 1;
	this.particleWidth = 16;
	this.particleHeight = 32;
	this.damage = damage;
}

exports.Weapon = Weapon;
