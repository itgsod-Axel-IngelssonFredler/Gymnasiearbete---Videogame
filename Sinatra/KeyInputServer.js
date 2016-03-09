WebsocketServer = require("ws").Server;		//This adds the "ws" module to this file 
											//and uses the "Server" part of it.

wss = new WebsocketServer({port:3030});		//Here we create a new object from the previously obtained websocket server
Player();
var interval;
var tickInterval;

wss.on("connection", function(ws) {

	var Entities = [] //This initializes the array that contains all game entities
	var Player1 = new Player("Player1",0,0,50,50);
	var Player2 = new Player("Player2",10,10,50,50)

	console.log(Collision(Player1,Player2));
	var keyhandler = new KeyHandler();
	var currentTime = 0;
	var lastTime = new Date().getTime();
	var deltaTime = 0;

	Entities.push(Player1);

	ws.on("close", function() {
		clearInterval(interval);
		clearInterval(tickInterval);
	})

	ws.on("message", function(msg) {
		message = msg.split(":")
		if(message[0]=="Pressed") {
			var code = message[1];
			switch (code) { //This switch handles the values of the keyhandler variables. 
				case "37": keyhandler.KeyLeft = 1;
				break;
				case "38": keyhandler.KeyUp = 1;
				break;
				case "39": keyhandler.KeyRight = 1;
				break;
				case "40": keyhandler.KeyDown = 1;
				break;
				default:;

			}

			//console.log("Pressed: "+message[1]);
		}
		else if(message[0]=="Released") {
			var code = message[1];
			switch (code) { //This switch handles the values of the keyhandler variables. 
				case "37": keyhandler.KeyLeft = 0;
				break;
				case "38": keyhandler.KeyUp = 0;
				break;
				case "39": keyhandler.KeyRight = 0;
				break;
				case "40": keyhandler.KeyDown = 0;
				break;
				default:;

			}
			//console.log("Released: "+message[1]);
		}
	})

	tickInterval = setInterval(function() { //This interval is what calculates everything in the game and makes it run. Much like a clock "ticks"
											//on regular intervals and changes the positions of the hands.
		currentTime = new Date().getTime();
		deltaTime = currentTime-lastTime;
		//console.log(deltaTime);

			for(var i = 0; i<Entities.length; i++) {

			object = Entities[i]
			switch(object.class) {
				case Player():

			if(keyhandler.KeyRight==1) {
				object.velX = 1*deltaTime;
			}
			else if(keyhandler.KeyLeft==1) {
				object.velX = -1*deltaTime;
			}
			else {
				object.velX = 0;
			}

			if(keyhandler.KeyUp==1) {
				object.velY = -1*deltaTime;
			}
			else if(keyhandler.KeyDown==1) {
				object.velY = 1*deltaTime;
			}
			else {
				object.velY = 0;
			}

				break;
				default:;
			}
			object.x += object.velX; // These lines increments any given entity's position by its velocities. This is what makes stuff move.
			object.y += object.velY;
		}
		lastTime = currentTime;
	}, 16.67);
	interval = setInterval(function() {

		try {
		ws.send(JSON.stringify(Entities)); //Here we serialize the array of entities using JSON, in order to send an entire array of objects
										   //through the websocket.
		}
		catch(e) {}
	
	}, 16.67);


});

function KeyHandler() {
	this.KeyUp = 0;
	this.KeyDown = 0;
	this.KeyLeft = 0;
	this.KeyRight = 0;
}

function Tile(name,x,y) {

}

function Collision(obj1, obj2) {
	if() {
		return true;
	}
	return false;
}

function Player(name,x,y,width,height) {
	this.name = name
	this.x = x;
	this.y = y;

	this.velX = 0;
	this.velY = 0;

	this.width = width;
	this.height = height;

	this.checkCollision = function() {

	}

}