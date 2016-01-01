WebsocketServer = require("ws").Server;		//This adds the "ws" module to this file 
											//and uses the "Server" part of it.

wss = new WebsocketServer({port:3030});		//Here we create a new object from the previously obtained websocket server

