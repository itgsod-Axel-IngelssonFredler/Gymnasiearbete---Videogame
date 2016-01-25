/**
 * Created by axel.ingelssonfredle on 15/01/16.
 */
WebsocketServer = require("ws").Server;		//This adds the "ws" module to this file
                                            //and uses the "Server" part of it.
Entity = require('./Entity').Entity;
Player = require('./Entity').Player;
KeyInput = require('./KeyInput').KeyInput;

wss = new WebsocketServer({port:4040});		//Here we create a new object from the previously obtained websocket server

wss.on("connection", function(ws) {
	var Entities = [];
	var PreviousEntities;

	var player1 = new Player(0,0,0,50,50);
	var player2 = new Player(1,0,0,60,60);
	player1.speed = 5;
	keyinput = new KeyInput();

	Entities[player1.id] = player1;
	ws.send("init_"+JSON.stringify(Entities));
    function tick() {
    	var sendList = [];
    	var objectList = Entities;
    	

    	for(var i = 0; i < objectList.length; i++) {
    		keyinput.moveObject(objectList[i]);
    		if(hasChanged(Entities[i], objectList[i])) {
    			sendList.push(objectList[i]);
    		}
    	}
    	Entities = objectList;

    	//console.log(sendList);
    	try {
		ws.send(JSON.stringify(sendList));
		}
		catch(e) {

		}
	}

    ws.on("message", function(msg) {
    	setKey(msg);
    });
    console.log("Opened once");
    setInterval(function() {tick()}, 15);



});

function hasChanged(previous, current) {
	for(var key in current) {
		//console.log(current);
		//console.log(previous);
		if(previous.key!=current[key]) {
			return true;
			console.log("Changed!");
		}
	}
	return false;
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