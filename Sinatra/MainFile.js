/**
 * Created by axel.ingelssonfredle on 15/01/16.
 */
WebsocketServer = require("ws").Server;		/** This adds the "ws" module to this file
                                            and uses the "Server" part of it. **/
Entity = require('./Entity').Entity;
Player = require('./Entity').Player;
Enemy = require('./Entity').Enemy;
Particle = require('./Entity').Particle

KeyInput = require('./KeyInput').KeyInput;

Lifebar = require('./HUD').Lifebar;
Extralives = require('./HUD').Extralives;
Score = require('./HUD').Score;
windowWidth = 800;
windowHeight = 550;
tickspeed = 16.67;

wss = new WebsocketServer({port:4040});		//Here we create a new object from the previously obtained websocket server

wss.on("connection", function(ws) { /**
									The "function(ws)" parameter inside this wss.on() function call, is 
									the callback function for when the server gets connected to a client.
									This function marks the starting point for the game. From here
									all initially spawned entities are initialized, i.e. not objects created by the player
									such as particles from weapons or attacks.
									**/

	Entities = []; 					//This is the container for ALL objects in the game. We simply initialize it as an empty array.
	var player1 = new Player(400,400,30,40);
	var enemy1 = new Enemy(400,50,30,40);
	var lifebar_background = new Entity(300,500,200,20,"red");
	var lifebar = new Lifebar(300,500,100,150,20,"yellow",lifebar_background);
	player1.speed = 5;
	keyinput = new KeyInput();
	Entities.push(player1);
	Entities.push(enemy1);
	Entities.push(lifebar_background);
	Entities.push(lifebar);

    function tick() {				/**
    								This function "tick()" can be summarized as the heartbeat of the game. This is the loop 
    								that causes things to move. This loop decides what changes in the game. By changing the delay
    								between "ticks", we can manipulate the framerate of the game, and thereby increase/decrease
    								smoothness.

    								This specific game is currently set to run tick() to update the game once every 16.67 milliseconds.
    								This is not an arbitrary amount of milliseconds. The number 16.67 comes from the following calculations:
									
									One second = 1000 ms
									Target framerate = 60 fps (frames/second)
									Since the 60 comes from the following division: 

									frames/1 sec = 60

									seconds/frame = 1/60
									ms/frame = 1000/60 ≈ 16.67

									According to these calculations, the game should update 60 times per second, if it updates once every 16.67 ms
									


    								**/


    
    	for(var i = 0; i < Entities.length; i++) { /**
    												 This loop is what causes the game to simultaneously update all objects. 
    												 When you observe the game, it appears that all objects update (move, spawn, disappear etc.)
    												 at the exact same time. The reality is however, quite different.

    												 Since everything in the game exists within the same array, accessing every object in the game
    												 can be accomplished with a simple "for"-loop. Because of this
    												 **/
    		Entities[i].tick();
			if(Entities[i].deleted==true) {
				Entities.slice(i,1);
			}
    	}

    	try {										/**
    												Because there's a high risk of something going wrong when sending information over the internet,
    												this "try/catch" statement is there to make sure that the entire server doesn't crash if something
    												goes a tiny bit wrong at any point.
    												**/ 
		ws.send(JSON.stringify(Entities));
		}
		catch(e) {

		}
	}

    ws.on("message", function(msg) { 	/**
    									This callback function lets us handle messages sent from the client to the server. For this game,
    									the messages from the client consists of short strings that tell the server keys have been pressed/released.
    									After information of the key interaction has been received, the server analyzes the interaction itself through the
    									"setKey(msg)" function. This function notes whether it is a key-PRESS or a key-RELASE. The setKey function has access
    									to an object of class KeyInput called keyinput. Keyinput has properties that hold either a 1 or a 0 for every needed
    									key in the game. The setKey sets the properties' values to one if the key has been pressed, and 0 if the key has been
    									released.
    									**/

    	setKey(msg);
    });


    console.log("Opened once");
    var interval = setInterval(function() {tick()}, tickspeed);
    
    ws.on("close", function() {
    	clearInterval(interval);
	})


});



function setKey(message) {
	var msg = message.split(":");
	if(msg[0]=="Pressed") {
		switch(msg[1]) {
			case "37":
				keyinput.KEY_LEFT = 1;
			break;
			case "38":
				keyinput.KEY_UP = 1;
			break;
			case "39":
				keyinput.KEY_RIGHT = 1;
			break;
			case "40":
				keyinput.KEY_DOWN = 1;
			break;
			case "32":
				keyinput.KEY_SPACE = 1;
			break;
			default:;
		}
	}
	else {
		switch(msg[1]) {
			case "37":
				keyinput.KEY_LEFT = 0;
			break;
			case "38":
				keyinput.KEY_UP = 0;
			break;
			case "39":
				keyinput.KEY_RIGHT = 0;
			break;
			case "40":
				keyinput.KEY_DOWN = 0;
			break;
			case "32":
				keyinput.KEY_SPACE = 0;
			break;
			default:;
		}
	}
}