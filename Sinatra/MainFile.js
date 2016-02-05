/**
 * Created by axel.ingelssonfredle on 15/01/16.
 */
WebsocketServer = require("ws").Server;		/** This adds the "ws" module to this file
                                            and uses the "Server" part of it. **/
Entity = require('./Entity').Entity;
Player = require('./Entity').Player;
KeyInput = require('./KeyInput').KeyInput;

wss = new WebsocketServer({port:4040});		//Here we create a new object from the previously obtained websocket server

wss.on("connection", function(ws) { /**
									The "function(ws)" parameter inside this wss.on() function call, is 
									the callback function for when the server gets connected to a client.
									This function marks the starting point for the game. From here
									all initially spawned entities are initialized, i.e. not objects created by the player
									such as particles from weapons or attacks.
									**/

	var Entities = []; 				//This is the container for ALL objects in the game. We simply initialize it as an empty array.
	var PreviousEntities;

	var player = new Player(0,0,0,50,50,"green");
	var groundTile1 = new Entity(1,0,350,150,50)
	player.speed = 5;
	Entities[player.id] = player;
	Entities[groundTile1.id] = groundTile1;
	var gravity = 1.2;


	
	keyinput = new KeyInput();

	ws.send("init_"+JSON.stringify(Entities));
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
    	var sendList = [];

    	var objectList = Entities.slice(0);
    	

    	for(var i = 0; i < objectList.length; i++) { /**
    												 This loop is what causes the game to simultaneously update all objects. 
    												 When you observe the game, it appears that all objects update (move, spawn, disappear etc.)
    												 at the exact same time. The reality is however, quite different.

    												 Since everything in the game exists within the same array, accessing every object in the game
    												 can be accomplished with a simple "for"-loop. Because of how fast the server computer loops
    												 through the array, we are never able to see the small delay between the updating of different objects.
    												 **/

    	var oldObject = {}
    	
    	for(var key in objectList[i]) {
    		oldObject[key] = objectList[i][key];
    	}
    	//objectList[i].tick();
    	var collides = false;
    	player = objectList[0];
    	for(var a = 0; a < objectList.length; a++) {
    		thisObject = objectList[0];
    		otherObject = objectList[a]
    		if(thisObject==otherObject) {
    			continue;
    		}
      		if (thisObject.x < otherObject.x + otherObject.width &&
   			 thisObject.x + thisObject.width > otherObject.x &&
  			 thisObject.y < otherObject.y + otherObject.height &&
  			 thisObject.height + thisObject.y > otherObject.y) {
   			 console.log("Collision");
        	 thisObject.collision = true;
			}		
    	}
		objectList[i].tick();
		keyinput.moveObject(objectList[i]);
		
    		if(hasChanged(oldObject, objectList[i])) { /**
    													Because our internet connection is rather limited, the game is constructed to
    													only utilize the websocket when it's absolutely necessary. The array sendList (initialized at around row 53)
    													only contains the objects that have changed in some way. While this kind of searching for changes within
    													single objects can be somewhat taxing for the server, it should perform better than sending the ENTIRE
    													game across the internet every single frame.
    													**/
    			sendList.push(objectList[i]);
    		}
    	}
    	Entities = objectList.slice(0);

    	//console.log(sendList);
    	try {										/**
    												Because there's a high risk of something going wrong when sending information via the internet,
    												this "try/catch" statement is there to make sure that the entire server doesn't crash if something
    												goes a tiny bit wrong at any point.
    												**/ 
		ws.send(JSON.stringify(sendList));
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
    setInterval(function() {tick()}, 16.67);



});

function hasChanged(previous, current) {
	for(var key in current) {
		var previousValue = previous[key];
		var currentValue = current[key];
		if(previousValue!=currentValue) {
			return true;
		}
	}
	return false;
}

function intersection(object1,object2){
	if(object1.posX<object2.posX+object2.width&&object1.posX+object1.width>object2.posX&&object1.posY<object2.posY+object2.height&&object1.posY+object1.height>object2.posY) {
		return true;
	}
	else {
	return false;
	}
}
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
			default:;
		}
	}
}